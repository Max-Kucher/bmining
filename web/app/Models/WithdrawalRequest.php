<?php

namespace App\Models;

use App\Casts\UsdCast;
use App\Enums\Withdrawal\WithdrawalState;
use App\Helpers\Money\UsdCurrency;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class WithdrawalRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'sum',
        'state',
        'address',
        'type',
        'user_id',
        'task_id',
    ];

    public static function findByUserId(int $userId)
    {
        return WithdrawalRequest::query()
            ->where('user_id', '=', $userId)
            ->get();
    }

    public static function getPendingSumByUser(int $userId)
    {
        return WithdrawalRequest::query()
            ->where('user_id', '=', $userId)
            ->where('state', '=', WithdrawalState::PENDING)
            ->sum('sum');
    }

    public static function findByUserAndId(int $userId, int $id)
    {
        return WithdrawalRequest::query()
            ->where('user_id', '=', $userId)
            ->where('id', '=', $id)
            ->where('state', '=', WithdrawalState::PENDING)
            ->limit(1)
            ->first();
    }


    public static function updateByUserAndId(int $userId, int $id)
    {
        return WithdrawalRequest::query()
            ->where('user_id', '=', $userId)
            ->where('id', '=', $id)
            ->where('state', '=', WithdrawalState::PENDING)
            ->limit(1)
            ->update([
                'state' => WithdrawalState::CANCELED,
            ]);
    }

    public function cancelWithdrawal()
    {
        $this->state = WithdrawalState::CANCELED;
        if ($this->task_id !== null) {
            Task::removeById($this->task_id);
        }
        $this->save();
    }

    protected $casts = [
        'sum' => UsdCast::class,
    ];
}
