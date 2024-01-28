<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    const NEW = 'new';
    const NEW_EMAIL = 'new_email';
    const PROCESSED = 'processed';
    const COMPLETED = 'completed';

    protected $fillable = [
        'user_id',
        'state',
    ];

    public static function createOrUpdateExistsByUser(int $id)
    {
        $lead = Lead::findByUser($id, ['id', 'user_id']);
        if ($lead === null) {
            $lead = new Lead([
                'user_id' => $id,
                'state' => Lead::NEW,
            ]);

            $lead->save();
        } else {
            $lead->update([
                'status' => Lead::NEW,
            ]);
        }
        return $lead;
    }

    public static function findByUser(int $id, $columns = ['*'])
    {
        return Lead::query()
            ->select($columns)
            ->where('user_id', '=', $id)->limit(1)->first();
    }

    public static function getOldestLead()
    {
        return Lead::query()
            ->where('state', '=', Lead::NEW)
            ->orWhere('state', '=', Lead::NEW_EMAIL)
            ->limit(1)
            ->orderBy('updated_at')
            ->first();
    }

    public static function removeLeadsById(int $id)
    {
        return Lead::query()
            ->where('user_id', '=', $id)
            ->delete();
    }
}
