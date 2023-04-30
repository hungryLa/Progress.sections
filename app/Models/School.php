<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class School extends Model
{
    use HasFactory;

    protected $guarded = [];

    const TYPE = 'school';

    const STATUS = [
        'active' => 'active',
        'not active' => 'not active',
    ];

    const SCHOOL_TYPES = [
        'musical' => 'musical',
        'sport' => 'sport',
        'creative' => 'creative',
    ];

    public function files(): HasMany
    {
        return $this->hasMany(File::class,'model_id')
            ->where('model_type','LIKE',self::TYPE);
    }

    public function images(): HasMany
    {
        return $this->hasMany(File::class,'model_id')
            ->where('model_type','LIKE',self::TYPE)
            ->where('type','LIKE', File::TYPE['image'])->orderBy('position','asc');
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class,'school_id');
    }

    public function teachers(): BelongsToMany
    {
        return $this->belongsToMany(Teacher::class,'model_schools','school_id','model_id')->where([
            'model_type' => Teacher::TYPE,
        ]);
    }

    public function invitations(): HasMany
    {
        return $this->hasMany(Invitation::class,'school_id');
    }

}
