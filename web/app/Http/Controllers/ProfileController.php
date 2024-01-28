<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UpdateUserAvatar;
use App\Models\KYC;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FA\Google2FA;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request)
    {
        return \redirect('/settings');

        $user = Auth::user();
        $appName = config('app.name');
        $secret = ((new Google2FA())->generateSecretKey(16));
        $propsData = [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'tfaEnabled' => $user->tfa_enabled ? true : false,
            'kyc' => KYC::findByUserId($user->id),
        ];

        if ($user->tfa_enabled != true) {
            $propsData['qrTfaSecret'] = "otpauth://totp/{$appName}:{$user->email}?secret={$secret}";
            $propsData['tfaSecret'] = $user->tfa_enabled == true ? '' : $secret;
        }
        return Inertia::render('Profile/Edit', $propsData);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = \auth()->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();

        return new JsonResponse();
    }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
//        $request->validate([
//            'password' => ['required', 'current-password'],
//        ]);
//
//        $user = $request->user();
//
//        Auth::logout();
//
//        $user->delete();
//
//        $request->session()->invalidate();
//        $request->session()->regenerateToken();
//
        return Redirect::to('/');
    }


    public function updateAvatar(UpdateUserAvatar $request)
    {
        $user = $request->user();

        $validated = $request->validated();
        $result = Storage::disk('public')->put("avatars", $validated['avatar']);
        $fullPath = "/storage/" . $result;
        $user->fill([
            'avatar' => $fullPath,
        ]);
        unset($user->isAdmin);
        $user->save();

        return new JsonResponse();
    }
}
