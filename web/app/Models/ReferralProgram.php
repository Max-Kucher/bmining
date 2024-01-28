<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReferralProgram extends Model
{
    use HasFactory;

    protected $fillable = ['hash', 'user_id'];

    static function findByHash($hash): ?self
    {
        return ReferralProgram::query()->where('hash', '=', $hash)->first();
    }

    static function getCountByHash($hash): int
    {
        return ReferralProgram::query()->where('hash', '=', $hash)->count();
    }
}
