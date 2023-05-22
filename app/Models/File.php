<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory;

    const TYPE = [
        'images' => 'images',
        'documents' => 'documents',
    ];

    protected $guarded = [];

}
