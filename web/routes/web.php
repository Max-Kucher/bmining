<?php

use App\Clients\ElectrumExtended;
use App\Enums\AddressType;
use App\Enums\PaymentMethod;
use App\Helpers\ElectrumHelper;
use App\Helpers\Money\BitcoinCurrency;
use App\Helpers\Money\UsdCurrency;
use App\Http\Controllers\Admin\ManagerController;
use App\Http\Controllers\Admin\Settings;
use App\Http\Controllers\Admin\TariffController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\API\UsersController;
use App\Http\Controllers\CurrencyCourseController;
use App\Http\Controllers\KYCController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReferralController;
use App\Http\Controllers\SettingsController;
use App\Models\CryptoAddress;
use App\Models\CryptoPayment;
use App\Models\CurrencyCourse;
use App\Models\Order;
use App\Settings\GeneralSettings;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/link/verify-email/{id}/{hash}', \App\Http\Controllers\Auth\VerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::any('/{any}', function () {
    header('Access-Control-Allow-Origin: *');
    return view('main');
})->where('any', '^(?!link|api|nova|assets).*$');


Route::get('/', function () {
    $tariffs = \App\Models\Tariff::all();
    $tariffsDash = $tariffs->filter(fn($item) => $item->available == true);
    return Inertia::render('Main', [
        'tariffs' => $tariffsDash,
        'hashRate' => app(\App\Settings\GeneralSettings::class)->hashRate,
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
})->name('main');


Route::get('/how-it-works', function () {
    return Inertia::render('HowItWorks', [
    ]);
})->name('how-it-works');

Route::get('/faq', function () {
    return Inertia::render('Faq', [
    ]);
})->name('faq');


Route::get('/about', function () {
    return Inertia::render('About', [
    ]);
})->name('about');

Route::get('/dashboard', function () {
    $user = auth()->user();

    if ($user->hasRole('admin')) {
        return redirect('/admin-dashboard');
    }
    if ($user->hasRole('manager')) {
        return redirect('/manager-dashboard');
    }

    $user->tariff = $user->tariff;

    $miners = \App\Models\UserMiner::getLatestByUser($user->id, 100);
    $tariffs = \App\Models\Tariff::all();
    $tariffsDash = $tariffs->filter(fn($item) => $item->available == true);
    $tariffs = $tariffs->keyBy('id')->toArray();

    $miners = $miners->map(function ($item) use ($tariffs) {
        $item->tariffName = $tariffs[$item->tariff_id]['name'];
        $item->profitPercent = $tariffs[$item->tariff_id]["percent"];
        $item = \App\Helpers\MinerCurrencyHelper::currencyToView($item);
        return $item;
    });

//    dd($miners);

    $orders = Order::findLastsByUser($user->id, 4);

    return Inertia::render('Dashboard', [
        'miners' => $miners,
        'orders' => $orders,
        'referralsCount' => $user->referrals->count(),
        'tariffs' => $tariffsDash,
        'referralLink' => "http://127.0.0.1:8000/invite/" . $user->referralProgram->hash,
        'referralPercent' => app(GeneralSettings::class)->referralPercent,
    ]);
})->middleware(['auth', 'verified', 'tfa'])->name('dashboard');


Route::get('/admin-dashboard', function (\Symfony\Component\HttpFoundation\Request $request) {
    $usersCount = \App\Models\User::query()->count();
    $rolesLabels = [];
    $rolesCounts = [];
    $sumOfRoles = 0;
    $roles = \Spatie\Permission\Models\Role::withCount('users')->get();
    foreach ($roles as $role) {
        $rolesLabels[] = $role->name . "s";
        $rolesCounts[] = $role->users_count;
//        $sumOfRoles += $role->users_count;
    }

    $onlineCount = \App\Models\User::getOnlineCount();
//    $user = auth()->user();


    $ordersToday = Order::getCountCreatedToday();
//    $runningMinersToday = \App\Models\UserMiner::getCountRunningCreatedToday();
    $registeredToDay = \App\Models\User::getCountCreatedToday();

    return Inertia::render('AdminDashboard', [
        'usersCounts' => [
            'count' => $rolesCounts,
            'labels' => $rolesLabels,
        ],
        'onlineUsers' => $onlineCount,
        'commonUsers' => $usersCount,
        'ordersToday' => $ordersToday,
        'runningMinersToday' => $ordersToday,
        'registeredUsersToday' => $registeredToDay,
    ]);
})->middleware(ADMIN_ACCESS)->name('admin.dashboard');


Route::get('/manager-dashboard', function () {
    $authUser = \Illuminate\Support\Facades\Auth::user();
    return Inertia::render('ManagerDashboard', [
        'leadStats' => [
            'totalLeads' => \App\Models\ManagedUser::getCountByManager($authUser->id),
            'todayLeads' => \App\Models\ManagedUser::getCountByManagerToday($authUser->id),
            'totalSales' => \App\Models\ManagerSale::getCountByManager($authUser->id),
            'todaySales' => \App\Models\ManagerSale::getCountByManagerToday($authUser->id),
        ],
    ]);
})->middleware(MANAGER_ACCESS)->name('manager.dashboard');

Route::get('/blocked', function () {
    return 'You have been blocked.';
})->name('blocked');

Route::get('/invite/{hash}', [ReferralController::class, 'invite'])->name('invite');

Route::middleware(USER_ACCESS)->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/updateAvatar', [ProfileController::class, 'updateAvatar'])->name('profile.update.avatar');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(USER_ACCESS)->group(function () {
    Route::get('/settings', [SettingsController::class, 'edit'])->name('settings.edit');
});

