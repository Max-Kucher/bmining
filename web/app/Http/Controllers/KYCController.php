<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreKycRequest;
use App\Models\KYC;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class KYCController extends Controller
{
    public function store(StoreKycRequest $request)
    {
        $validated = $request->validated();
        $result = Storage::disk('public')->put("kyc", $validated['photo']);
        $fullPath = "/storage/" . $result;
        $kyc = new KYC([
            'name' => $validated['name'],
            'surname' => $validated['surname'],
            'middlename' => $validated['surname'],
            'photo' => $fullPath,
            'user_id' => auth()->user()->id,
        ]);
        $kyc->save();

        return new JsonResponse([], 200);
    }

    public function get()
    {
        $user = Auth::user();
        $currentKyc = KYC::findByUserId($user->id);

        return new JsonResponse([
            'kyc' => $currentKyc ?? new KYC(),
        ]);
    }
}
