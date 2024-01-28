<?php

namespace App\Models;

use App\Enums\EventTypes;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Date;

class Event extends Model
{
    use HasFactory;


    protected $fillable = [
        'content',
        'user_id',
        'type',
        'viewed',
        'show_after'
    ];

    public static function getUnviewedByUserId($userId, $limit = 0)
    {
        $date = (new Carbon());
        $eventQuery = Event::query();
        if ($limit > 0) {
            $eventQuery->limit($limit);
        }
        return $eventQuery
            ->where('viewed', '=', false)
            ->where('show_after', '<=', $date)
            ->where('user_id', '=', $userId)
            ->get();
    }

    public static function getLastByUserId($userId, $limit = 0)
    {
        $date = (new Carbon());
        $eventQuery = Event::query();
        if ($limit > 0) {
            $eventQuery->limit($limit);
        }
        return $eventQuery
            ->where('show_after', '<=', $date)
            ->where('user_id', '=', $userId)
            ->orderByDesc('created_at')
            ->get();
    }

    public static function updateAsViewed(array $unviwedIds)
    {
        Event::query()->whereIn('id', $unviwedIds)
            ->update([
                'viewed' => true,
            ]);
    }

    public static function updateAllAsViewedByUserId($userId)
    {
        $date = (new Carbon());
        return Event::query()
            ->where('user_id', '=', $userId)
            ->where('show_after', '<=', $date)
            ->update([
                'viewed' => true,
            ]);
    }

    public static function getCountUnviewedByUserId($userId)
    {
        $date = (new Carbon());
        return Event::query()
            ->where('viewed', '=', false)
            ->where('show_after', '<=', $date)
            ->where('user_id', '=', $userId)
            ->count();
    }

    public static function removeByIdAndUser(int $id, int $userId)
    {
        return Event::query()
            ->where('id', '=', $id)
            ->where('user_id', '=', $userId)
            ->delete();
    }

    public static function createUserNotificationForManager($managerId, $title, $text, $userData, $showAfter)
    {
        return Event::create([
            'user_id' => $managerId,
            'type' => EventTypes::USER_TASK,
            'content' => json_encode([
                'title' => $title,
                'text' => $text,
                'user' => [
                    'id' => $userData['id'],
                    'username' => $userData['username'],
                    'avatar' => $userData['avatar'],
                ],
            ]),
            'show_after' => $showAfter,
        ]);
    }
}
