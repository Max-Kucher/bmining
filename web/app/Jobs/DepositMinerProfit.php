<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\UserMiner;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DepositMinerProfit implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $miners = UserMiner::findAllForProfitCalc();
        foreach ($miners as $miner) {
            $tariff = $miner->tariff;
            if ($tariff === null) {
                Log::critical("Miner ID: #{$miner->id}. Critical error occurted during calculate day profit for sum.");
                continue;
            }
            $profitCoeff = $tariff->percent / 100;
            unset($tariff);
            $depositSum = $miner->deposit;
            $dayProfitSum = ($depositSum * $profitCoeff) / 365;
            DB::beginTransaction();
            try {
                $user = User::find($miner->user_id);
                if ($user === null) {
                    Log::warning('Trying update balance for non-existing user. Miner ID:' . $miner->id);
                }
                $user->balance = $user->balance->getAmount() + $dayProfitSum;

                $miner->profit += $dayProfitSum;
                $miner->save();
                DB::commit();
            } catch (\Exception $e) {
                Log::critical('Error ocured white updating miner profit balance. MinerID:' . $miner->id);
                DB::rollBack();
            }
        }
    }
}
