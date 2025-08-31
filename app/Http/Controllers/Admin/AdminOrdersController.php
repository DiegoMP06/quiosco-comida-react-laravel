<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrdersController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $date)
    {
        $orders = Order::whereDate('created_at', $date)->with([ 'orderStatus', 'products', 'address', 'user'])
            ->orderBy('id', 'desc')
            ->paginate(10);

        return Inertia::render('admin/AdminOrdersView', [
            'orders' => $orders,
            'date' => $date
        ]);
    }
}
