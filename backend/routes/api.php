<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\LoginController as Login;
use App\Http\Controllers\Api\RegisterController as Register;
use App\Http\Controllers\Api\Tasks\TaskController as Task;
use App\Http\Controllers\Api\Users\UserController as User;

Route::post('register', [Register::class, 'register']);
Route::post('login', [Login::class, 'login']);
Route::delete('logout', [Login::class, 'logout']);

// Users
Route::get('users', [User::class, 'index'])->middleware('auth:sanctum');
Route::get('users/{id}', [User::class, 'show'])->middleware('auth:sanctum');

// Tasks
Route::get('tasks', [Task::class, 'index'])->middleware('auth:sanctum');
Route::get('tasks/{id}', [Task::class, 'show'])->middleware('auth:sanctum');
Route::post('tasks/new', [Task::class, 'store'])->middleware('auth:sanctum');
Route::put('tasks/{id}', [Task::class, 'destroy'])->middleware('auth:sanctum');
Route::patch('tasks/{id}/assign', [Task::class, 'assign'])->middleware('auth:sanctum');
Route::patch('tasks/{id}/to-complete', [Task::class, 'toComplete'])->middleware('auth:sanctum');
Route::delete('tasks/{id}', [Task::class, 'destroy'])->middleware('auth:sanctum');