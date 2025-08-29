<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\DeliveryOrdersController;
use App\Http\Controllers\Admin\DeliveryTimeOrderController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\ProductStatusController;
use App\Http\Controllers\Admin\AdminOrdersController;
use App\Http\Controllers\Client\ClientDashboardController;
use App\Http\Controllers\Client\KioskController;
use App\Http\Controllers\Client\OrderController;
use App\Http\Controllers\Client\OrderSummaryController;
use App\Http\Controllers\Client\UserAddressController;
use App\Http\Middleware\Admin;
use App\Http\Middleware\Client;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('/orders', OrderController::class)->only(['update']);

    Route::middleware([Client::class])->group(function () {
        Route::get('/dashboard', ClientDashboardController::class)->name('client-dashboard');
        Route::get('/kiosk/summary', OrderSummaryController::class)->name('kiosk.summary');

        Route::resource('/user-addresses', UserAddressController::class);
        Route::resource('/orders', OrderController::class)->only(['store']);

        Route::get('/kiosk/{product_category}', KioskController::class)->name('kiosk');
    });

    Route::middleware([Admin::class])->group(function () {
        Route::get('/admin/dashboard', AdminDashboardController::class)->name('dashboard');
        Route::get('/orders/delivery', DeliveryOrdersController::class)->name('orders.delivery');

        Route::resource('/products', ProductController::class)->except(['show']);
        Route::get('/orders/admin/{date}', AdminOrdersController::class)->name('orders.admin')->where('date', '[0-9]{4}-[0-9]{2}-[0-9]{2}');
        Route::post('/products/{product}/status', ProductStatusController::class)->name('products.status');
        Route::post('/orders/{order}/delivery-time', DeliveryTimeOrderController::class)->name('orders.delivery-time');
    });
});



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
