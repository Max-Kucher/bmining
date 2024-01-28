<?php

namespace App\Models;

use App\Enums\AddressType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CryptoAddress extends Model
{
    use HasFactory;

    protected $fillable = [
        "address",
        "processing",
        "last_payment",
        "type",
    ];

    protected $casts = [
        'last_payment' => 'datetime'
    ];


    public static function findOldestUnusedBtc($type = null)
    {
        $type = $type ?? AddressType::BTC;
        return self::query()
            ->where('processing', '=', false)
            ->where('type', '=', $type)
            ->where('type', '=', $type)
            ->orderByDesc('last_payment')
            ->limit(1)->first();
    }
}
