<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Section extends Model
{
    use HasFactory;

    const TYPE = 'section';
    protected $guarded = [];

    const MAX_FILES = [
        'images' => 4
    ];

    public function files(): HasMany
    {
        return $this->hasMany(File::class, 'model_id')
            ->where('model_type', 'LIKE', self::TYPE);
    }

    public function images(): HasMany
    {
        return $this->hasMany(File::class, 'model_id')
            ->where('model_type', 'LIKE', self::TYPE)
            ->where('type', 'LIKE', File::TYPE['images'])->orderBy('position', 'asc');
    }

    public function cover(): HasMany
    {
        return $this->hasMany(File::class, 'model_id')
            ->where('model_type', 'LIKE', self::TYPE)
            ->where('type', 'LIKE', File::TYPE['images'])->orderBy('position', 'asc')->limit(1);
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class, 'school_id');
    }

    public function timetables(): HasMany
    {
        return $this->hasMany(TimetableSection::class, 'section_id');
    }

    public function occupation(): BelongsTo
    {
        return $this->belongsTo(Occupation::class, 'occupation_id');
    }

    public function subscription(): HasMany
    {
        return $this->hasMany(Subscription::class, 'section_id');
    }
}
