<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CurrencyCourse extends Model
{
    use HasFactory;

    protected $fillable = [
        'from', 'to', 'value'
    ];

    public static function findCourseInUSDBySymbol($symbol)
    {
        $symbol = strtoupper($symbol);
        $currencyCourse = CurrencyCourse::where('from', '=', $symbol)->where('to', '=', 'USD')->get()->first();
        return $currencyCourse->value ?? 0;
    }

    public static function findBtcCourse()
    {
        return self::findCourseInUSDBySymbol('btc');
    }

    public static function convertByCourse($sumToConvert, $course)
    {
        if ($course === 0) {
            throw new \Exception('Currency course cant by a zero');
        }
        return $sumToConvert / $course;
    }
}
