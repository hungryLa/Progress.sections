<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ModelSchool extends Model
{
    use HasFactory;

    protected $guarded = [];

    const STATUS = [
        'liked' => 'liked',
        'works' => 'works',
    ];

    const TYPES = [
        'user' => User::TYPE,
        'teacher' => Teacher::TYPE,
        'school_types' => SchoolType::TYPE,
    ];

    const TYPES_FOR_FACTORY = [
        'user' => User::TYPE,
        'teacher' => Teacher::TYPE,
    ];
}
