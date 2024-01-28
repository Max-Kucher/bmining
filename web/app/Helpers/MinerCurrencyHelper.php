<?php

namespace App\Helpers;

use App\Helpers\Money\UsdCurrency;
use App\Models\UserMiner;

class MinerCurrencyHelper
{

    public static function currencyToView(UserMiner $userMiner): UserMiner
    {
        $userMiner->deposit = (new UsdCurrency())->setAmount($userMiner->deposit)->getAmountFloat();
        $userMiner->profit = (new UsdCurrency())->setAmount($userMiner->profit)->getAmountFloat();

        return $userMiner;
    }
}
