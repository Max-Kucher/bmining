<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Settings\GeneralSettings;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PragmaRX\Google2FA\Google2FA;
use Symfony\Component\HttpFoundation\Request;

class ManagerController extends Controller
{
    public function showAll()
    {
        return Inertia::render('AdminPanel/Managers/List', [
        ]);
    }
}
