<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/job-categories', [JobCategoryController::class, 'index']);
Route::post('/UserRegister', [UserController::class, 'createUser']);
Route::post('/Userlogin', [UserController::class, 'loginUser']);