//Route::middleware(USER_ACCESS)->group(function () {
//    Route::get('/settings/tfa', [SettingsController::class, 'tfa'])->name('settings.tfa');
//});


Route::middleware(USER_ACCESS)->group(function () {
    Route::get('/referals', [ProfileController::class, 'edit'])->name('referals.show');
    Route::delete('/referals', [ProfileController::class, 'destroy'])->name('referals.destroy');
});

Route::middleware(USER_ACCESS)->group(function () {
    Route::get('/miners', [\App\Http\Controllers\MinerController::class, 'showAll'])->name('miners');

});

//Route::middleware(USER_ACCESS)->group(function () {
//    Route::post('/kyc', [KYCController::class, 'store'])->name('kyc.store');
//});


Route::middleware(USER_ACCESS)->group(function () {
//    Route::patch('/miner/add', [\App\Http\Controllers\MinerController::class, 'add'])->name('miner.store');
});

Route::middleware(USER_ACCESS)->group(function () {
    Route::get('/orders/{id}/processing', [\App\Http\Controllers\OrderController::class, 'showProcessingOrder'])->name('orders.processing.show');
    Route::get('/orders/{id}/check-payment', [\App\Http\Controllers\OrderController::class, 'checkProcessingOrder'])->name('orders.processing.check');
    Route::get('/orders/{id}/cancel-payment', [\App\Http\Controllers\OrderController::class, 'cancelProcessingOrder'])->name('orders.processing.cancel');
    Route::get('/orders/{id}', [\App\Http\Controllers\OrderController::class, 'showOrder'])->name('orders.show');
});


Route::middleware(['auth', 'verified', 'tfa', 'role:admin'])->group(function () {
    Route::get('/admin/download-wallet', function () {
        return response()->download(app(GeneralSettings::class)->walletPath, 'bmining-wallet');
    })->name('admin.download-wallet');
    Route::get('/admin/settings', [Settings::class, 'edit'])->name('admin.settings.edit');
    Route::get('/admin/update-course', [CurrencyCourseController::class, 'updateCourse'])->name('admin.settings.updateCourse');
});

Route::middleware(['auth', 'verified', 'tfa', 'role:admin|manager'])->group(function () {

    Route::get('/manage/orders/{id}', [\App\Http\Controllers\Manage\OrderController::class, 'showSingle'])->name('manage.orders.show');


    Route::get('/manage/my-tasks', [\App\Http\Controllers\Manage\TaskController::class, 'myTasks'])->name('manage.my-tasks');
    Route::get('/manage/users/{id}/miners/add', [\App\Http\Controllers\Manage\MinerController::class, 'addView'])->name('manage.users.miners.add');
    Route::patch('/manage/users/{id}/miners/add', [\App\Http\Controllers\Manage\MinerController::class, 'add'])->name('manage.users.miners.add.store');
    Route::get('/manage/miners/{id}/edit', [\App\Http\Controllers\Manage\MinerController::class, 'updateView'])->name('manage.miners.edit');
    Route::patch('/manage/miners/{id}/edit', [\App\Http\Controllers\Manage\MinerController::class, 'update'])->name('manage.miners.update');

    Route::get('/manage/my-users', [\App\Http\Controllers\Manage\UserController::class, 'showMyUsers'])->name('manage.my-users');
    Route::get('/manage/users', [\App\Http\Controllers\Manage\UserController::class, 'showAll'])->name('manage.users');
    Route::get('/manage/users/{id}/edit', [\App\Http\Controllers\Manage\UserController::class, 'editView'])->name('manage.users.edit');
    Route::get('/manage/users/{id}', [\App\Http\Controllers\Manage\UserController::class, 'show'])->name('manage.users.show');
    Route::patch('/manage/users/{id}', [\App\Http\Controllers\Manage\UserController::class, 'update'])->name('manage.users.update');


    Route::patch('/manage/tasks/add', [\App\Http\Controllers\Manage\TaskController::class, 'storeUserTask'])->name('manage.tasks.store');
    Route::get('/manage/users/{id}/tasks', [\App\Http\Controllers\Manage\TaskController::class, 'getMyUserTasks'])->name('manage.users.tasks');
});

Route::middleware(['auth', 'verified', 'tfa', 'role:admin'])->group(function () {

    Route::get('/admin/managers', [ManagerController::class, 'showAll'])->name('admin.managers');

    Route::get('/admin/tariffs', [TariffController::class, 'showAll'])->name('admin.tariffs');


    Route::get('/admin/users', [UserController::class, 'showAll'])->name('admin.users');
    Route::get('/admin/users/add', [UserController::class, 'add'])->name('admin.users.add');
    Route::get('/admin/users/{id}', [UserController::class, 'show'])->name('admin.users.edit');
});

require __DIR__ . '/groups/tfa.php';
require __DIR__ . '/auth.php';
