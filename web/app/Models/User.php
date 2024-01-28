<?php

namespace App\Models;

use App\Casts\BitcoinCast;
use App\Casts\UsdCast;
use App\Helpers\Money\MoneyFormatter;
use App\Traits\CanResetPassword;
use Carbon\Carbon;
use Cknow\Money\Casts\MoneyDecimalCast;
use Cknow\Money\Money;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Relations\MorphOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Shetabit\Visitor\Traits\Visitable;
use Shetabit\Visitor\Traits\Visitor;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, Visitor, Visitable, \App\Traits\MustVerifyEmail, CanResetPassword;

    public static $guard_name = 'sanctum';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'balance',
        'phone',
        'password',
        'tfa_enabled',
        'google_2fa_secret',
        'referrer_id',
        'tariff_id',
        'custom_bonus',
        'avatar',
        'status',
        'last_visit',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'google_2fa_secret'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_visit' => 'datetime',
        'balance' => UsdCast::class,
    ];

    public function referrals()
    {
        return $this->hasMany(User::class, 'referrer_id', 'id');
    }

    public function tariff()
    {
        return $this->hasOne(Tariff::class, 'id', 'tariff_id');
    }

    public function referralProgram()
    {
        return $this->hasOne(ReferralProgram::class, 'user_id', 'id');
    }

    public function getReferralLink()
    {
        return ReferralProgram::where('user_id', '=', $this->id);
    }


    public static function getAllStatuses()
    {
        return User::pluck('status')->merge(['new', 'pending call', 'blocked'])->unique()->values();
    }

    public function comment(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }


    public static function getOnlineCount()
    {
        $now = Carbon::now();
        $fiveMinutesAgo = $now->subMinutes(5);
        return User::where('last_visit', '>=', $fiveMinutesAgo)->count();
    }

    public static function updateGeoById(int $id, $geo)
    {
        return User::where('id', '=', $id)->update(['geo', $geo]);
    }

    public static function getCountCreatedToday()
    {
        $today = \Carbon\Carbon::now();
        $today->setHour(0);
        $today->setMinute(0);
        return User::where('created_at', '>=', $today)->count();
    }

    public static function updateStatusById(int $id, string $status = null)
    {
        User::query()->where('id', '=', $id)->update([
            'status' => $status
        ]);
    }

    public static function findWithCredsById(int $id)
    {
        return User::query()
            ->select(['id', 'name', 'surname', 'avatar'])
            ->where('id', '=', $id)
            ->first();
    }
}
