<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use PragmaRX\Google2FA\Google2FA;

class TfaController extends Controller
{
    public function show()
    {
        return Inertia::render('Settings/Settings', [
        ]);
    }

    public function needPass()
    {
        return Inertia::render('Auth/TfaPass', [
        ]);

    }

    public function pass(Request $request)
    {
        $request->validate([
            'code' => 'required'
        ]);

        $user = Auth::user();
        $google2fa = new Google2FA();
        $valid = $google2fa->verifyKey($user->google_2fa_secret, $request->code);

        if ($valid) {
            #tfa passed, generate new token without TFA possibilities
            $newToken = $user->createToken('auth_token');
            return new JsonResponse([
                'token' => $newToken->plainTextToken,
            ], 200);
        } else {
            throw ValidationException::withMessages(['code' => 'Invalid verification code']);
        }
    }

    public function disable(Request $request)
    {
        $request->validate([
            'code' => 'required'
        ]);

        $user = Auth::user();
        $google2fa = new Google2FA();
        $valid = $google2fa->verifyKey($user->google_2fa_secret, $request->code);

        if ($valid) {
            session(['2fa_passed' => true]);
            $user->tfa_enabled = false;
            $user->google_2fa_secret = '';
            $user->save();

            return redirect('/profile');
        } else {
            throw ValidationException::withMessages(['code' => 'Invalid verification code.']);
        }
    }


    public function store(Request $request)
    {
        $user = Auth::user();
        if ($user->tfa_enabled == true) {
            throw ValidationException::withMessages(['code' => 'TFA already enabled.']);
        }

        $request->validate([
            'code' => 'required',
            'secret' => 'required'
        ]);

        $google2fa = new Google2FA();


        $valid = $google2fa->verify($request->get('code'), $request->get('secret'));
        if ($valid) {
            $user->google_2fa_secret = $request->get('secret');
            $user->tfa_enabled = true;
            $user->save();
            return redirect('/settings');
        } else {
            throw ValidationException::withMessages(['code' => 'Invalid verification code, try again.']);
        }

        return new JsonResponse([]);
    }
}
