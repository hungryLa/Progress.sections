<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelUser extends Model
{
    use HasFactory;

    protected $guarded = [];

    const TYPES = [
        'school' => School::TYPE,
        'users' => User::TYPE,
        'communication' => Communication::TYPE,
    ];
}
