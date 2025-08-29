<?php

use App\Http\Controllers\Admin\API\DeliveryOrdersAPIController;
use App\Http\Controllers\Admin\API\OrdersAPIController;
use App\Http\Controllers\Client\API\UserAddressesAPIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', fn(Request $request) => $request->user());

    Route::get('/user-addresses', UserAddressesAPIController::class);
    Route::get('/orders', OrdersAPIController::class);
    Route::get('/orders/delivery', DeliveryOrdersAPIController::class);
});
