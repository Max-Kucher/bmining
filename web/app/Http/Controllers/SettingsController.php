<?php

namespace App\Http\Controllers;

use App\Models\KYC;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PragmaRX\Google2FA\Google2FA;
use Symfony\Component\HttpFoundation\Request;

class SettingsController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): \Inertia\Response
    {
        $user = \auth()->user();
        return Inertia::render('Settings/Settings', [
            'kyc' => KYC::findByUserId($user->id),
        ]);
    }

    public function tfa(Request $request)
    {
        $user = Auth::user();
        $appName = config('app.name');
        $secret = ((new Google2FA())->generateSecretKey(16));
        $propsData = [
            'tfaEnabled' => $user->tfa_enabled,
        ];

        if ($user->tfa_enabled != true) {
            $propsData['qrTfaSecret'] = "otpauth://totp/{$appName}:{$user->email}?secret={$secret}";
            $propsData['tfaSecret'] = $user->tfa_enabled == true ? '' : $secret;
        }
        return new JsonResponse($propsData);
    }
}
