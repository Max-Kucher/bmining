<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CryptoPayment extends Model
{
    use HasFactory;

    protected $fillable = [
        "address_id",
        "sum", # * 100 000 000
        "confirmed_at",
        'last_check',
        "transaction",
        "currency",
        'rate' # * 100
    ];

    public function paymentable()
    {
        return $this->morphTo();
    }

    public function address()
    {
        return $this->hasOne(CryptoAddress::class, 'id', 'address_id');
    }
}
