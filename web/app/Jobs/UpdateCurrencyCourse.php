<?php

namespace App\Jobs;

use App\Clients\CoinApiIo;
use App\Helpers\Money\UsdCurrency;
use App\Models\CurrencyCourse;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class UpdateCurrencyCourse implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
//        $coinApi = CoinApiIo::getInstance($_ENV['APP_COINAPI_API_KEY']);
//        try {
//            $courses = $coinApi->getMainCurrencyCourse();
//            foreach ($courses as $key => $courseValueInUSD) {
//                $usdCurrency = (new UsdCurrency())->setAmountFloat($courseValueInUSD);
//                CurrencyCourse::updateOrInsert([
//                    'from' => $key,
//                    'to' => 'USD',
//                ],
//                    [
//                        'value' => $usdCurrency->getAmount(),
//                    ]);
//            }
//        } catch (\Exception $e) {
//            Log::critical("Can't update currency course! CoinAPI error. Reason: " . $e->getMessage());
//        }

        $currenciesData = file_get_contents("https://api.coinbase.com/v2/exchange-rates?currency=BTC");
        $decodedData = json_decode($currenciesData, true);
        Log::error(var_export($decodedData, true));
        if (strtolower($decodedData['data']['currency']) == 'btc') {
            $usdCurrency = (new UsdCurrency())->setAmountFloat($decodedData['data']['rates']['USD']);
            CurrencyCourse::updateOrInsert([
                'from' => "BTC",
                'to' => 'USD',
            ],
                [
                    'value' => $usdCurrency->getAmount(),
                ]);
        }

    }
}
