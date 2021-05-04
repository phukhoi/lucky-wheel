<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthorizationController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
        ]);

        $user = User::firstOrCreate(['email' => $request->input('email')]);

        if (! $token = JWTAuth::fromUser($user)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return response()->json([
            'jwt' => $token,
            'email' => $user->email,
        ]);
    }
}