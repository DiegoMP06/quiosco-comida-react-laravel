<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class DeliveryTimeOrderController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Order $order)
    {
        $data = $request->validate([
            'delivery_time' => ['required', 'numeric', 'min:1'],
        ]);

        $order->delivery_time = $data['delivery_time'];
        $order->order_status_id = 3;
        $order->save();

        return redirect()->back();
    }
}
