<?php

namespace App\Http\Controllers\Admin\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderCollection;
use App\Models\Order;
use Illuminate\Http\Request;

class OrdersAPIController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return new OrderCollection(
            Order::where('order_status_id', 1)
                ->orWhere('order_status_id', 3)
                ->with([ 'orderStatus', 'products', 'address', 'user'])
                ->orderBy('id', 'desc')
                ->get()
        );
    }
}
