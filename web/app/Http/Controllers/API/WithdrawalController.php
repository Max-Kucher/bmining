<?php

namespace App\Http\Controllers\API;

use App\Enums\Withdrawal\WithdrawalState;
use App\Helpers\Money\UsdCurrency;
use App\Helpers\ResponseHelper;
use App\Http\Requests\AddUserWithdrawRequest;
use App\Models\Event;
use App\Models\ManagedUser;
use App\Models\Task;
use App\Models\User;
use App\Models\WithdrawalRequest;
use http\Env\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Js;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Psy\Util\Json;

class WithdrawalController
{
    public function getMyWithdrawals()
    {
        $user = Auth::user();
        return new JsonResponse([
            'items' => WithdrawalRequest::findByUserId($user->id)
        ]);
    }

    public function addUserWithdraw(AddUserWithdrawRequest $request)
    {
        $validated = $request->validated();

        $sumToWithdraw = UsdCurrency::createFromFloatAmount($validated['sum']);
        DB::beginTransaction();
        $user = Auth::user();

        $availableBalance = $user->balance->getAmount();
        $availableBalance -= WithdrawalRequest::getPendingSumByUser($user->id);
        if ($availableBalance < $sumToWithdraw->getAmount()) {
            throw ValidationException::withMessages([
                'lowBalance' => "Can't create withdrawal request. Not enough free funds to withdraw."
            ]);
        }

        try {
            DB::commit();

            $managerId = ManagedUser::findManagerIdByUser($user->id);
            if ($managerId === null) {
                // TODO: create system for select random manager, if user don't have anyone
            }
            Task::createWithdrawalTask($user->id, $sumToWithdraw->getAmountFloat(), $managerId);

            $newWithdrawal = new WithdrawalRequest([
                'sum' => $sumToWithdraw->getAmount(),
                'user_id' => $user->id,
                'method' => $validated['method'],
                'address' => $validated['address'],
            ]);
            $newWithdrawal->save();

//            Task::
        } catch (\Exception $e) {

            Log::critical('Error ocured while');
            DB::rollBack();
            throw ValidationException::withMessages([
                'error' => "Can't create withdrawal request. " . $e->getMessage()
            ]);
        }

        return new JsonResponse([
            'status' => 'ok'
        ]);
    }

    public static function cancelUserWithdraw(\Illuminate\Http\Request $request)
    {
        $request->validate([
            'id' => ['required', 'numeric', Rule::exists('withdrawal_requests', 'id')],
        ]);

        $validated = $request->all();

        $withdrawRequestId = $validated['id'];
        $user = Auth::user();
        $withdrawRequest = WithdrawalRequest::findByUserAndId($user->id, $withdrawRequestId);

        if ($withdrawRequest === null) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('Withdrawal request not found.', 404));
        }

        if ($withdrawRequest->state === WithdrawalState::CANCELED) {
            return new JsonResponse([], 200);
        }

        if ($withdrawRequest->state === WithdrawalState::PAID) {
            throw ValidationException::withMessages([
                'error' => "Can't cancel. Already paid."
            ]);
        }


        $currentTime = new \DateTime();
        if ($currentTime->diff(new \DateTime($withdrawRequest->created_at))->i >= 10) {
            throw ValidationException::withMessages([
                'error' => "You cannot cancel the withdrawal request because the cancellation time has already passed."
            ]);
        }

        $withdrawRequest->cancelWithdrawal();

        return new JsonResponse([], 200);
    }

    public function getInfo()
    {
        $user = Auth::user();
        $pendingSum = WithdrawalRequest::getPendingSumByUser($user->id);
        if ($pendingSum != 0) {
            $pendingSum = UsdCurrency::createFromAmount($pendingSum);
        }
        return new JsonResponse([
            'pending' => $pendingSum,
        ]);
    }


    public function getUserWithdrawals(\Illuminate\Http\Request $request, int $userId)
    {
        $page = $request->get('page') ?? 0;
        $perPage = 100;

        $withdrawalsQuery = WithdrawalRequest::query()
            ->orderByDesc('created_at')
            ->where('user_id', '=', $userId);

        $withdrawalsQuery->skip(($page) * $perPage)
            ->take($perPage);
        return new JsonResponse([
            'items' => $withdrawalsQuery->get(),
        ]);
    }

    public function changeWithdrawalState(int $withdrawalId, \Illuminate\Http\Request $request)
    {
        $request->validate([
            'state' => ['required', Rule::in([WithdrawalState::PAID, WithdrawalState::PENDING, WithdrawalState::CANCELED])]
        ]);


        $withdrawal = WithdrawalRequest::find($withdrawalId);
        if ($withdrawal === null) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('Withdrawal not found.'), 404);
        }
        $user = Auth::user();
        if (!$user->hasRole(['admin'])) {
            if (ManagedUser::findManagerIdByUser($withdrawal->user_id) !== $user->id) {
                return new JsonResponse(ResponseHelper::jsonErrorMsg("You can't change withdrawal status for this user."), 403);
            }
        }
        $targetUser = User::find($withdrawal->user_id);

        if ($targetUser === null) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg("Can't change withdrawal status for not exists user."), 400);
        }

        if ($withdrawal->state === $request->get('state')) {
            return new JsonResponse([
                'message' => 'No change'
            ], 200);
        }

        DB::beginTransaction();
        try {

            $withdrawalState = $request->get('state');
            $withdrawAmount = $withdrawal->sum->getAmount();
            $balanceAmount = $targetUser->balance->getAmount();
            switch ($withdrawalState) {
                case WithdrawalState::CANCELED:
                    if ($withdrawalState === WithdrawalState::PAID) {
                        $balanceAmount = $balanceAmount + $withdrawAmount;
                    }
                    break;
                case WithdrawalState::PENDING:
                    if ($withdrawalState === WithdrawalState::PAID) {
                        $balanceAmount = $balanceAmount + $withdrawAmount;
                    }
                    break;
                case WithdrawalState::PAID:
                    $balanceAmount = $balanceAmount - $withdrawAmount;
                    break;
            }

            if ($balanceAmount < 0) {
                return new JsonResponse(ResponseHelper::jsonErrorMsg("Can't do it. After this action, the user's balance will become negative!!! Balance:" . $targetUser->balance), 400);
            }
            $targetUser->balance = $balanceAmount;
            $targetUser->save();

            $withdrawal->state = $request->get('state');
            $withdrawal->save();
            DB::commit();
        } catch (\Exception $e) {
            Log::critical('Database error white changing state of withdraw request #' . $withdrawalId);
            return new JsonResponse(ResponseHelper::jsonErrorMsg("Database error"), 400);
        }

        return new JsonResponse([]);
    }
}
