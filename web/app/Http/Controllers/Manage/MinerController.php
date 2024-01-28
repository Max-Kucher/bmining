<?php

namespace App\Http\Controllers\Manage;

use App\Enums\PaymentMethod;
use App\Helpers\MinerCurrencyHelper;
use App\Helpers\Money\UsdCurrency;
use App\Helpers\ResponseHelper;
use App\Helpers\SaleHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ManageAddUserMinerRequest;
use App\Models\ManagerInfo;
use App\Models\ManagerSale;
use App\Models\Order;
use App\Models\Tariff;
use App\Models\User;
use App\Models\UserMiner;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class MinerController extends Controller
{
    public function addView(int $id)
    {
        $user = User::find($id);
        if ($user === null) {
            return back();
            // TODO: handle request with toast and message "User does not exists"
        }
        $tariffs = Tariff::all();
        return Inertia::render('Manage/Users/AddMiner', [
            'tariffs' => $tariffs,
            'user' => $user->only(['id', 'name', 'email',]),
            'status' => session('status'),
            'tfaEnabled' => $user->tfa_enabled ? true : false,
        ]);
    }

    public function add(ManageAddUserMinerRequest $request, $id)
    {
        $authUser = Auth::user();

        $validated = $request->validated();

        $depositAmout = (new UsdCurrency())->setAmountFloat($validated['deposit']);
        $profitAmount = (new UsdCurrency())->setAmountFloat($validated['profit']);

        $suitableTariffId = Tariff::find($validated['tariff_id']);
        if ($suitableTariffId === null) {
            # handle and log unexpected errors
            Log::error('Cant find suitable tariff. Maybe tariff plans is empty.');
            throw ValidationException::withMessages(['deposit' => "Sorry, can't find a suitable miner plan. The administrator will be notified of this issue."]);
        }

        $user = User::find($id);

        if ($user === null) {
            Log::error('Cant find user to create miner. Managing.');
            throw ValidationException::withMessages(['error' => "Sorry, can't find this user."]);
        }


        $newUserMiner = new UserMiner([
            'tariff_id' => $suitableTariffId->id,
            'user_id' => $user->id,
            'run' => $validated['run'],
            'days' => $validated['days'],
            'hidden' => false,
            'deposit' => $depositAmout->getAmount(),
            'profit' => $profitAmount->getAmount(),
        ]);
        $newUserMiner->save();

        $paymentMethod = PaymentMethod::BY_MANAGER;

        $orderData = [
            'description' => "New deposit for miner",
            'user_id' => $user->id,
            'miner_id' => $newUserMiner->id,
            'state' => Order::PAID,
            'method' => $paymentMethod,
            'sum' => $depositAmout->getAmount(),
        ];

        $order = new Order($orderData);
        $order->save();


        if ($authUser->hasRole('manager')) {
            SaleHelper::newSale($order, $authUser->id);
        }
        // TODO: WANRING, ADMIN SALES DONT COUNTED!


        return new JsonResponse();
    }


    public function getSingle(int $id)
    {
        $miner = UserMiner::find($id);
        if ($miner === null) {
            return new JsonResponse([], 404);
            // TODO: handle request with toast and message "Miner does not exists"
        }

        $user = User::find($miner->user_id);
        if ($user === null) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('Cant find user of this miner.'), 404);
            // TODO: handle request with toast and message "User of miner does not exists"
        }
        $tariffs = Tariff::all();

        $miner = MinerCurrencyHelper::currencyToView($miner);

        return new JsonResponse([
            'miner' => $miner,
            'tariffs' => $tariffs,
            'user' => $user->only(['id', 'name', 'email',]),
        ]);
    }

    public function update(ManageAddUserMinerRequest $request, $id)
    {
        $validated = $request->validated();

        $depositAmout = (new UsdCurrency())->setAmountFloat($validated['deposit']);
        $profitAmount = (new UsdCurrency())->setAmountFloat($validated['profit']);

        $suitableTariffId = Tariff::find($validated['tariff_id']);
        if ($suitableTariffId === null) {
            # handle and log unexpected errors
            Log::error('Cant find suitable tariff. Maybe tariff plans is empty.');
            throw ValidationException::withMessages(['deposit' => "Sorry, can't find a suitable miner plan. The administrator will be notified of this issue."]);
        }

        $miner = UserMiner::find($id);
        if ($miner === null) {
            throw ValidationException::withMessages(['error' => "Cant find this miner"]);
        }

        $miner->fill([
            'run' => $validated['run'],
            'days' => $validated['days'],
            'deposit' => $depositAmout->getAmount(),
            'profit' => $profitAmount->getAmount(),
            'tariff_id' => $validated['tariff_id'],
        ]);
        $miner->save();

        return new JsonResponse();
    }

}
