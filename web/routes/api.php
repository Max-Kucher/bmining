<?php

use App\Models\Order;
use App\Settings\GeneralSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

if (!defined('USER_ACCESS')) {
    define('USER_ACCESS', ['auth:sanctum', 'api.tfa', 'api.verified', 'role:admin|customer']);
}
if (!defined('ADMIN_ACCESS')) {
    define('ADMIN_ACCESS', ['auth:sanctum', 'api.tfa', 'api.verified', 'role:admin']);
}
if (!defined('MANAGER_ACCESS')) {
    define('MANAGER_ACCESS', ['auth:sanctum', 'api.tfa', 'api.verified', 'role:manager']);
}
//const USER_ACCESS = ['auth:sanctum', 'api.tfa', 'api.verified', 'role:admin|customer'];
//const ADMIN_ACCESS = ['auth:sanctum', 'api.tfa', 'api.verified', 'role:admin'];
//const MANAGER_ACCESS = ['auth:sanctum', 'api.tfa', 'api.verified', 'role:manager'];

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    $user = \Illuminate\Support\Facades\Auth::user();
    $roles = $user->getRoleNames();
    $user->last_visit = new \DateTime();
    $user->save();
    $userArr = $user->only(['id', 'name', 'surname', 'email', 'phone', 'avatar', 'tfa_enabled', 'balance']);
    $userArr['tfa_enabled'] = $user['tfa_enabled'] ? true : false;
    return new \Illuminate\Http\JsonResponse([
        'user' => $userArr,
        'emailVerified' => $user->email_verified_at !== null,
        'tfaPassed' => $request->user()->currentAccessToken()->abilities[0] != 'tfa',
        'permissions' => $roles,
    ]);
});

Route::middleware(['auth:sanctum'])->get('/currency-rate', function (Request $request) {
    $user = \Illuminate\Support\Facades\Auth::user();
    $btcRate = \App\Models\CurrencyCourse::findBtcCourse();

    return new \Illuminate\Http\JsonResponse([
        'rates' => [
            'btc' => [
                'value' => \App\Helpers\Money\UsdCurrency::createFromAmount($btcRate),
            ]
        ],
    ]);
});


Route::post('/email/verification-notification', [\App\Http\Controllers\API\AuthController::class, 'sendVerificationMail'])
    ->middleware(['throttle:1,5', 'auth:sanctum'])
    ->name('api.verification-mail.send');

Route::post('/forgot-password', [\App\Http\Controllers\Auth\PasswordResetLinkController::class, 'store'])
//    ->middleware(['throttle:1,5'])
    ->name('api.password.email');

Route::post('reset-password', [\App\Http\Controllers\Auth\NewPasswordController::class, 'store'])
    ->name('api.password.store');


Route::get('/main-data', function (Request $request) {
    $tariffs = \App\Models\Tariff::all();
    $tariffsDash = $tariffs->filter(fn($item) => $item->available == true);

    return new \Illuminate\Http\JsonResponse([
        'tariffs' => $tariffsDash,
        'hashRate' => app(\App\Settings\GeneralSettings::class)->hashRate,
    ]);
})->name('api.main-data');

Route::post('/login', [\App\Http\Controllers\API\AuthController::class, 'login'])->name('api.login');
Route::post('/register', [\App\Http\Controllers\API\AuthController::class, 'register'])->name('api.register');


