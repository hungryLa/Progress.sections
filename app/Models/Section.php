<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Section extends Model
{
    use HasFactory;

    const TYPE = 'sections';
    protected $guarded = [];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class,'model_sections','section_id','model_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(File::class,'model_id')
            ->where('model_type','LIKE',self::TYPE)
            ->where('type','LIKE', File::TYPE['image'])->orderBy('position','asc');
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class,'school_id');
    }
}
