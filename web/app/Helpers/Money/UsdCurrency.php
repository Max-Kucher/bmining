<?php

namespace App\Helpers\Money;

class UsdCurrency implements \JsonSerializable, CurrencyInterface
{
    private ?int $amount = null;
    private string|float|null $amountFloat = null;

    public function setAmount(int $amount): self
    {
        $this->amount = $amount;
        $this->amountFloat = self::toNormal($amount);
        return $this;
    }

    public static function toNormal(int $part)
    {
        if ($part === 0) {
            return 0;
        }
        return $part / 100;
    }

    public
    function getAmount()
    {
        return $this->amount;
    }

    public function setAmountFloat($amount): self
    {

        $this->amountFloat = $amount;
        $this->amount = (float)$amount * 100;
        return $this;
    }

    public function getAmountFloat()
    {
        return $this->amountFloat;
    }

    public static function createFromAmount($amount): self
    {
        return (new self())->setAmount($amount);
    }

    public static function createFromFloatAmount($floatAmount): self
    {
        return (new self())->setAmountFloat($floatAmount);
    }

//
    public function __toString(): string
    {
        return (string)$this->amountFloat;
    }

    public function jsonSerialize(): mixed
    {
        return $this->amountFloat;
    }
}
