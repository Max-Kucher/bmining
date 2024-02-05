<?php

namespace App\Http\Controllers;

use App\Enums\AddressType;
use App\Enums\Currency;
use App\Enums\PaymentsType;
use App\Helpers\ElectrumHelper;
use App\Helpers\Money\BitcoinCurrency;
use App\Helpers\Money\UsdCurrency;
use App\Http\Requests\CreateMinerRequest;
use App\Models\CryptoAddress;
use App\Models\CryptoPayment;
use App\Models\CurrencyCourse;
use App\Models\Order;
use App\Models\Tariff;
use App\Models\UserMiner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class MinerController extends Controller
{
    public function add(CreateMinerRequest $request)
    {
        $validated = $request->validated();

        $depositAmout = (new UsdCurrency())->setAmountFloat($validated['deposit']);
        $suitableTariffId = Tariff::findByDepositeSum($depositAmout->getAmountFloat()) ?? Tariff::findMinimalDeposite();
        if ($suitableTariffId === null) {
            # handle and log unexpected errors
            Log::error('Cant find suitable tariff. Maybe tariff plans is empty.');
            throw ValidationException::withMessages(['deposit' => "Sorry, can't find a suitable miner plan. The administrator will be notified of this issue."]);
        }
        $user = $request->user();
        $newUserMiner = new UserMiner([
            'tariff_id' => $suitableTariffId,
            'user_id' => $user->id,
            'run' => false,
            'days' => 365,
            'hidden' => true,
            'deposit' => $depositAmout->getAmount(),

        ]);
        $newUserMiner->save();

        $paymentMethod = $validated['paymentMethod'];

        $orderData = [
            'description' => "New deposit for miner",
            'user_id' => $user->id,
            'miner_id' => $newUserMiner->id,
            'state' => Order::PENDING,
            'method' => $paymentMethod,
            'sum' => $depositAmout->getAmount(),
        ];

        if ($paymentMethod === 'btc') {
            try {
                $address = ElectrumHelper::findOrGenerateAddress();
//                $address = 'bc1qeyjlat4y7tmfezm90tv65jcpt3wxxn9zlzxese';
                // TODO: DEBUG HARCODE WALLET
            } catch (\Exception $e) {
                Log::critical('Failed to get a new address during the purchase of the miner! Reasin:' . $e->getMessage());
                throw ValidationException::withMessages(['error' => 'A technical error. Unable to get payment address.']);
            }
            $newAddress = new CryptoAddress([
                "address" => $address,
                "processing" => true,
                "type" => AddressType::BTC,
            ]);
            $newAddress->save();
            $btcRate = CurrencyCourse::findBtcCourse();

            if ($btcRate == 0) {
                Log::critical('Currency rate can\' be zero!');
                throw ValidationException::withMessages(['error' => 'A technical error. Can\'t calculate rate.']);
            }
            $calculateSumInBtc = $depositAmout->getAmount() / $btcRate;
            $newPayment = new CryptoPayment([
                "address_id" => $newAddress->id,
                "sum" => (new BitcoinCurrency())->setAmountFloat($calculateSumInBtc)->getAmount(),
                "currency" => Currency::BTC,
                'rate' => $btcRate,
            ]);
            $newPayment->save();
            $orderData['paymentable_id'] = $newPayment->id;
            $orderData['paymentable_type'] = PaymentsType::CRYPTO;
        }

        $order = new Order($orderData);
        $order->save();

        return new JsonResponse([
            'order' => $order->only(['id', 'method']),
            'address' => $newAddress->address,
            'sum' => (new BitcoinCurrency())->setAmount($newPayment->sum),
            'sumCurrency' => Currency::BTC,
        ]);
    }

    public function showAll()
    {
        return "minersList";
    }
}
