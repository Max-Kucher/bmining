<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $siteName;
    public bool $siteMaintenance;
    public float $referralPercent;
    public float $hashRate = 23620;
    public array $depositePercent = [];
    public ?string $seedPhrase = '';
    public ?string $walletPath = '';
//    public ?string $timezone = '';

    public static function group(): string
    {
        return 'general';
    }

    public static function getMetadata()
    {
        return [
            'siteName' => [
                'name' => 'Site name',
                'desc' => 'Will be displayed in the title of the page.'
            ],
            'siteMaintenance' => [
                'name' => 'Site maintanence',
                'desc' => 'Site will be closed for maintenance',
                'type' => 'checkbox',
            ],
            'referralPercent' => [
                'name' => 'Referal percent',
                'description' => 'Percent which getting new referrers from referals.'
            ],
            'depositePercent' => [
                "name" => 'Deposite persent',
                "description" => 'Correspondence between the amount and the percentage of profit from the deposit.'
            ],
            'hashRate' => [
                "name" => 'Hashrate on 100$ in GH/s',
                "description" => 'Constant for calculating hashrate from 100$'
            ],
            'seedPhrase' => [
                "name" => 'Seed phrase',
                "description" => 'Seed phrase for wallet.'
            ],

            'walletPath' => [
                "name" => 'Wallet path',
                "description" => 'Full path to wallet on server.'
            ],
            'timezone' => [
                "name" => 'Timezone',
                "description" => 'Timezone in UTC format. For example: Europe/Prague'
            ],

        ];
    }
}
