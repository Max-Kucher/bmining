<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagerInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'manager_id',
        'balance',
        'percent',
    ];

    public static function findByManager(int $managerId)
    {
        return ManagerInfo::query()
            ->where('manager_id', '=', $managerId)
            ->limit(1)
            ->first();
    }

    public static function isExistsByUserId(int $userId)
    {
        $infoCount = ManagerInfo::query()->where('manager_id', '=', $userId)
            ->limit(1)
            ->count();
        return $infoCount > 0;
    }

    public static function removeByUserId(int $userId)
    {
        ManagerInfo::query()->where('manager_id', '=', $userId)->delete();
    }
}
