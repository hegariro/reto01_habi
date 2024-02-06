<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RegisterController extends Controller
{
    public function register(Request $request) {
        $request->validate([
            'email' => ['required', 'string', 'email', 'unique:users,email'],
            'password' => [
                'required', 
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
            'name' => ['required', 'string', 'max:30'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                "message" => "User {$user->name} created successfully",
            ], 201);
        }

        return response()->json([
            "message" => "Oh! An error has occurred. User {$request->name} was not created",
        ], 500);
    }
}
