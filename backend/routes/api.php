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
use App\Http\Controllers\ResetPasswordController;

//Public
Route::get('/JobCategories', [JobCategoryController::class, 'index']);
Route::get('/ShowCompany', [CompanyController::class, 'index']);
Route::get('/ShowCompanyDetails/{company}', [CompanyController::class, 'show']);
Route::get('/ShowCompanyPosts/{company}', [CompanyController::class, 'showCompanyPosts']);
Route::get('/ShowPost', [PostController::class, 'index']);
Route::get('/SearchAndFilter', [PostController::class, 'SearchAndFilter']);
Route::post('/User/SendOTPEmail', [ResetPasswordController::class, 'sendOTPUser']);
Route::post('/User/ResetPassword', [ResetPasswordController::class, 'resetPasswordUser']);
Route::post('/Employer/SendOTPEmail', [ResetPasswordController::class, 'sendOTPEmployer']);
Route::post('/Employer/ResetPassword', [ResetPasswordController::class, 'resetPasswordEmployer']);

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
    Route::patch('/UpdateRating/{ratingId}', [RatingController::class, 'update']);
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
    Route::get('/ShowCompanyProfile', [EmployerController::class, 'showOwnCompany']);
    Route::patch('/UpdateCompany', [CompanyController::class, 'update']);
    Route::get('/ShowPostsEmployer', [EmployerController::class, 'showForEmployer']);
    Route::get('/ShowPendingApplications', [EmployerController::class, 'showPendingApplications']);
    Route::get('/ShowAcceptedApplications', [EmployerController::class, 'showAcceptedApplications']);
    Route::get('/ShowRejectedApplications', [EmployerController::class, 'showRejectedApplications']);
    Route::patch('/UpdateApplicationStatus/{applicationsId}', [EmployerController::class, 'updateApplicationStatus']);
});

//Admin
Route::post('/AdminLogin', [AdminController::class, 'login']);
Route::middleware(['auth:sanctum', 'admin'])->group(function(){
    Route::get('/Admin/ShowUsers', [UserController::class, 'index']);
    Route::delete('/Admin/DeleteUser/{user}', [UserController::class, 'destroy']);
    Route::get('/Admin/ShowEmployerAndCompany',[EmployerController::class, 'showEmployerAndCompany']);
    Route::delete('/Admin/DeleteEmployer/{employer}', [EmployerController::class, 'destroy']);
    Route::get('/Admin/ShowPosts', [PostController::class, 'showAdmin']);
    Route::delete('/Admin/DeletePost/{post}', [PostController::class, 'adminDestroy']);
    Route::get('/Admin/ShowJobCategory', [JobCategoryController::class, 'index']);
    Route::post('/Admin/AddJobCategory', [JobCategoryController::class, 'store']);
    Route::delete('/Admin/DeleteJobCategory/{jobcategory}', [JobCategoryController::class, 'destroy']);
    Route::get('/Admin/ShowRating', [RatingController::class, 'index']);
    Route::delete('/Admin/DeleteRating/{rating}', [RatingController::class, 'destroy']);
    Route::get('/AdminLogout', [AdminController::class, 'logout']);
});
