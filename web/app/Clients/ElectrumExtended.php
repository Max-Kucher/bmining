<?php

namespace App\Clients;

class ElectrumExtended extends Electrum
{
    public function getWalletsList()
    {
        return $this->sendRequest('list_wallets');
    }

    public function loadWallet($walletPath, $password = null)
    {
        $params = [
            'wallet_path' => $walletPath
        ];
        if ($password !== null) {
            $params['password'] = $password;
        }
        return $this->sendRequest('load_wallet', $params);
    }

    public function getNewAddress($params)
    {
        return $this->sendRequest('createnewaddress', $params);
    }

    public function restoreWalletFromSeed($seed, $walletPath, $password = null)
    {
        $params = [
            'text' => $seed,
            'wallet_path' => $walletPath
        ];
        if ($password !== null) {
            $params['password'] = $password;
        }
        return $this->sendRequest('restore', $params);
    }
}
