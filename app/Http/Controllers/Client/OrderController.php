<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderAddress;
use App\Models\OrderProduct;
use Carbon\Carbon;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'total' => ['required', 'numeric'],
            'products' => ['array', 'min:1', 'required'],
            'products.*.product_id' => ['required', 'exists:products,id'],
            'products.*.quantity' => ['required', 'numeric', 'min:1', 'max:5'],
            'order_type_id' => ['required', 'exists:order_types,id'],
            'user_address_id' => ['nullable', 'exists:user_addresses,id'],
        ]);

        if ($data['order_type_id'] == 1 && !$data['user_address_id']) {
            return redirect()->back()->withErrors(['user_address_id' => 'La Dirección es Requerida']);
        }

        $order = $request->user()->orders()->create([
            'total' => $data['total'],
            'order_type_id' => $data['order_type_id'],
        ]);

        if ($data['order_type_id'] == 1) {
            OrderAddress::create([
                'order_id' => $order->getKey(),
                'user_address_id' => $data['user_address_id'],
            ]);
        }

        $order_products = [];

        foreach ($data['products'] as $product) {
            $order_products[] = [
                'quantity' => $product['quantity'],
                'product_id' => $product['product_id'],
                'order_id' => $order->getKey(),
            ];
        }

        OrderProduct::insert($order_products);

        return redirect()->intended(route('client-dashboard', absolute: false));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        $data = $request->validate([
            'status' => ['required', 'exists:order_statuses,id'],
        ]);

        $order->order_status_id = $data['status'];

        if ($order->order_status_id == 5) {
            $order->completed_at = Carbon::now();
        }

        $order->save();

        return redirect()->back();
    }
}
