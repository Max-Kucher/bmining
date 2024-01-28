<?php

namespace App\Helpers\Money;

class BitcoinCurrency implements \JsonSerializable, CurrencyInterface
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
        return $part / 100000000;
    }

    public
    function getAmount()
    {
        return $this->amount;
    }

    public function setAmountFloat($amount): self
    {
        $this->amountFloat = $amount;
        $this->amount = (float)$amount * 100000000;

        return $this;
    }

    public function getAmountFloat()
    {
        return $this->amountFloat;
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
