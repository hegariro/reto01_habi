<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\LoginController as Login;
use App\Http\Controllers\Api\RegisterController as Register;

Route::post('login', [Login::class, 'login']);
Route::delete('logout', [Login::class, 'logout'])->middleware('auth:sanctum');
Route::post('register', [Register::class, 'register']);
