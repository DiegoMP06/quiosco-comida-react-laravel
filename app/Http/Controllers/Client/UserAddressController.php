<?php

namespace App\Http\Controllers\Client;

use App\Http\Controllers\Controller;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserAddressController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $addresses = $request->user()->addresses()->get();

        return Inertia::render('client/addresses/AddressesView', [
            'addresses' => $addresses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('client/addresses/NewAddressView');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'number' => ['nullable', 'numeric', 'min:0'],
            'street' => ['required', 'string', 'max:255'],
            'colony' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'zip' => ['required', 'numeric', 'min:1'],
            'description' => ['nullable', 'string', 'max:1000'],
            'lat' => ['required', 'numeric'],
            'lng' => ['required', 'numeric'],
            'modal' => ['nullable', 'boolean'],
        ]);

        $request->user()->addresses()->create($data);

        if ($request->modal) {
            return redirect()->back();
        }

        return redirect()->intended(route('user-addresses.index', absolute: false));
    }

    /**
     * Display the specified resource.
     */
    public function show(UserAddress $userAddress)
    {
        return Inertia::render('client/addresses/AddressView', [
            'address' => $userAddress,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserAddress $userAddress)
    {
        return Inertia::render('client/addresses/EditAddressView', [
            'address' => $userAddress
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserAddress $userAddress)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'number' => ['nullable', 'numeric', 'min:0'],
            'street' => ['required', 'string', 'max:255'],
            'colony' => ['required', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:255'],
            'zip' => ['required', 'numeric', 'min:1'],
            'description' => ['nullable', 'string', 'max:1000'],
            'lat' => ['required', 'numeric'],
            'lng' => ['required', 'numeric'],
        ]);

        $userAddress->update($data);

        return redirect()->intended(route('user-addresses.index', absolute: false));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserAddress $userAddress)
    {
        $userAddress->delete();
        return redirect()->back();
    }
}
