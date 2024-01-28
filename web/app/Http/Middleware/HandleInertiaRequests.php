<?php

namespace App\Http\Middleware;

use App\Models\CurrencyCourse;
use App\Models\ReferralProgram;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tightenco\Ziggy\Ziggy;
use Illuminate\Support\Facades\DB;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = auth()->user();

        if ($user instanceof User) {
            $roles = $user->getRoleNames();
            $user->last_visit = new \DateTime();
            $user->save();
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'roles' => $roles ?? [],
                'user' => $user,
                'hashRate' => app(\App\Settings\GeneralSettings::class)->hashRate,
                'bitcoinCourse' => CurrencyCourse::findCourseInUSDBySymbol('BTC'),
            ],
            'ziggy' => function () use ($request) {
                return array_merge((new Ziggy)->toArray(), [
                    'location' => $request->url(),
                ]);
            },
        ]);
    }
}
