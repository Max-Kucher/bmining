<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\Auth\LoginRequest;
use App\Jobs\DetermineCountry;
use App\Models\ReferralProgram;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use function Symfony\Component\Translation\t;
use Illuminate\Validation\Rules;

class AuthController
{

    public function login(LoginRequest $request)
    {
        $request->authenticate();
        $user = $request->user();
        if ($user === null) {
            \Illuminate\Validation\ValidationException::withMessages([
                'error' => 'Login failed.'
            ]);
        }

        if ($user->tfa_enabled == true) {
            $token = $user->createToken('auth_token', ['tfa']);
        } else {
            $token = $user->createToken('auth_token');
        }

        $roles = $user->getRoleNames();
        return new JsonResponse([
            'roles' => $roles ?? [],
            'token' => $token->plainTextToken,
            'user' => $user->only(['id', 'name', 'surname', 'avatar', 'phone', 'email', 'email_verified_at']),
            'need_tfa' => $user->tfa_enabled == true,
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'surname' => 'required|string|max:50',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'phone' => [
                'required',
                'regex:/^\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/',
                'unique:' . User::class
            ],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $userData = [
            'name' => $request->name,
            'surname' => $request->surname,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
        ];

        $inviteHash = $request->cookies->get('invite');
        if ($inviteHash !== null) {
            $referrerProgram = ReferralProgram::findByHash($inviteHash);
            if ($referrerProgram != null) {
                $userData['referrer_id'] = $referrerProgram->user_id;
            }
        }

        $user = User::create($userData);
        $user->assignRole('customer');
        event(new Registered($user));

        Auth::login($user);

        $ipAddress = $request->ip();
        DetermineCountry::dispatchAfterResponse($ipAddress, $user->id);

        $token = $user->createToken('auth_token');
        return new JsonResponse([
            'user' => $user,
            'token' => $token->plainTextToken,
        ], 200);
    }


    public function sendVerificationMail(\Illuminate\Http\Request $request)
    {
        if ($request->user()->hasVerifiedEmail()) {
            return new JsonResponse([
                'message' => 'You already verified',
            ], 201);
        }

        $request->user()->sendEmailVerificationNotification();

        return new JsonResponse([
            'message' => 'Link sent',
        ], 200);
    }
}
