<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use function Symfony\Component\String\u;

class ApiEnsureTfaPassed
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
            if ($user->banned) {
                return new JsonResponse([
                    'type' => 'banned',
                    'message' => 'You are banned',
                ], 403);
            }
            if ($user->tfa_enabled == true) {
                if ($request->user()->currentAccessToken()->abilities[0] != 'tfa') {
                    return $next($request);
                } else {
                    return new JsonResponse([
                        'type' => 'tfa',
                        'message' => 'Need pass tfa',
                    ], 403);
                }
            }
        }
        return $next($request);

    }
}
