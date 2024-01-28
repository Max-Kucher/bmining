<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration {
    public function up(): void
    {
        $this->migrator->add('general.siteName', 'MiningBTC');
        $this->migrator->add('general.siteMaintenance', false);
        $this->migrator->add('general.referralPercent', 5);
        $this->migrator->add('general.depositePercent', []);
        $this->migrator->add('general.hashRate', 23620);
        $this->migrator->add('general.seedPhrase', "");
        $this->migrator->add('general.walletPath', "");
//        $this->migrator->add('general.timezone', "Europe/Prague");
    }
};