Route::middleware(USER_ACCESS)->group(function () {

    Route::get('/withdraw/my', [\App\Http\Controllers\API\WithdrawalController::class, 'getMyWithdrawals'])->name('api.user-withdraw.list');
    Route::get('/withdraw/info', [\App\Http\Controllers\API\WithdrawalController::class, 'getInfo'])->name('api.user-withdraw.status');
    Route::patch('/withdraw/add', [\App\Http\Controllers\API\WithdrawalController::class, 'addUserWithdraw'])->name('api.user-withdraw.store');
    Route::post('/withdraw/cancel', [\App\Http\Controllers\API\WithdrawalController::class, 'cancelUserWithdraw'])->name('api.user-withdraw.store');


    Route::patch('/miner/add', [\App\Http\Controllers\MinerController::class, 'add'])->name('api.miner.store');

    Route::get('/orders/{id}/processing', [\App\Http\Controllers\OrderController::class, 'showProcessingOrder'])->name('api.orders.processing.show');

    Route::get('/orders/{id}/check-payment', [\App\Http\Controllers\OrderController::class, 'checkProcessingOrder'])->name('api.orders.processing.check');
    Route::get('/orders/{id}/cancel-payment', [\App\Http\Controllers\OrderController::class, 'cancelProcessingOrder'])->name('api.orders.processing.cancel');

    Route::get('/dashboard', function () {
        $user = auth()->user();

//        $user->tariff = $user->tariff;

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
        $orders = Order::findLastsByUser($user->id, 4);
        return new \Illuminate\Http\JsonResponse([
            'hashRate' => app(\App\Settings\GeneralSettings::class)->hashRate,
            'miners' => $miners,
            'orders' => $orders,
            'referralsCount' => $user->referrals->count(),
            'tariffs' => $tariffsDash,
            'referralLink' => $_SERVER['HTTP_HOST'] . "/invite/" . $user->referralProgram->hash,
            'referralPercent' => app(GeneralSettings::class)->referralPercent,
        ]);
    })->name('api.dashboard');
    Route::get('/events', [\App\Http\Controllers\API\EventController::class, 'getUnviewed'])->name('api.events');
    Route::get('/events/mark-read', [\App\Http\Controllers\API\EventController::class, 'markAsViewed'])->name('api.events.read');
    Route::get('/events-count', [\App\Http\Controllers\API\EventController::class, 'getCountUnviewed'])->name('api.events.count');
    Route::delete('/events/{id}', [\App\Http\Controllers\API\EventController::class, 'removeEvent'])->name('api.events.delete');


    Route::get('/kyc', [\App\Http\Controllers\KYCController::class, "get"])->name('events');
    Route::post('/kyc/store', [\App\Http\Controllers\KYCController::class, 'store'])->name('kyc.store');

    Route::patch('/profile', [\App\Http\Controllers\API\ProfileController::class, 'update'])->name('api.profile.update');
    Route::post('/profile/update/avatar', [\App\Http\Controllers\API\ProfileController::class, 'updateAvatar'])->name('api.profile.update.avatar');
    Route::put('/password/update', [\App\Http\Controllers\API\ProfileController::class, 'updatePassword'])->name('api.password.update');

    Route::get('/settings/tfa', [\App\Http\Controllers\SettingsController::class, 'tfa'])->name('api.settings.tfa');

    Route::patch('/settings/tfa/store', [\App\Http\Controllers\TfaController::class, 'store'])->name('api.tfa.store');

    Route::patch('/settings/tfa/disable', [\App\Http\Controllers\TfaController::class, 'disable'])->name('api.tfa.disable');


});

Route::middleware(['auth:sanctum'])->patch('/settings/tfa/pass', [\App\Http\Controllers\TfaController::class, 'pass'])->name('api.tfa.pass');


Route::middleware(['auth:sanctum', 'api.tfa', 'api.verified', 'role:admin|manager'])->group(function () {


    Route::get('/tariffs', [\App\Http\Controllers\API\TariffController::class, 'getAll'])->name('api.tariffs');

    Route::post('/manage/users/{id}/withdrawals', [\App\Http\Controllers\API\WithdrawalController::class, 'getUserWithdrawals'])->name('api.manage.user-withdrawals');
    Route::patch('/manage/withdrawals/{id}/state', [\App\Http\Controllers\API\WithdrawalController::class, "changeWithdrawalState"])->name('api.manage.user-withdrawals');


    Route::get('/manage/miners/{id}', [\App\Http\Controllers\Manage\MinerController::class, 'getSingle'])->name('api.manage.miners.store');
    Route::patch('/manage/users/{id}/miners/add', [\App\Http\Controllers\Manage\MinerController::class, 'add'])->name('api.manage.miners.store');
    Route::patch('/manage/users/{userId}/miners/update', [\App\Http\Controllers\Manage\MinerController::class, 'update'])->name('api.manage.miners.update');


    Route::get("/manager-dashboard", function () {
        $authUser = \Illuminate\Support\Facades\Auth::user();
        return new \Illuminate\Http\JsonResponse([
            'leadStats' => [
                'totalLeads' => \App\Models\ManagedUser::getCountByManager($authUser->id),
                'todayLeads' => \App\Models\ManagedUser::getCountByManagerToday($authUser->id),
                'totalSales' => \App\Models\ManagerSale::getCountByManager($authUser->id),
                'todaySales' => \App\Models\ManagerSale::getCountByManagerToday($authUser->id),
            ],
        ]);
    });

    Route::post('/managers', [\App\Http\Controllers\API\ManagerController::class, 'getAllManagersPaged'])->name('api.managers');
    Route::get('/managers/initials', [\App\Http\Controllers\API\ManagerController::class, 'getAllInitialsOnly'])->name('api.managers.initials');


    Route::get('/manage/orders/{id}', [\App\Http\Controllers\API\OrderController::class, 'showSingle'])->name('api.manage.orders.show');


    Route::post('/manage/sales', [\App\Http\Controllers\API\SalesController::class, 'getSalesFromDate'])->name('api.manage.sales');


    Route::post('/manage/users', [\App\Http\Controllers\API\UsersController::class, 'getManageAll'])->name('api.manage.users');
    Route::post('/manage/users/{id}/change-status', [\App\Http\Controllers\API\UsersController::class, 'changeUserStatus'])->name('api.manage.users.update-status');
    Route::post('/manage/users/{id}/change-manager', [\App\Http\Controllers\API\UsersController::class, 'moveUserToAnotherManager'])->name('api.manage.users.change-manager');


    Route::get('/manage/users/{id}', [\App\Http\Controllers\API\UsersController::class, 'getManageSingle'])->name('api.manage.users.show');
    Route::post('/comments/add', [\App\Http\Controllers\API\CommentsController::class, 'store'])->name('api.manage.comments.add');

    Route::get('/manage/get-lead', [\App\Http\Controllers\API\UsersController::class, 'getLead'])->name('api.manage.get-lead');
    Route::post('/manage/my-users', [\App\Http\Controllers\API\UsersController::class, 'getManagedByCurrentUser'])->name('api.manage.my-users');


    Route::get('/manage/my-tasks', [\App\Http\Controllers\Manage\TaskController::class, 'myTasksApi'])
        ->name('api.manage.my-tasks');
    Route::patch('/manage/tasks/add', [\App\Http\Controllers\Manage\TaskController::class, 'storeUserTask'])->name('api.manage.tasks.store');
    Route::get('/manage/users/{id}/tasks', [\App\Http\Controllers\Manage\TaskController::class, 'getMyUserTasks'])->name('api.manage.users.tasks');
    Route::get('/manage/tasks/count', [\App\Http\Controllers\API\TasksController::class, 'getCountActive'])->name('api.manage.tasks.count');
    Route::get('/manage/tasks/last', [\App\Http\Controllers\API\TasksController::class, 'getLastTasks'])->name('api.manage.tasks.last');
    Route::get('/manage/tasks/last-active', [\App\Http\Controllers\API\TasksController::class, 'getLastTasks'])->name('api.manage.tasks.last-active');
    Route::get('/manage/tasks/{id}/done', [\App\Http\Controllers\API\TasksController::class, 'markAsDone'])->name('api.tasks.markAsDone');

});


