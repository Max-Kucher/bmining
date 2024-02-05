<?php

namespace App\Helpers;

use App\Clients\Electrum;
use App\Clients\ElectrumExtended;
use App\Enums\AddressType;
use App\Models\CryptoAddress;
use App\Settings\GeneralSettings;
use Illuminate\Support\Facades\Log;

class ElectrumHelper
{
    /**
     * @return string
     * @throws \Exception
     */
    static function findOrGenerateAddress(): string
    {
        $address = CryptoAddress::findOldestUnusedBtc(AddressType::BTC);
        if ($address === null) {
            $generated = false;

//            try {
                [$electrumApi, $walletPath, $password] = self::getElectrumInstance();
//            } catch (\Throwable $e) {
//                throw $e;
//                dd($e->getMessage());
//            }

            for ($i = 0; $i < 3; $i++) {
                try {
                    $res = $electrumApi->loadWallet($walletPath, $password);
                    $address = $electrumApi->getNewAddress([
                        'wallet' => $walletPath,
                    ]);
                    $generated = true;
                    break;
                } catch (\Exception $e) {
                    Log::error('Cant generate new address for Electrum wallet! Reason: ' . $e->getMessage());
                }
            }
            if ($generated === false) {
                throw new \Exception('Failed to get new or existing bitcoin address');
            }
        }
        return $address;
    }

    static function generateWalletFilepath()
    {
        return config('app.electrum.wallets_dir_path') . '/' . uniqid();
    }

    public static function getBalanceValueByAddress()
    {

    }

    /**
     * @return array
     * @throws \Exception
     */
    public static function getElectrumInstance(): array
    {
        $electrumApi = new ElectrumExtended();
        $walletPath = app(GeneralSettings::class)->walletPath;

        if (!is_file($walletPath)) {
            Log::critical('Cant generate new address for Electrum wallet! Wallet file not exists.');
            throw new \Exception("Wallet not found.");
        }
        $password = config('app.electrum.default_password');
        $res = $electrumApi->loadWallet($walletPath, $password);

        /** @var ElectrumExtended $electrumApi */
        /** @var string $walletPath */
        return [$electrumApi, $walletPath, $password];
    }

}
