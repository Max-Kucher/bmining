<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(\App\Http\Requests\EmailVerificationRequest $request, int $id): RedirectResponse
    {
        $targetUser = User::findWithCredsById($id);
        if ($targetUser === null) {
            return abort(404);
        }


        if ($targetUser->markEmailAsVerified()) {
            event(new Verified($targetUser));
        }


        return redirect(RouteServiceProvider::HOME);
    }
}
