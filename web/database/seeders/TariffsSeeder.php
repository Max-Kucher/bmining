<?php

namespace Database\Seeders;

use App\Models\InvestmentLevel;
use App\Models\Tariff;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TariffsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $investment = new Tariff([
            'name' => 'Light',
            'price' => 250,
            'percent' => 144,
        ]);
        $investment->save();
        $investment = new Tariff([
            'name' => 'Strong',
            'price' => 3700,
            'percent' => 158,

        ]);
        $investment->save();
        $investment = new Tariff([
            'name' => 'Productive',
            'price' => 7800,
            'percent' => 179,
        ]);
        $investment->save();
    }
}
