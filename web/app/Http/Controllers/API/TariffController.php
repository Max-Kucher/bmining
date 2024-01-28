<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\UpdateTariffApiRequest;
use App\Models\Tariff;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use PragmaRX\Google2FA\Google2FA;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class TariffController
{
    public function getAll()
    {
        return new JsonResponse(Tariff::all());
    }

    public function getOne(Request $request, int $id)
    {
        return new JsonResponse(Tariff::find($id));
    }



}
