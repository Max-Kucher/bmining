<?php

namespace App\Http\Controllers\Manage;

use App\Helpers\Money\BitcoinCurrency;
use App\Helpers\Money\UsdCurrency;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UpdateTariffApiRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Order;
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

class OrderController
{
    public function showAll(Request $request): Response
    {

        $user = Auth::user();
        return Inertia::render('Manage/Users/List', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'tfaEnabled' => $user->tfa_enabled ? true : false,
        ]);
    }

    public function add(Request $request): Response
    {
        $user = Auth::user();
        return Inertia::render('AdminPanel/Users/Add', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'tfaEnabled' => $user->tfa_enabled ? true : false,
            'tariffs' => Tariff::all(['name', 'id']),
        ]);
    }

    public function editView(Request $request, int $id): Response
    {
        return Inertia::render('Manage/Users/Edit', [
            'id' => $id,
            'tariffs' => Tariff::all(['name', 'id']),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }



    public function update(UpdateUserRequest $request, $id)
    {
        $userToChange = User::find($id);
        $validated = $request->validated();
        if (!empty($validated['password'])) {
            $userToChange->password = Hash::make($validated['password']);
        }
        unset($validated['password']);

        if ($validated['email_verified_at'] == true) {
            if ($userToChange->email_verified_at === null) {
                $validated['email_verified_at'] = time();
            }
        } else {
            $validated['email_verified_at'] = null;
        }

        $userToChange->update($validated);
        $userToChange->balance = $validated['balance'] *= 100000000;
        // multiple on 100 000 000 for convert BTC to satoshi
        $userToChange->save();
        return to_route('manage.users.edit', ['id' => $id]);
    }

    public function store(CreateUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);
        $newUser = new User($validated);

        $newUser->save();
        return to_route('admin.users');
    }


    public function destroy($id): RedirectResponse
    {
        $targetUser = User::find($id);
        if ($targetUser !== null) {
            $targetUser->delete();
        }
        return to_route('admin.users');
    }
}
