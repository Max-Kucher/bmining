<?php

namespace App\Http\Controllers\API;

use App\Helpers\Money\UsdCurrency;
use App\Helpers\ResponseHelper;
use App\Http\Requests\UpdateTariffApiRequest;
use App\Models\Comment;
use App\Models\Lead;
use App\Models\ManagedUser;
use App\Models\ManagerInfo;
use App\Models\ManagerSale;
use App\Models\Order;
use App\Models\Tariff;
use App\Models\User;
use App\Models\UserMiner;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Js;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FA\Google2FA;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class ManagerController
{
    public function getAll()
    {
        return new JsonResponse([
            'managers' => User::role('manager')->get(),
        ]);
    }

    public function getAllManagersPaged(Request $request)
    {
        // TODO: Pagination manager list

        $currentUser = \auth()->user();

        $perPage = $request->get('rowsPerPage', 10);
        $page = $request->get('page', 1);
        $filters = $request->get('filters');
        $page += 1;
        $sortBy = $request->get('sortBy');
        $sortDirection = $request->get('sortDir');

        $usersQuery = User::role('manager')->select('users.*');

        if ($sortDirection === 'desc') {
            $usersQuery = $usersQuery->orderByDesc($sortBy ?? 'id');
        } else {
            $usersQuery = $usersQuery->orderBy($sortBy ?? 'id');
        }

        $usersQuery->skip(($page - 1) * $perPage)
            ->take($perPage);
        if (isset($filters['query'])) {
            $usersQuery = $usersQuery
                ->orWhere('email', 'like', "%{$filters['query']}%")
                ->orWhere('phone', 'like', "%{$filters['query']}%")
                ->orWhere('name', 'like', "%{$filters['query']}%")
                ->orWhere('surname', 'like', "%{$filters['query']}%");
        }


        $totalUsers = 0;

        $users = $usersQuery->get()
            ->map(function (User $item) {
                $currentTime = new \DateTime();
                $interval = $currentTime->diff($item->last_visit);
                $item->isOnline = $interval->i <= 5;
                $item->info = ManagerInfo::findByManager($item->id);
                $item->salesCount = ManagerSale::getCountByManager($item->id);
                return $item;
            });

        return response()->json([
            'users' => $users,
            'count' => $totalUsers,
            'current_page' => $page,
            'per_page' => $perPage,
            'last_page' => ceil($totalUsers / $perPage),
        ]);
    }

    public function getAllInitialsOnly()
    {
        return new JsonResponse(
            [
                'managers' => User::role('manager')
                    ->select(['id', 'name', 'surname', 'email'])
                    ->get()
            ]
        );
    }


    public function getManageSingle(int $id)
    {
//        $authUser = \auth()->user();
//
//
//        $targetUser = User::find($id);
//        if ($targetUser === null) {
//            return new JsonResponse([], 404);
//        }
//
//        if ($authUser->hasRole('manager')) {
//            if (!ManagedUser::isExistsByManagerAndUser($authUser->id, $id)) {
//                $targetUser->email = 'Email hidden';
//                $targetUser->phone = 'Phone hidden';
//            }
//
//            if ($targetUser->hasRole(['manager', 'admin'])) {
//                return new JsonResponse([], 403);
//            }
//        }
//
//
//        $orders = Order::findLastsByUser($targetUser->id, 100);
//        $miners = UserMiner::getLatestByUser($targetUser->id, 100);
//        $tariffs = Tariff::all();
//        $tariffs = $tariffs->keyBy('id')->toArray();
//        $miners = $miners->map(function ($item) use ($tariffs) {
//            $item->tariffName = $tariffs[$item->tariff_id]['name'];
//            $item->profitPercent = $tariffs[$item->tariff_id]["percent"];
//            $item->deposit = (new UsdCurrency())->setAmount($item->deposit)->getAmountFloat();
//            $item->profit = (new UsdCurrency())->setAmount($item->profit)->getAmountFloat();
//            return $item;
//        });
//
//
//        return new JsonResponse([
//            'user' => $targetUser,
//            'orders' => $orders,
//            'miners' => $miners,
//            'comments' => Comment::query()->where('commentable_type', '=', User::class)
//                ->where('commentable_id', '=', $targetUser->id)->with('author')->get(),
//            'statuses' => User::getAllStatuses(),
//        ]);
    }

}
