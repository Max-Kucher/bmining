<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\UpdateTariffApiRequest;
use App\Models\KYC;
use App\Models\Tariff;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FA\Google2FA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class KycController
{
    public function getAll()
    {
        return new JsonResponse(KYC::all());
    }


}
