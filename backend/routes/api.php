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
// Route::get('/ShowCompany', [CompanyController::class, 'index']);
Route::get('/ShowPost', [PostController::class, 'index']);

//User
Route::post('/UserRegister', [UserController::class, 'createUser']);
Route::post('/UserLogin', [UserController::class, 'loginUser']);
Route::middleware(['auth:sanctum', 'user'])->group(function(){
    Route::patch('/UserFinishSignup', [UserController::class, 'finishSignup']);
    Route::patch('/UserUpdate', [UserController::class, 'updateUser']);//update user profile
    Route::get('/ShowUserProfile', [UserController::class, 'show']);
    Route::post('/AddEducation', [EducationController::class, 'store']);
    Route::patch('/UpdateEducation/{educationId}', [EducationController::class, 'update']);
    Route::post('/AddExperience', [ExperienceController::class, 'store']);
    Route::patch('/UpdateExperience/{experienceId}', [ExperienceController::class, 'update']);
    Route::delete('/DeleteExperience/{experienceId}', [ExperienceController::class, 'destroy']);
    Route::delete('/DeleteEducation/{educationId}', [EducationController::class, 'destroy']);
    Route::post('/ApplyJob/{postId}', [ApplicationController::class, 'store']);
    Route::get('/ShowUserApplications', [UserController::class, 'showApplications']);
    Route::get('/UserLogout', [UserController::class, 'logoutUser']);
});

//Employer
Route::post('/EmployerRegister', [EmployerController::class, 'createEmployer']);
Route::post('/EmployerLogin', [EmployerController::class, 'loginEmployer']);
Route::middleware(['auth:sanctum', 'employer'])->group(function(){
    Route::get('/EmployerLogout', [EmployerController::class, 'logoutEmployer']);
    Route::post('/AddCompany', [CompanyController::class, 'store']);
    Route::post('/AddPost', [PostController::class, 'store']);
    Route::get('/ShowCompanyPosts', [CompanyController::class, 'index']);
    Route::get('/ShowApplications', [EmployerController::class, 'showApplications']);
    Route::put('/UpdateApplicationStatus/{applicationsId}', [EmployerController::class, 'updateApplicationStatus']);
});