<?php

namespace App\Http\Controllers\Client\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserAddressCollection;
use Illuminate\Http\Request;

class UserAddressesAPIController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        return new UserAddressCollection($request->user()->addresses()->get());
    }
}
