<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KioskController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, ProductCategory $productCategory)
    {
        $products = $productCategory->products()->where('available', true)->get();
        $categories = ProductCategory::all();

        return Inertia::render('client/KioskView', [
            'category' => $productCategory,
            'products' => $products,
            'categories' => $categories
        ]);
    }
}
