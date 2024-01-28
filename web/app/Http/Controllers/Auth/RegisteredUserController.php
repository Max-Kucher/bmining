<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Jobs\DetermineCountry;
use App\Models\ReferralProgram;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
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

        return redirect(RouteServiceProvider::HOME);
    }
}
