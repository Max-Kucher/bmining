<?php

namespace App\Jobs;

use App\Clients\ElectrumExtended;
use App\Enums\PaymentMethod;
use App\Helpers\ElectrumHelper;
use App\Helpers\Money\BitcoinCurrency;
use App\Helpers\SaleHelper;
use App\Models\CryptoPayment;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class OrderPaymentCheckSingle implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    /**
     * Create a new job instance.
     */
    public function __construct(public Order $order)
    {
        $this->order = $this->order;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            /** @var ElectrumExtended $electrumApi */
            [$electrumApi, $walletPath, $password] = ElectrumHelper::getElectrumInstance();
        } catch (\Exception $e) {
            Log::critical('Filed get Electrum instance! Reason: ' . $e->getMessage());
            return;
        }

        $blockchainHeight = $electrumApi->sendRequest('getinfo', [])->blockchain_height;

        $orders = [$this->order];
        foreach ($orders as $order) {
            Log::debug('Start payment check order #' . $order->id);

            if ($order->method === PaymentMethod::BTC->value) {

                /** @var CryptoPayment $payment */
                $payment = $order->findPayment();
                if ($payment === null) {
                    continue;
                }

                $address = $payment->address;
                if ($address === null) {
                    continue;
                }


                $paymentAddress = $address->address;
//                $paymentAddress = '13aj8BD7SwfaE99KTAcU2qXnXfVLVh1fSK';
//                $paymentAddress = '3LQUu4v9z6KNch71j7kbj8GPeAGUo1FW6a';
                // TODO: FIX BITOCIN ADDRESS FOR ORDER DEBUG
                # max 3 attempt to get balance of address
                for ($i = 0; $i < 3; $i++) {
                    try {
                        $balance = $electrumApi->getAddressBalance($paymentAddress);
                        break;
                    } catch (\Exception $e) {
                        Log::error("Can't check address balance for address {$paymentAddress}. Reason: " . $e->getMessage());
                    }
                }

                if (!isset($balance)) {
                    Log::debug("Order #" . $order->id . " not paid. Cant get balance.");
                    continue;
                }
                $paymentSum = $payment->sum;
                $confirmedSum = (new BitcoinCurrency())->setAmountFloat($balance->confirmed)->getAmount();
                if ($confirmedSum < $paymentSum) {
                    Log::debug("Order #" . $order->id . " not paid. Balance low.");
                    continue;
                }
//                $transactions = $electrumApi->getAddressHistory($paymentAddress);
                $transactions = $electrumApi->getAddressUnspent($paymentAddress);

                $transactionId = null;
                $transactionsConfirmed = false;
                $transactionsSum = 0;
                foreach ($transactions as $transaction) {
                    if (($blockchainHeight - $transaction->height) < 1) {
                        $transactionsConfirmed = false;
//                        break;
                    } else {
                        $transactionsSum += $transaction->value;
                    }
                    Log::debug( "Confirmations count " . ($blockchainHeight - $transaction->height));
                    $transactionId = $transaction->tx_hash;
                }

                if ($transactionsSum >= $paymentSum) {
                    $transactionsConfirmed = true;
                } else {
                    $transactionsConfirmed = false;
                }


                if ($transactionsConfirmed === true) {
                    Log::debug("Order #" . $order->id . " paid.");
                    $payment->fill([
                        'confirmed_at' => new \DateTime(),
                        'transaction' => $transactionId,
                    ]);
                    $payment->save();

                    $order->fill([
                        'state' => Order::PAID,
                        'paid_at' => new \DateTime(),

                    ]);
                    $order->save();

                    $miner = $order->miner;

                    $miner->fill([
                        'hidden' => false,
                        'run' => true,
                    ]);
                    $miner->save();

                    SaleHelper::newSale($order);
                } else {
                    Log::debug("Order #" . $order->id . " not paid.");
                }
            }
        }
    }
}
