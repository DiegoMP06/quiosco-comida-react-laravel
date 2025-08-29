<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAddress extends Model
{
    protected $fillable = [
        'number',
        'name',
        'street',
        'colony',
        'city',
        'zip',
        'lat',
        'lng',
        'description',
        'user_id',
    ];
}
