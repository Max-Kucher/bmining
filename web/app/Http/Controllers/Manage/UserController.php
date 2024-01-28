<?php

namespace App\Http\Controllers\Manage;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UpdateTariffApiRequest;
use App\Http\Requests\UpdateUserRequest;
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
use Nette\Schema\ValidationException;
use PragmaRX\Google2FA\Google2FA;
use Symfony\Component\HttpFoundation\JsonResponse;

class UserController
{
    public function showAll(Request $request)
    {
        $user = Auth::user();

        if ($user->hasRole('manager')) {
            return \redirect('/manage/my-users');
        }
        return Inertia::render('Manage/Users/List', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'tfaEnabled' => $user->tfa_enabled ? true : false,
        ]);
    }

    public function showMyUsers(Request $request): Response
    {

        $user = Auth::user();
        return Inertia::render('Manage/ManagedUsers/List', [
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
        $authUser = Auth::user();

        return Inertia::render('Manage/Users/Edit', [
            'id' => $id,
            'tariffs' => Tariff::all(['name', 'id']),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function show(Request $request, int $id): Response
    {
        return Inertia::render('Manage/Users/Show', [
            'id' => $id,
            'tariffs' => Tariff::all(['name', 'id']),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $authUser = Auth::user();

        $userToChange = User::find($id);

        if ($authUser->hasRole('manager') && $userToChange->hasRole(['admin', 'manager'])) {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'name' => "You haven't permissions to change this user.",
            ]);
        }

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
