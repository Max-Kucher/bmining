<?php

namespace App\Jobs;

use App\Models\User;
use GeoIp2\Database\Reader;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class DetermineCountry implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public $ipAddress, public $userId)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $countryReader = new Reader(__DIR__ . "/../../GeoLite2-Country.mmdb");
        try {
            $record = $countryReader->country($this->ipAddress);
        } catch (\Exception $e) {
            Log::error("Can't determine GEO for IP address: " . $_SERVER['REMOTE_ADDR']);
        }
        User::updateGeoById($this->userId, $record->country->isoCode);
    }
}
