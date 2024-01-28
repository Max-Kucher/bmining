<?php
# TFA BLOCK
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::get('/tfa/pass', [\App\Http\Controllers\TfaController::class, 'show'])->name('tfa.lock');
});

Route::middleware('auth')->group(function () {
    Route::patch('/tfa/pass', [\App\Http\Controllers\TfaController::class, 'pass'])->name('tfa.pass');
});
Route::middleware('auth')->group(function () {
    Route::get('/tfa/pass', [\App\Http\Controllers\TfaController::class, 'needPass'])->name('tfa.needPass');
});

Route::middleware('auth')->group(function () {
    Route::patch('/tfa/store', [\App\Http\Controllers\TfaController::class, 'store'])->name('tfa.store');
});

Route::middleware('auth')->group(function () {
    Route::patch('/tfa/disable', [\App\Http\Controllers\TfaController::class, 'disable'])->name('tfa.disable');
});
# TFA BLOCK END
