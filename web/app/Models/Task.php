<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Task extends Model
{
    use HasFactory;

    const NEW = 'new';
    const IN_PROGRESS = 'in_progress';
    const DONE = 'done';

    protected $fillable = [
        'author_id',
        'user_id',
        'title',
        'description',
        'metadata',
        'state',
        'show_after',
    ];


    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class)->select(['id', 'name']);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class)->select(['id', 'name']);
    }

    public static function findByAuthorAndUser($authorId, $userId)
    {
        return Task::query()
            ->where('author_id', '=', $authorId)
            ->where('user_id', '=', $userId)
            ->with(['author' => function ($query) {
                $query->select(['id', 'name']);
            }])
            ->orderByDesc('id')
            ->get();
    }

    public static function findByUser($userId)
    {
        return Task::query()
            ->where('user_id', '=', $userId)
            ->with(['author' => function ($query) {
                $query->select(['id', 'name']);
            }])
            ->orderByDesc('id')
            ->get();
    }


    public static function findLastTasksByManager(int $managerId, $onlyNew = false, $states = [Task::NEW, Task::IN_PROGRESS], $limit = null)
    {
        $query = Task::query();
        $query = $query->where('state', '=', Task::NEW)
            ->orWhere(function ($query) use ($managerId) {
                $query->where('user_id', '=', $managerId);
                $query->where('author_id', '=', $managerId);
            })
            ->with(['author' => function ($query) {
                $query->select(['id', 'name']);
            }])
            ->with(['user' => function ($query) {
                $query->select(['id', 'name']);
            }]);

        $query->whereIn('state', $states);

        if ($limit !== null) {
            $query->limit($limit);
        }

        return $query->get()->unique();
    }

    public static function getCountActiveByUserId($userId)
    {
        $date = (new Carbon());
        return Task::query()
            ->whereNotIn('state', [Task::DONE])
            ->where('show_after', '<=', $date)
            ->orWhere(function ($query) use ($userId) {
                $query->where('user_id', '=', $userId);
                $query->where('author_id', '=', $userId);
            })
            ->count();
    }

    public static function removeById(int $id)
    {
        return Task::query()->delete($id);
    }

    public static function createWithdrawalTask(int $userId, float $sum = 0, ?int $managerId = null)
    {
        Task::create([
            'author_id' => $managerId,
            'user_id' => $userId,
            'title' => 'New withdrawal requests.',
            'description' => 'Withdraw funds to the user.',
        ]);
    }
}
