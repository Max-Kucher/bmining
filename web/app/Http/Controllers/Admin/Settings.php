<?php

namespace App\Http\Controllers\Admin;

use App\Clients\ElectrumExtended;
use App\Helpers\ElectrumHelper;
use App\Http\Controllers\Controller;
use App\Settings\GeneralSettings;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Request;

class Settings extends Controller
{
    public function edit()
    {
        return Inertia::render('AdminPanel/Settings', [
            'status' => session('status'),
            'settings' => app(GeneralSettings::class),
            'settingsMetadata' => GeneralSettings::getMetadata(),
        ]);
    }

    public function index()
    {
        return new JsonResponse([
            'settings' => app(GeneralSettings::class)->toArray(),
            'settingsMetadata' => GeneralSettings::getMetadata(),
        ]);
    }

    public function update(Request $request)
    {
        // TODO: ОПАСНО, НУЖНО НАСТРОИТЬ ВАЛИДАЦИЮ!!!
        $request->validate([

        ]);
        $generalSettings = app(GeneralSettings::class);
        foreach ($request->all() as $key => $value) {
            if ($key == "siteMaintenance") {
                $generalSettings->$key = (bool)$value;
                if ($generalSettings->$key == true) {
                    Artisan::call('down');
                } else {
                    Artisan::call('up');
                }
            } elseif ($key === 'walletPath') {
                continue;
            } elseif ($key === 'seedPhrase' && $generalSettings->seedPhrase !== $value) {
                if ($value == '') {
                    $generalSettings->seedPhrase = '';
                    $generalSettings->walletPath = '';
                    continue;
                }
                $electrum = new ElectrumExtended();
                try {
                    $newWalletPath = ElectrumHelper::generateWalletFilepath();
                    $password = config('app.electrum.default_password');

                    try {
                        $response = $electrum->restoreWalletFromSeed($value, $newWalletPath, $password);
                    } catch (\Throwable $e) {
                        dd($e->getMessage());
                    }

                    if (!isset($response->path) && !isset($response['path'])) {
                        throw new \Exception('Cant restore wallet from seed. Unexpected response:' . json_encode($response));
                    }
                    $response = $electrum->loadWallet($newWalletPath, $password);
                    if ($response === false) {
                        throw new \Exception("Cant load wallet. Electrum JSON RPC returns false response.");
                    }
                    $generalSettings->seedPhrase = $value;
                    $generalSettings->walletPath = $newWalletPath;
                } catch (\Exception $e) {
                    Log::error('Restoring wallet from seed failed. Reason: ' . $e->getMessage());
                    throw ValidationException::withMessages([$key => 'Cant restore wallet from this seed!']);
                }
            } else {
                $generalSettings->$key = $value;
            }

        }
        $generalSettings->save();

        return (new JsonResponse([]))->withCookie(cookie('maintenance', 'maintenance_watcher', 60 * 24 * 365));
    }
}
