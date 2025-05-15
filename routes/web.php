<?php

use App\Http\Controllers\BirthdayController;
use App\Http\Controllers\Dashboard\Location\GeocodeController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/location', [GeocodeController::class, 'index'])->name('location');

Route::apiResource('birthdays', BirthdayController::class);


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
