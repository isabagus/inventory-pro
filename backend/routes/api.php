<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * TSK-S1-05: API Routes untuk Sistem ERP/CRM CV Solusi Inovasi Packaging
 * Arsitektur: Laravel 11 REST API + Sanctum Token Authentication
 */

/*
|--------------------------------------------------------------------------
| Health Check (Public)
|--------------------------------------------------------------------------
*/
Route::get('/health', function () {
    return response()->json([
        'status'    => 'ok',
        'system'    => 'Packsolution ERP/CRM API',
        'version'   => '1.0.0',
        'database'  => config('database.default'),
        'timestamp' => now()->toIso8601String(),
    ]);
});

/*
|--------------------------------------------------------------------------
| Authentication Routes (Public - No Auth Required)
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('/login',  [AuthController::class, 'login']);
});

/*
|--------------------------------------------------------------------------
| Protected Routes (Require Sanctum Token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // Auth: logout & me
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',     [AuthController::class, 'me']);
    });

    // Placeholder routes per modul - akan diisi setiap sprint
    // MOD-09: User Management (hanya owner & manager)
    Route::prefix('users')->middleware('role:owner,manager')->group(function () {
        Route::get('/', function () {
            return response()->json(['message' => 'User management - Coming Sprint 1 finalization']);
        });
    });

});
