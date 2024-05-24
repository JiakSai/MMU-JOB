<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobCategoryController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\PostController;

Route::get('/', function () {
    return view('index');
})->name('index');

Route::get('/add-category', [JobCategoryController::class, 'create'])->name('jobcategory.create');
Route::post('/', [JobCategoryController::class, 'store'])->name('jobcategory.store');

Route::get('/createCompany', [CompanyController::class, 'create'])->name('company.create');
Route::post('/', [CompanyController::class, 'store'])->name('company.store');

Route::get('/createPost', [PostController::class, 'create'])->name('post.create');
Route::post('/', [PostController::class, 'store'])->name('post.store');