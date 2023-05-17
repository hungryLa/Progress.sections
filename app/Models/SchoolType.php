<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class SchoolType extends Model
{
    use HasFactory;

    const TYPE = 'school_types';

    public function schools(): BelongsToMany
    {
        return $this->belongsToMany(School::class, 'model_schools', 'school_id', 'model_id');
    }
}
