<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $orders = $request
            ->user()
            ->orders()
            ->with(['orderType', 'orderStatus', 'products', 'address'])
            ->orderBy('id', 'desc')
            ->paginate(10);

        return Inertia::render('client/ClientDashboardView', [
            'orders' => $orders,
        ]);
    }
}
