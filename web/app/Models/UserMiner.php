<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMiner extends Model
{
    use HasFactory;

    protected $fillable = [
        "tariff_id",
        "user_id",
        "days",
        "run",
        'hidden',
        'deposit',
        'profit',
    ];

    public function tariff()
    {
        return $this->hasOne(Tariff::class, 'id', 'tariff_id');
    }

    public static function getLatestByUser($userId, $limit = 3)
    {
        return UserMiner::query()
            ->where('user_id', '=', $userId)
            ->where('hidden', '=', false)
            ->limit($limit)
            ->get();
    }

    public static function getCountByUser($userId)
    {
        return UserMiner::query()
            ->where('user_id', '=', $userId)
            ->where('hidden', '=', false)
            ->count();
    }

    public static function getTotalDepositByUser($userId)
    {
        return UserMiner::query()
            ->where('user_id', '=', $userId)
//            ->where('hidden', '=', false)
            ->sum('deposit');
    }

    public static function findAllForProfitCalc()
    {
        return UserMiner::query()
            ->select(['id', 'tariff_id', 'user_id', 'hidden', 'days', 'deposit', 'profit', 'run'])
            ->where('hidden', '=', false)
            ->where('days', '>', 0)
            ->where('deposit', '>', 0)
            ->where('run', '=', true)
            ->with('tariff')
            ->get();
    }

    public static function getCountRunningCreatedToday()
    {
        $today = \Carbon\Carbon::now();
        $today->setHour(0);
        $today->setMinute(0);
        return UserMiner::where('created_at', '>=', $today)->count();
    }
}
