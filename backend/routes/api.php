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
use App\Http\Controllers\RatingController;
use App\Http\Controllers\AdminController;

//Public
Route::get('/JobCategories', [JobCategoryController::class, 'index']);
Route::get('/ShowCompany', [CompanyController::class, 'index']);
Route::get('/ShowCompanyDetails/{company}', [CompanyController::class, 'show']);
Route::get('/ShowCompanyPosts/{company}', [CompanyController::class, 'showCompanyPosts']);
Route::get('/ShowPost', [PostController::class, 'index']);

//User
Route::post('/UserRegister', [UserController::class, 'createUser']);
Route::post('/UserLogin', [UserController::class, 'loginUser']); 
Route::middleware(['auth:sanctum', 'user'])->group(function(){
    Route::patch('/UserFinishSignup', [UserController::class, 'finishSignup']);
    Route::patch('/UserUpdate', [UserController::class, 'updateUser']);//update user profile
    Route::get('/ShowUserProfile', [UserController::class, 'show']);
    Route::post('/AddEducation', [EducationController::class, 'store']);
    Route::post('/AddExperience', [ExperienceController::class, 'store']);
    Route::patch('/UpdateEducation/{educationId}', [EducationController::class, 'update']);
    Route::patch('/UpdateExperience/{experienceId}', [ExperienceController::class, 'update']);
    Route::delete('/DeleteExperience/{experienceId}', [ExperienceController::class, 'destroy']);
    Route::delete('/DeleteEducation/{educationId}', [EducationController::class, 'destroy']);
    Route::post('/ApplyJob/{postId}', [ApplicationController::class, 'store']);
    Route::get('/ShowUserApplications', [UserController::class, 'showApplications']);
    Route::post('/AddRating/{companyId}', [RatingController::class, 'store']);
    Route::get('/UserLogout', [UserController::class, 'logoutUser']);
});

//Employer
Route::post('/EmployerRegister', [EmployerController::class, 'createEmployer']);
Route::post('/EmployerLogin', [EmployerController::class, 'loginEmployer']);
Route::middleware(['auth:sanctum', 'employer'])->group(function(){
    Route::get('/EmployerLogout', [EmployerController::class, 'logoutEmployer']);
    Route::post('/AddCompany', [CompanyController::class, 'store']);
    Route::post('/AddPost', [PostController::class, 'store']);
    Route::patch('/UpdatePost/{post}', [PostController::class, 'update']);
    Route::delete('/DeletePost/{post}', [PostController::class, 'destroy']);
    Route::patch('/UpdateCompany', [CompanyController::class, 'update']);
    Route::get('/ShowPostsEmployer', [EmployerController::class, 'showForEmployer']);
    Route::get('/ShowApplications', [EmployerController::class, 'showApplications']);
    Route::put('/UpdateApplicationStatus/{applicationsId}', [EmployerController::class, 'updateApplicationStatus']);
});

//Admin
Route::post('/AdminLogin', [AdminController::class, 'login']);
Route::get('/ShowUserAndCompany',[EmployerController::class, 'showUserAndCompany']);
Route::post('/AddJobCategory', [JobCategoryController::class, 'store']);