<?php

namespace App\Helpers;

use App\Models\ManagedUser;
use App\Models\ManagerInfo;
use App\Models\ManagerSale;
use App\Models\Order;
use Couchbase\UserManager;
use Illuminate\Support\Facades\Log;

class SaleHelper
{
    public static function newSale(Order $order, $managerId = null)
    {
        if ($managerId === null) {
            $managerId = ManagedUser::findManagerIdByUser($order->user_id);
        }

        if ($managerId !== null) {
            $managerInfo = ManagerInfo::findByManager($managerId);

            if ($managerInfo !== null) {
                $managerProfitCoeff = $managerInfo->percent / 100;
                $managerProfit = $order->sum * $managerProfitCoeff;

                $newSale = new ManagerSale([
                    'sum' => $order->sum,
                    'profit' => $managerProfit,
                    'order_id' => $order->id,
                    'manager_id' => $managerId,
                    'user_id' => $order->user_id,
                ]);

                $newSale->save();
                $managerInfo->balance += $managerProfit;
                $managerInfo->save();
            } else {
                Log::critical("Manager {$managerId} don't have ManagerInfo entity!!!");
            }
        } else {
            $newSale = new ManagerSale([
                'sum' => $order->sum,
                'profit' => 0,
                'order_id' => $order->id,
                'manager_id' => null,
                'user_id' => $order->user_id,
            ]);
            $newSale->save();
        }
        //TODO: add transactions to manager sales


    }
}
