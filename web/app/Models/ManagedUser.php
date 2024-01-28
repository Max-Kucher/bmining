<?php

namespace App\Models;

use App\Http\Requests\ManageAddUserMinerRequest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ManagedUser extends Model
{
    use HasFactory;

    protected $fillable = [
        'manager_id',
        'user_id',
    ];

    public static function getArrayUserIdsByManagerId($managerId)
    {
        return ManagedUser::query()
            ->where('manager_id', '=', $managerId)
            ->pluck('user_id')
            ->toArray();
    }

    public static function createByManagerAndUser(int $managerId, int $userId)
    {
        $managedUser = new ManagedUser([
            'manager_id' => $managerId,
            'user_id' => $userId,
        ]);
        $managedUser->save();

        return $managedUser;
    }

    public static function getCountByManager(int $managerId, $status = null)
    {
        // TODO: make status for search count

        return ManagedUser::query()->where('manager_id', '=', $managerId)->count();
    }

    public static function isExistsByManagerAndUser(int $managerId, int $userId): bool
    {
        return ManagedUser::query()
                ->where('user_id', '=', $userId)
                ->where('manager_id', '=', $managerId)
                ->count() > 0;

    }

    public static function findManagerIdByUser(int $userId): ?int
    {
        return ManagedUser::query()
            ->select(['id', 'user_id', 'manager_id'])
            ->where('user_id', '=', $userId)
            ->limit(1)
            ->value('manager_id');
    }

    public static function getCountByManagerToday(int $managerId)
    {
        return ManagedUser::query()
            ->where('created_at', '>=', (string)(Carbon::now()->startOfDay()))
            ->where('manager_id', '=', $managerId)
            ->count();
    }

    public static function updateManagerIdByUser(int $userId, int $newManagerId)
    {
        return ManagedUser::query()
            ->where('user_id', '=', $userId)
            ->update([
                'manager_id' => $newManagerId
            ]);
    }

    public static function updateManagerIdByUserAndManager(int $userId, int $managerId, int $newManagerId)
    {
        return ManagedUser::query()
            ->where('user_id', '=', $userId)
            ->where('managed_id', '=', $managerId)
            ->update([
                'manager_id' => $newManagerId
            ]);
    }
}
