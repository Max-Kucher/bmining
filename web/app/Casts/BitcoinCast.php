<?php

namespace App\Casts;

use App\Helpers\Money\BitcoinCurrency;
use App\Helpers\Money\MoneyFormatter;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class BitcoinCast implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param array<string, mixed> $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return (new BitcoinCurrency())->setAmount($value);
    }

    /**
     * Prepare the given value for storage.
     *
     * @param array<string, mixed> $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        if ($value instanceof BitcoinCurrency) {
            return $value->getAmount();
        }
        return $value;
    }
}
