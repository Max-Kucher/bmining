<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KYC extends Model
{
    use HasFactory;

    protected $fillable = ['photo', 'name', 'surname', 'middlename', 'verified', 'user_id'];

    public static function getCountByUserId(int $userId)
    {
        return KYC::query()->where('user_id', '=', $userId)->count();
    }

    public static function findByUserId(int $userId)
    {
        return KYC::query()->where('user_id', '=', $userId)->limit(1)->first();

    }
}
