<?php

namespace App\Jobs;

use App\Clients\ElectrumExtended;
use App\Enums\PaymentMethod;
use App\Helpers\ElectrumHelper;
use App\Helpers\Money\BitcoinCurrency;
use App\Models\CryptoPayment;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class OrderPaymentsCheck implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $orders = Order::findAllPending();
        if ($orders->count() === 0) {
            return;
        }

        try {
            /** @var ElectrumExtended $electrumApi */
            [$electrumApi, $walletPath, $password] = ElectrumHelper::getElectrumInstance();
        } catch (\Exception $e) {
            Log::critical('Filed get Electrum instance! Reason: ' . $e->getMessage());
            return;
        }

        $blockchainHeight = $electrumApi->sendRequest('getinfo', [])->blockchain_height;

        foreach ($orders as $order) {
//            $orderDispatcher = new OrderPaymentCheckSingle();
//            $orderDispatcher
            OrderPaymentCheckSingle::dispatch($order);
        }
    }
}
