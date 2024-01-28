<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UpdateTariffApiRequest;
use App\Models\Tariff;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TariffController
{
    public function update(UpdateTariffApiRequest $request, $id)
    {
        $tariff = Tariff::find($id);
        $tariff->update($request->validated());
        return new JsonResponse([]);
    }

    public function store(UpdateTariffApiRequest $request)
    {
        $tariff = new Tariff($request->validated());
        $tariff->save();
        return new JsonResponse([]);
    }


    public function destroy($id)
    {
        $tariff = Tariff::find($id);
        if ($tariff !== null) {
            $tariff->delete();
        }
        return new JsonResponse([]);
    }
}
