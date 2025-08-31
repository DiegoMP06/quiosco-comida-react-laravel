<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\OrderType;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderSummaryController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $categories = ProductCategory::all();

        return Inertia::render('client/OrderSummaryView', [
            'categories' => $categories,
        ]);
    }
}
