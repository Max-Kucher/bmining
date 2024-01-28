<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UpdateTariffApiRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\ManagerInfo;
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

class UserController
{
    public function showAll(Request $request): Response
    {

        $user = Auth::user();
        return Inertia::render('AdminPanel/Users', [
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

    public function show(Request $request, int $id): Response
    {
        $user = Auth::user();
        $targetUser = User::find($id);
        return Inertia::render('AdminPanel/Users/Edit', [
            'id' => $id,
            'data' => $targetUser,
            'roles' => $targetUser->getRoleNames()->toArray(),
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'tfaEnabled' => $user->tfa_enabled ? true : false,
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


        if (isset($validated['is_admin'])) {
            if ($validated['is_admin'] == true) {
                $userToChange->assignRole('admin');
            } else {
                $userToChange->removeRole('admin');
            }
        }

        if (isset($validated['is_manager'])) {
            if ($validated['is_manager'] == true) {
                $userToChange->assignRole('manager');
                if (!ManagerInfo::isExistsByUserId($userToChange->id)) {
                    $managerInfo = new ManagerInfo([
                        'balance' => 0,
                        'percent' => 5,
                        'manager_id' => $userToChange->id,
                    ]);
                    $managerInfo->save();
                }
            } else {
                $userToChange->removeRole('manager');
                if (ManagerInfo::isExistsByUserId($userToChange->id)) {
                    ManagerInfo::removeByUserId($userToChange->id);
                }

            }
        }
        $userToChange->save();

        if ($validated['email_verified_at'] == true && $userToChange->email_vefieid_at === null) {
            $userToChange->email_verified_at = time();
        } else if ($validated['email_verified_at'] == false) {
            $userToChange->email_verified_at = null;
        }
        unset($validated['email_verified_at']);

        $userToChange->fill($validated);
        $userToChange->balance = $validated['balance'] *= 100000000;
        // multiple on 100 000 000 for convert BTC to satoshi
        $userToChange->save();

        return new JsonResponse([]);
    }

    public function store(CreateUserRequest $request)
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);
        $newUser = new User($validated);
        $newUser->save();

        if ($validated['is_manager'] == true) {
            $newUser->assignRole('manager');
            $managerInfo = new ManagerInfo([
                'manager_id' => $newUser->id,
                'balance' => 0,
                'percent' => $validated['manager_percent'] ?? 5,
            ]);
            $managerInfo->save();
        } else {
            $newUser->assignRole('customer');
        }

        return new JsonResponse();
    }


    public function destroy($id)
    {
        $targetUser = User::find($id);
        if ($targetUser !== null) {
            $targetUser->destroy($id);
        }
        return new JsonResponse([
        ]);
    }
}
