<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelSchool extends Model
{
    protected $guarded = [];

    const TYPES = [
        'user' => User::TYPE,
    ];
}
