<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{

    const TYPE = [
        'images' => 'images',
        'documents' => 'documents',
    ];

    const TYPES = [
        'school' => School::TYPE,
        'section' => Section::TYPE,
        'teacher' => Teacher::TYPE,
        'subscription' => Subscription::TYPE,
    ];

    protected $guarded = [];

}
