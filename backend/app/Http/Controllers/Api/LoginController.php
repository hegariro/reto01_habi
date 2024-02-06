<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $token = $request->user()
                ->createToken($request->email, ['*'], now()->addDay())
                ->plainTextToken;
            return response()->json([
                'token' => $token,
                'message' => 'Login successfully'
            ], 200);
        }

        return response()->json([
            "message" => "User {$request->email} not authorized"
        ], 401);
    }
}
