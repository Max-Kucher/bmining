<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UpdateKycAdminRequest;
use App\Http\Requests\UpdateTariffApiRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\KYC;
use App\Models\Tariff;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FA\Google2FA;
use Symfony\Component\HttpFoundation\JsonResponse;

class KycController
{
    public function showAll(Request $request): Response
    {

        $user = Auth::user();
        return Inertia::render('AdminPanel/KYC', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'tfaEnabled' => $user->tfa_enabled ? true : false,
        ]);
    }

    public function add(Request $request): Response
    {
        $user = Auth::user();
        return Inertia::render('AdminPanel/KYC/Add', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'tfaEnabled' => $user->tfa_enabled ? true : false,
        ]);
    }

    public function show(Request $request, int $id): Response
    {
        $user = Auth::user();
        return Inertia::render('AdminPanel/KYC/Edit', [
            'id' => $id,
            'data' => KYC::find($id),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'tfaEnabled' => $user->tfa_enabled ? true : false,
        ]);
    }

    public function update(UpdateKycAdminRequest $request, $id)
    {
        $kycToChange = KYC::find($id);
        $validated = $request->validated();
        $kycToChange->update($validated);
        $kycToChange->save();
        return to_route('admin.kycs');
    }

//    public function store(CreateUserRequest $request)
//    {
//        $validated = $request->validated();
//        $validated['password'] = Hash::make($validated['password']);
//        $newUser = new User($validated);
//
//        $newUser->save();
//        return to_route('admin.users');
//    }


    public function destroy($id): RedirectResponse
    {
        $targetUser = User::find($id);
        if ($targetUser !== null) {
            $targetUser->delete();
        }
        return to_route('admin.users');
    }
}
