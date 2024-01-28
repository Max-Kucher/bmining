<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagerSale extends Model
{
    use HasFactory;

    protected $fillable = [
        'sum',
        'profit',
        'order_id',
        'user_id',
        'manager_id',
        # can be null, if user buy miner himself
    ];

    public static function findFromToDate($dateStart, $dateEnd, ?int $limit = null)
    {
        $query = ManagerSale::query();
        $query = $query->whereBetween('created_at', [$dateStart, $dateEnd]);
        if ($limit !== null) {
            $query->limit($limit);
        }
        return $query->get();
    }

    public static function findFromToDateByManager(int $managerId, $dateStart, $dateEnd, ?int $limit = null)
    {
        $query = ManagerSale::query();
        $query = $query->where('manager_id', '=', $managerId);
        $query = $query->whereBetween('created_at', [$dateStart, $dateEnd]);
        if ($limit !== null) {
            $query->limit($limit);
        }
        return $query->get();
    }

    public static function getCountByManager(int $managerId)
    {

        return ManagerSale::query()->where('manager_id', '=', $managerId)->count();
    }

    public static function getCountByManagerToday(int $managerId)
    {

        return ManagerSale::query()->where('manager_id', '=', $managerId)
            ->where('created_at', '>=', (string)(Carbon::now()->startOfDay()))
            ->count();
    }

}