Route::middleware(['auth:sanctum', 'api.tfa', 'api.verified', 'role:admin'])->group(function () {
    Route::get("/admin-dashboard", function () {
        $usersCount = \App\Models\User::query()->count();
        $rolesLabels = [];
        $rolesCounts = [];
        $sumOfRoles = 0;
        $roles = \Spatie\Permission\Models\Role::withCount('users')->get();
        foreach ($roles as $role) {
            $rolesLabels[] = $role->name . "s";
            $rolesCounts[] = $role->users_count;
            $sumOfRoles += $role->users_count;
        }

        $onlineCount = \App\Models\User::getOnlineCount();
        $user = auth()->user();


        $ordersToday = Order::getCountCreatedToday();
        $runningMinersToday = \App\Models\UserMiner::getCountRunningCreatedToday();
        $registeredToDay = \App\Models\User::getCountCreatedToday();

        return new \Illuminate\Http\JsonResponse([
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
    });


    Route::get('/admin/settings', [\App\Http\Controllers\Admin\Settings::class, 'index'])->name('api.settings');
    Route::patch('/admin/settings', [\App\Http\Controllers\Admin\Settings::class, 'update'])->name('api.admin.settings.update');


    Route::get('/tariffs/{id}', [\App\Http\Controllers\API\TariffController::class, 'getOne'])->name('api.tariff');
    Route::patch('/tariffs/store', [\App\Http\Controllers\Admin\TariffController::class, 'store'])->name('api.tariff.store');
    Route::delete('/tariffs/{id}', [\App\Http\Controllers\Admin\TariffController::class, 'destroy'])->name('api.tariff.destroy');
    Route::patch('/tariffs/{id}', [\App\Http\Controllers\Admin\TariffController::class, 'update'])->name('api.tariff.update');
    Route::patch('/tariffs/{id}', [\App\Http\Controllers\Admin\TariffController::class, 'update'])->name('api.tariff.update');

    Route::get('/admin/api/kycs', [\App\Http\Controllers\API\KycController::class, 'getAll'])->name('api.kycs');
    Route::get('/admin/kycs', [\App\Http\Controllers\Admin\KycController::class, 'showAll'])->name('admin.kycs');
    Route::patch('/admin/kycs/{id}', [\App\Http\Controllers\Admin\KycController::class, 'update'])->name('admin.kycs.update');
    Route::delete('/admin/kycs/{id}', [\App\Http\Controllers\Admin\KycController::class, 'destroy'])->name('admin.kycs.destroy');


    Route::get('/users', [\App\Http\Controllers\API\UsersController::class, 'getAll'])->name('api.users');
    Route::get('/users/{id}', [\App\Http\Controllers\API\UsersController::class, 'getSingleUserAdm'])->name('api.users.get');
    Route::delete('/users/{id}', [\App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('api.users.delete');
    Route::patch('/users/{id}', [\App\Http\Controllers\Admin\UserController::class, 'update'])->name('api.users.update');

});
