<?php

namespace App\Http\Controllers;

use App\Helpers\Money\BitcoinCurrency;
use App\Helpers\Money\UsdCurrency;
use App\Helpers\ResponseHelper;
use App\Jobs\OrderPaymentCheckSingle;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function showProcessingOrder(int $id)
    {
        $userId = auth()->user()->id;
        $order = Order::findByIdAndUser($id, $userId);
        if ($order === null) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('Not found'), 404);
        }

        if ($order->user_id !== $userId) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('Access denied'), 403);
        }

//        if ($order->state !== Order::PENDING) {
//            return to_route('orders.show', [
//                'id' => $id,
//            ]);
//        }
        $payment = $order->findPayment();
        return new JsonResponse([
            'order' => [
                'id' => $order->id,
                'state' => $order->state,
                'method' => $order->method,
                'tariff' => [
                    'name' => $order->miner->tariff->name,
                ],
                'created_at' => $order->created_at,
            ],
            'payment' => [
                'last_check' => $payment->last_check,
                'sum' => (new BitcoinCurrency())->setAmount($payment->sum)->getAmountFloat(),
                'address' => $payment->address->address,
                'rate' => (new UsdCurrency())->setAmount($payment->rate)->getAmountFloat(),
            ]
        ]);
    }

    public function checkProcessingOrder(int $id)
    {

        $userId = auth()->user()->id;
        $order = Order::findByIdAndUser($id, $userId);
        if ($order === null) {
            return new JsonResponse([], 404);
        }

        if ($order->user_id !== $userId) {
            return new JsonResponse([], JsonResponse::HTTP_FORBIDDEN);
        }

        if ($order->state === Order::PAID) {
            return new JsonResponse([
                'state' => $order->state,
            ], 201);
        }

        $payment = $order->findPayment();
        $currentTime = new \DateTime();
        if ($payment->last_check === null || $currentTime->diff(new \DateTime($payment->last_check))->i >= 5) {
//        if ($payment->last_check === null || $currentTime->diff(new \DateTime($payment->last_check))->i >= 0) {
            $payment->last_check = new \DateTime();
            $payment->save();
            OrderPaymentCheckSingle::dispatch($order);
        }

        return new JsonResponse([
            'state' => $order->state,
//            'state' => Order::PAID,
        ], 200);
    }

    public function cancelProcessingOrder(int $id)
    {

        $userId = auth()->user()->id;
        $order = Order::findByIdAndUser($id, $userId);
        if ($order === null) {
            return new JsonResponse([], 404);
        }

        if ($order->user_id !== $userId) {
            return new JsonResponse([], JsonResponse::HTTP_FORBIDDEN);
        }

        if ($order->state === Order::CANCELED) {
            return new JsonResponse([
                'state' => $order->state,
            ], 201);
        }

        $order->state = Order::CANCELED;
        $order->save();
        return new JsonResponse([
            'state' => $order->state,
        ], 200);
    }

    public function showOrder(int $id)
    {
        $userId = auth()->user()->id;
        $order = Order::findByIdAndUser($id, $userId);
        if ($order === null) {
            return abort(404, 'Order not found');
        }

        if ($order->user_id !== $userId) {
            return abort(403, "Access denied.");
        }

        $payment = $order->findPayment();
        return Inertia::render('Orders/ShowOrder', [
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
