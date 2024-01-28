<?php

namespace App\Http\Controllers\API;

use App\Helpers\Money\UsdCurrency;
use App\Helpers\ResponseHelper;
use App\Http\Requests\UpdateTariffApiRequest;
use App\Models\Comment;
use App\Models\Lead;
use App\Models\ManagedUser;
use App\Models\Order;
use App\Models\Tariff;
use App\Models\User;
use App\Models\UserMiner;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Js;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FA\Google2FA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class UsersController
{
    public function getAll()
    {
        return new JsonResponse(User::all());
    }

    public function getManageAll(Request $request)
    {

        $currentUser = \auth()->user();

        $perPage = $request->get('rowsPerPage', 10);
        $page = $request->get('page', 1);
        $filters = $request->get('filters');
        $page += 1;
        $sortBy = $request->get('sortBy');
        $sortDirection = $request->get('sortDir');

        $usersQuery = User::select('users.*')
            ->join('leads', 'users.id', '=', 'leads.user_id');

        if ($sortDirection === 'desc') {
            $usersQuery = $usersQuery->orderByDesc($sortBy ?? 'id');
        } else {
            $usersQuery = $usersQuery->orderBy($sortBy ?? 'id');
        }

        $usersQuery->skip(($page - 1) * $perPage)
            ->take($perPage);
        if (isset($filters['query'])) {
            if ($currentUser->hasRole('admin')) {
                $usersQuery = $usersQuery
                    ->orWhere('email', 'like', "%{$filters['query']}%")
                    ->orWhere('phone', 'like', "%{$filters['query']}%")
                    ->orWhere('name', 'like', "%{$filters['query']}%")
                    ->orWhere('surname', 'like', "%{$filters['query']}%");
            } else {
                $usersQuery = $usersQuery
                    ->orWhere('email', '=', $filters['query'])
                    ->orWhere('phone', '=', $filters['query']);
            }
        }

        if (isset($filters['status']) && !empty($filters['status'])) {
            $usersQuery->where('status', 'like', "%{$filters['status']}%");
        }

        $totalUsers = 0;
        $isAdmin = false;
        $managedUsers = [];
        if (!$currentUser->hasRole('admin')) {
            if (isset($filters['query']) || isset($filters['email'])) {
                $users = $usersQuery->get()
                    ->map(function (User $item) use ($managedUsers, $isAdmin) {
                        if ($isAdmin === false) {
                            if (!in_array($item->id, $managedUsers)) {
                                $item->email = 'Email hidden';
                                $item->phone = 'Hidden';
                            }
                        }

                        $item->totalMiners = UserMiner::getCountByUser($item->id);
                        $item->totalDeposit = (new UsdCurrency())->setAmount(UserMiner::getTotalDepositByUser($item->id))->getAmountFloat();
                        $currentTime = new \DateTime();
                        $interval = $currentTime->diff($item->last_visit);
                        $item->isOnline = $interval->i <= 5;
                        return $item;
                    });
            } else {
                $users = [];
            }
        } else {
            $isAdmin = true;
            $users = $usersQuery->get()
                ->map(function (User $item) use ($managedUsers, $isAdmin) {
                    if ($isAdmin === false) {
                        if (!in_array($item->id, $managedUsers)) {
                            $item->email = 'Email hidden';
                            $item->phone = 'Hidden';
                        }
                    }

                    $item->totalMiners = UserMiner::getCountByUser($item->id);
                    $item->totalDeposit = (new UsdCurrency())->setAmount(UserMiner::getTotalDepositByUser($item->id))->getAmountFloat();
                    $currentTime = new \DateTime();
                    $interval = $currentTime->diff($item->last_visit);
                    $item->isOnline = $interval->i <= 5;
                    return $item;
                });

            $totalUsers = Lead::count();
        }


        return response()->json([
            'users' => $users,
            'statuses' => User::getAllStatuses(),
            'count' => $totalUsers,
            'current_page' => $page,
            'per_page' => $perPage,
            'last_page' => ceil($totalUsers / $perPage),
        ]);
    }


    public function getManageSingle(int $id)
    {
        $authUser = \auth()->user();

        $targetUser = User::find($id);
        if ($targetUser === null) {
            return new JsonResponse([], 404);
        }

        $userManagerId = ManagedUser::findManagerIdByUser($targetUser->id);


        if ($authUser->hasRole('manager')) {
            if ($userManagerId === null || $userManagerId !== $authUser->id) {
                $targetUser->email = 'Email hidden';
                $targetUser->phone = 'Phone hidden';
            }

            if ($targetUser->hasRole(['manager', 'admin'])) {
                return new JsonResponse([], 403);
            }
        }


        $orders = Order::findLastsByUser($targetUser->id, 100);
        $miners = UserMiner::getLatestByUser($targetUser->id, 100);
        $tariffs = Tariff::all();
        $tariffs = $tariffs->keyBy('id')->toArray();
        $miners = $miners->map(function ($item) use ($tariffs) {
            $item->tariffName = $tariffs[$item->tariff_id]['name'];
            $item->profitPercent = $tariffs[$item->tariff_id]["percent"];
            $item->deposit = (new UsdCurrency())->setAmount($item->deposit)->getAmountFloat();
            $item->profit = (new UsdCurrency())->setAmount($item->profit)->getAmountFloat();
            return $item;
        });

        $userManager = null;
        if ($userManagerId !== null) {
            $userManager = User::findWithCredsById($userManagerId);
        }

        return new JsonResponse([
            'user' => $targetUser,
            'roles' => $targetUser->roles->pluck('name')->toArray(),
            'orders' => $orders,
            'miners' => $miners,
            'manager' => $userManager,
            'comments' => Comment::query()->where('commentable_type', '=', User::class)
                ->where('commentable_id', '=', $targetUser->id)->with('author')->get(),
            'statuses' => User::getAllStatuses(),
        ]);
    }


    public function getManagedByCurrentUser(Request $request)
    {
        $currentUser = \auth()->user();

        $perPage = $request->get('rowsPerPage', 10);
        $page = $request->get('page', 1);
        $filters = $request->get('filters');
        $page += 1;
        $sortBy = $request->get('sortBy');
        $sortDirection = $request->get('sortDir');

        $managedUsersIds = ManagedUser::getArrayUserIdsByManagerId($currentUser->id);
        $usersQuery = User::query()->whereIn('id', $managedUsersIds);


        if ($sortDirection === 'desc') {
            $usersQuery = $usersQuery->orderByDesc($sortBy ?? 'id');
        } else {
            $usersQuery = $usersQuery->orderBy($sortBy ?? 'id');
        }

        $usersQuery->skip(($page - 1) * $perPage)
            ->take($perPage);
        if (isset($filters['query'])) {
            $usersQuery = $usersQuery
                ->where('email', '=', $filters['query'])
                ->orWhere('name', 'like', "%{$filters['query']}%")
                ->orWhere('surname', 'like', "%{$filters['query']}%");
        }
        if (isset($filters['status']) && !empty($filters['status'])) {
            $usersQuery->where('status', 'like', "%{$filters['status']}%");
        }


        $users = $usersQuery->get()
            ->map(function (User $item) {
                $item->totalMiners = UserMiner::getCountByUser($item->id);
                $item->totalDeposit = (new UsdCurrency())->setAmount(UserMiner::getTotalDepositByUser($item->id))->getAmountFloat();
                $currentTime = new \DateTime();
                $interval = $currentTime->diff($item->last_visit);
                $item->isOnline = $interval->i <= 5;
                return $item;
            });

        $totalUsers = ManagedUser::getCountByManager($currentUser->id);

        return response()->json([
            'users' => $users,
            'count' => $totalUsers,
            'statuses' => User::getAllStatuses(),
            'current_page' => $page,
            'per_page' => $perPage,
            'last_page' => ceil($totalUsers / $perPage),
        ]);
    }


    public function getLead(): JsonResponse
    {
        $user = Auth::user();

        $oldestLead = Lead::getOldestLead();
        if ($oldestLead === null) {
            return new JsonResponse(
                ResponseHelper::jsonErrorMsg('Cant find leads. List empty.'),
                422
            );
        }

        $oldestLead->update([
            'state' => Lead::PROCESSED,
        ]);

        try {
            $newManagedUser = ManagedUser::createByManagerAndUser($user->id, $oldestLead->user_id);
        } catch (\Exception $e) {
            Log::error("Cant create new managed user durring getting new lead. Lead id: {$oldestLead->id}");
        }

        User::updateStatusById($oldestLead->id, 'pending');

        return new JsonResponse([
            'user_id' => $oldestLead->user_id,
            'managed_id' => $newManagedUser->id,
        ]);
    }

    public function changeUserStatus(Request $request, int $userId)
    {
        $validated = $request->validate([
            'status' => ['required', 'string', 'max:30'],
        ]);

        $user = \auth()->user();
        $targetUser = User::find($userId);
        if ($targetUser === null) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('User not found'), 404);
        }

        if (($targetUser->hasRole(['admin', 'manager'])) && !$user->hasRole('admin')) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg("You can't change status for this user!"), 403);
        }

        $targetUser->status = $validated['status'];
        $targetUser->save();

        return new JsonResponse([
            'message' => 'Status changed'
        ], 200);
    }


    public function moveUserToAnotherManager(Request $request, int $id)
    {
        $validated = $request->validate([
            'manager_id' => ['numeric', 'required', Rule::exists('users', 'id')],
        ]);
        $authUser = Auth::user();
        $targetUser = User::find($id);

        if ($targetUser === null) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('Target user not found!'), 404);
        }


        $targetManager = User::find($validated['manager_id']);

        if ($targetUser->hasRole('manager')) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('You cant give manager to another manager.'), 403);
        }
        if (!$targetManager->hasRole('manager')) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('Is not manager!'), 403);
        }


        $managedUserManagerId = ManagedUser::findManagerIdByUser($targetUser->id);

        if ($authUser->hasRole('admin')) {
            if ($managedUserManagerId === null) {
                $managedUser = new ManagedUser([
                    'manager_id' => $targetManager->id,
                    'user_id' => $targetUser->id,
                ]);
                $managedUser->save();
                unset($managedUser);
            } else {
                $result = ManagedUser::updateManagerIdByUser(
                    $targetUser->id,
                    $validated['manager_id']
                );
            }
        }

        if ($authUser->hasRole('manager')) {
            if ($managedUserManagerId === $authUser->id) {
                ManagedUser::updateManagerIdByUserAndManager(
                    $targetUser->id,
                    $authUser->id,
                    $targetManager->id,
                );
            } else {
                return new JsonResponse(ResponseHelper::jsonErrorMsg('You cant do it!'), 403);
            }
        }


        return new JsonResponse([
            'message' => 'User passed to another amanger successfuly',
        ], 200);
    }

    public function getSingleUserAdm(int $id)
    {
        $targetUser = User::find($id);
        return new JsonResponse([
            'id' => $id,
            'user' => $targetUser,
            'roles' => $targetUser->getRoleNames()->toArray(),
        ]);
    }
}
