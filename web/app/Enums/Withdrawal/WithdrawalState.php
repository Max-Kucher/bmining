<?php

namespace App\Enums\Withdrawal;

enum WithdrawalState
{
    const PENDING = 'pending';
    const CANCELED = 'canceled';
    const PAID = 'paid';
}
