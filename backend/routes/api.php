<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployerController;


//User
Route::get('/job-categories', [JobCategoryController::class, 'index']);
Route::post('/UserRegister', [UserController::class, 'createUser']);
Route::post('/UserLogin', [UserController::class, 'loginUser']);
Route::get('/UserLogout', [UserController::class, 'logoutUser'])->middleware('auth:sanctum', 'user');
Route::get('/showcompany', [CompanyController::class, 'index']);


//Employer
Route::get('/ShowUserAndCompany',[EmployerController::class, 'showUserAndCompany']);
Route::post('/EmployerRegister', [EmployerController::class, 'createEmployer']);
Route::post('/EmployerLogin', [EmployerController::class, 'loginEmployer']);
Route::middleware(['auth:sanctum', 'employer'])->group(function(){
    Route::get('/EmployerLogout', [EmployerController::class, 'logoutEmployer']);
    Route::post('/AddCompany', [CompanyController::class, 'store']);
});