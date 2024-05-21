<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobCategoryController;

Route::get('/', function () {
    return view('index');
})->name('index');

Route::get('/add-category', [JobCategoryController::class, 'create'])->name('jobcategory.create');
Route::post('/', [JobCategoryController::class, 'store'])->name('jobcategory.store');