<?php

namespace App\Http\Controllers;

use App\Jobs\UpdateCurrencyCourse;
use App\Models\CurrencyCourse;
use Illuminate\Http\Request;

class CurrencyCourseController extends Controller
{
    public function updateCourse()
    {
        UpdateCurrencyCourse::dispatch()->onQueue('default');
//
//        dd(CurrencyCourse::first());
    }
}
