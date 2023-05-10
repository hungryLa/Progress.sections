<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Occupation extends Model
{
    use HasFactory;

    protected $guarded = [];

    const TYPE = 'occupations';

    public function sections():BelongsToMany{
        return $this->belongsToMany(Section::class,'occupation_id');
    }
}
