<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use function Symfony\Component\String\u;

class ApiEnsureEmailVerified
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        if ($user instanceof User) {
            if ($user->email_verified_at === null) {
                return new JsonResponse([
                    'type' => 'confirm_email',
                    'message' => 'You need confirm email',
                ], 403);
            }

        }
        return $next($request);

    }
}
