<?php

namespace App\Http\Controllers\API;

use App\Helpers\Money\UsdCurrency;
use App\Models\Event;
use App\Models\ManagerSale;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class SalesController
{
    public function getSalesFromDate(\Symfony\Component\HttpFoundation\Request $request)
    {
        $authUser = Auth::user();

        $validatedDate = $request->validate([
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
        ]);

        $startDate = new Carbon($validatedDate['start_date']);
        $endDate = new Carbon($validatedDate['end_date']);
        $startDate = $startDate->startOfDay();
        $endDate = $endDate->endOfDay();
        if ($authUser->hasRole('admin')) {
            $salesList = ManagerSale::findFromToDate((string)$startDate, (string)$endDate);
        } else if ($authUser->hasRole('manager')) {
            $salesList = ManagerSale::findFromToDateByManager($authUser->id, (string)$startDate, (string)$endDate);
        }

        $salesList = $salesList->map(function ($item) {
            $item->sum = (new UsdCurrency())->setAmount($item->sum)->getAmountFloat();
            $item->profit = (new UsdCurrency())->setAmount($item->profit)->getAmountFloat();
            if ($item->manager_id !== null) {
                $item->manager = User::findWithCredsById($item->manager_id);
            } else {
                $item->manager = null;
            }

            $item->user = User::findWithCredsById($item->user_id);

            return $item;
        });
        return new JsonResponse([
            'sales' => $salesList,
        ], 200);
    }
}
