<?php

namespace App\Helpers\Money;

interface CurrencyInterface
{
    /**
     * Convert sum from multipled integer to float. BTC: 100 000 000 => 1
     * @return mixed
     */
    public static function toNormal(int $part);
}
