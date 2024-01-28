<?php

namespace App\Http\Controllers\API;

use App\Helpers\Money\UsdCurrency;
use App\Http\Requests\CreateUserCommentRequest;
use App\Http\Requests\UpdateTariffApiRequest;
use App\Models\Comment;
use App\Models\Tariff;
use App\Models\User;
use App\Models\UserMiner;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Js;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FA\Google2FA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class CommentsController
{
    public function store(CreateUserCommentRequest $request)
    {
        $validated = $request->validated();
        $user = \auth()->user();

        $targetUser = User::find($validated['user_id']);
        $targetUser->comment()->create([
            'text' => $validated['text'],
            'user_id' => $validated['user_id'],
            'author_id' => $user->id,
        ]);

        return new JsonResponse([], 200);
    }

}
