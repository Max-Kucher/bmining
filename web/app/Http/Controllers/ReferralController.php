<?php

namespace App\Http\Controllers;

use App\Models\ReferralProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class ReferralController extends Controller
{
    public function invite(\Symfony\Component\HttpFoundation\Request $request, string $hash)
    {
        $program = ReferralProgram::findByHash($hash);
        if ($program === null) {
            return to_route('main');
        } else {
            return redirect()->route('main')->withCookie(cookie()->forever('invite', $hash));
        }
    }
}
