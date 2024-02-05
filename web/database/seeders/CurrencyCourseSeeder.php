<?php

namespace Database\Seeders;

use App\Jobs\UpdateCurrencyCourse;
use App\Models\CurrencyCourse;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CurrencyCourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//        UpdateCurrencyCourse::dispatch();
        CurrencyCourse::updateOrInsert([
            'from' => 'BTC',
            'to' => 'USD',
        ],
            [
                'value' => 4300000,
            ]);

        UpdateCurrencyCourse::dispatch();
    }
}
