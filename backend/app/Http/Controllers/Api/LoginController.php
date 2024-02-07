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
            'email' => ['required', 'email'],
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

    public function logout(Request $request) {
        $user = $request->user();
        $user->tokens()->delete();
        return response()->json([
            "message" => "Tokens of user {$user->name} was deleted"
        ], 200);
    }
}
// 6|EmtvEy93nWOaNNYE5R680aJcbdxaLsS1fx2QnvGWa79c16fd