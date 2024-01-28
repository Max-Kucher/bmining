<?php

namespace App\Http\Controllers\API;

use App\Helpers\Money\BitcoinCurrency;
use App\Helpers\Money\UsdCurrency;
use App\Helpers\ResponseHelper;
use App\Models\Event;
use App\Models\Order;
use http\Env\Request;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Inertia\Response;

class OrderController
{
    public function showSingle(\Illuminate\Http\Request $request, int $id)
    {
        $order = Order::find($id);
        if ($order === null) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('Not found'), 404);
        }

        $payment = $order->findPayment();
        return new JsonResponse([
            'order' => [
                'id' => $order->id,
                'state' => $order->state,
                'method' => $order->method,
                'created_at' => $order->created_at,
                'tariff' => [
                    'name' => $order->miner->tariff->name,
                ]
            ],
            'payment' => [
                'last_check' => $payment->last_check,
                'sum' => (new BitcoinCurrency())->setAmount($payment->sum)->getAmountFloat(),
                'address' => $payment->address->address,
                'rate' => (new UsdCurrency())->setAmount($payment->rate)->getAmountFloat(),
            ]
        ]);
    }
}
