<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\ProductCategory;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::orderBy('id', 'desc')->paginate(20);
        return Inertia::render('admin/products/ProductsView', [
            'products' => $products
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = ProductCategory::all();

        return Inertia::render('admin/products/NewProductView', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'image' => ['required', 'image', 'file', 'max:1028'],
            'product_category_id' => ['required', 'exists:product_categories,id'],
        ]);

        $file = $request->file('image');
        $name = Str::uuid() . '.' . $file->extension();

        $image = Image::read($file);
        $image->cover(500, 600);

        if (!File::exists(Storage::path('products'))) {
            File::makeDirectory(Storage::path('products'));
        }

        $image->save(Storage::path('products/' . $name));

        Product::create([
            'name' => $data['name'],
            'price' => $data['price'],
            'image' => $name,
            'available' => 1,
            'product_category_id' => $data['product_category_id'],
        ]);

        return redirect()->intended(route('products.index', absolute: true));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = ProductCategory::all();
        return Inertia::render('admin/products/EditProductView', [
            'product' => $product,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'price' => ['required', 'numeric'],
            'image' => ['nullable', 'image', 'file', 'max:1028'],
            'product_category_id' => ['required', 'exists:product_categories,id'],
        ]);

        $file = $request->file('image');

        if ($file) {
            $name = Str::uuid() . '.' . $file->extension();
            $image = Image::read($file);
            $image->cover(500, 600);

            if (!File::exists(Storage::path('products'))) {
                File::makeDirectory(Storage::path('products'));
            }

            Storage::delete('products/' . $product->image);

            $image->save(Storage::path('products/' . $name));
            $product->image = $name;
        }

        $product->name = $data['name'];
        $product->price = $data['price'];
        $product->product_category_id = $data['product_category_id'];

        $product->save();

        return redirect()->intended(route('products.index', absolute: true));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        Storage::delete('products/' . $product->image);
        $product->delete();

        return redirect()->back();
    }
}
