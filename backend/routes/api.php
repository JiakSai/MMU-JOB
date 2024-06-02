<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\EducationController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\ApplicationController;

//Public
Route::get('/ShowUserAndCompany',[EmployerController::class, 'showUserAndCompany']);
Route::get('/JobCategories', [JobCategoryController::class, 'index']);
Route::get('/ShowCompany', [CompanyController::class, 'index']);
Route::get('/ShowPost', [PostController::class, 'index']);

//User
Route::post('/UserRegister', [UserController::class, 'createUser']);
Route::post('/UserLogin', [UserController::class, 'loginUser']);
Route::middleware(['auth:sanctum', 'user'])->group(function(){
    Route::patch('/UserFinishSignup', [UserController::class, 'finishSignup']);
    Route::patch('/UserUpdate', [UserController::class, 'updateUser']);
    Route::get('/ShowUserProfile', [UserController::class, 'show']);
    Route::post('/AddEducation', [EducationController::class, 'store']);
    Route::patch('/UpdateEducation/{id}', [EducationController::class, 'update']);
    Route::post('/AddExperience', [ExperienceController::class, 'store']);
    Route::patch('/UpdateExperience/{id}', [ExperienceController::class, 'update']);
    Route::post('/ApplyJob', [ApplicationController::class, 'store']);
    Route::get('/UserLogout', [UserController::class, 'logoutUser']);
});

//Employer
Route::post('/EmployerRegister', [EmployerController::class, 'createEmployer']);
Route::post('/EmployerLogin', [EmployerController::class, 'loginEmployer']);
Route::middleware(['auth:sanctum', 'employer'])->group(function(){
    Route::get('/EmployerLogout', [EmployerController::class, 'logoutEmployer']);
    Route::post('/AddCompany', [CompanyController::class, 'store']);
    Route::post('/AddPost', [PostController::class, 'store']);
});