<?php

namespace App\Models;

use App\Enums\PaymentsType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    const PAID = 'paid';
    const PENDING = 'pending';
    const CANCELED = 'canceled';

    use HasFactory;

    protected $fillable = [
        'description',
        'user_id',
        'miner_id',
        'paid_at',
        'state',
        'sum',
        'method', #
        'paymentable_id',
        'paymentable_type',
    ];

    protected $casts = [
        'paid_at' => 'datetime'
    ];

    public function findPayment()
    {
        if (!isset($this->paymentable_id)) {
            return null;
        }
        switch ($this->paymentable_type) {
            case PaymentsType::CRYPTO:
                return CryptoPayment::find($this->paymentable_id);
        }
    }

    public function miner()
    {
        return $this->hasOne(UserMiner::class, 'id', 'miner_id');
    }

    public static function findAllPending()
    {
        return Order::query()
            ->where('state', '=', Order::PENDING)
            ->orderBy('created_at')
            ->get();
    }

    public static function findByIdAndUser(int $id, int $userId)
    {
        return Order::query()
            ->where('id', '=', $id)
            ->where('user_id', '=', $userId)
            ->limit(1)
            ->first();
    }

    public static function findLastsByUser(int $userId, $limit = 5)
    {
        return Order::query()
            ->select(['id', 'state', 'created_at', 'sum', 'description'])
            ->where('user_id', '=', $userId)
            ->limit($limit)
            ->get();
    }

    public static function getCountCreatedToday()
    {
        $today = \Carbon\Carbon::now();
        $today->setHour(0);
        $today->setMinute(0);
        return Order::where('created_at', '>=', $today)->count();
    }
}
