<?php

namespace App\Enums;

enum PaymentMethod: string
{
    case BTC = 'btc';
    case CARD = 'card';
    case BY_MANAGER = 'manager';

}
