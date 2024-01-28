<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UpdateUserAvatar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\JsonResponse;
use Illuminate\Validation\Rules\Password;

class ProfileController
{
    public function update(ProfileUpdateRequest $request)
    {
        $user = \auth()->user();
        $user->fill($request->validated());

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
        $user->save();

        $userArr = $user->only(['id', 'name', 'surname', 'email', 'phone', 'avatar', 'tfa_enabled']);
        $userArr['tfa_enabled'] = $user['tfa_enabled'] ? true : false;

        return new JsonResponse([
            'user' => $userArr,
        ], 200);
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

        return new JsonResponse([
            'avatar' => $fullPath,
        ], 200);
    }

    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
//            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return new JsonResponse([]);
    }
}
