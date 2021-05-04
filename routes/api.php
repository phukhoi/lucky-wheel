<?php

use App\Http\Controllers\Api\Client\AuthorizationController;
use App\Http\Controllers\Api\Client\AwardController;
use App\Http\Controllers\Api\Client\ClaimedRewardController;
use App\Http\Controllers\Api\GameController;
use App\Http\Controllers\Api\GameTemplateController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    Route::group([
        'middleware' => 'auth:api'
    ], function () {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group([
    'prefix' => 'client'
], function ($router) {
    Route::post('authorization', [AuthorizationController::class, 'index']);

    Route::middleware('auth:client_api')->group(function () {
        Route::post('rewards/claim', [ClaimedRewardController::class, 'index']);
        Route::post('rewards/award', [AwardController::class, 'index']);
    });
});

Route::get('game-templates', [GameTemplateController::class, 'index']);

Route::get('games', [GameController::class, 'index']);

Route::post('games', [GameController::class, 'store']);
