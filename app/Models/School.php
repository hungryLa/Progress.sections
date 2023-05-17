<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
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

    public function files(): HasMany
    {
        return $this->hasMany(File::class, 'model_id')
            ->where('model_type', 'LIKE', self::TYPE);
    }

    public function images(): HasMany
    {
        return $this->hasMany(File::class, 'model_id')
            ->where('model_type', 'LIKE', self::TYPE)
            ->where('type', 'LIKE', File::TYPE['image'])->orderBy('position', 'asc');
    }

    public function cover(): HasMany
    {
        return $this->hasMany(File::class, 'model_id')
            ->where('model_type', 'LIKE', self::TYPE)
            ->where('type', 'LIKE', File::TYPE['image'])->orderBy('position', 'asc')->limit(1);
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class, 'school_id');
    }

    public function timetables(): HasMany
    {
        return $this->hasMany(Timetable::class, 'model_id')->where('type', Timetable::TYPES['school']);
    }

    public function teachers(): BelongsToMany
    {
        return $this->belongsToMany(Teacher::class, 'model_schools', 'school_id', 'model_id')->where([
            'model_type' => Teacher::TYPE,
        ]);
    }

    public function school_types(): BelongsToMany
    {
        return $this->belongsToMany(SchoolType::class, 'model_schools', 'school_id', 'model_id')->where([
            'model_type' => SchoolType::TYPE,
        ]);
    }

    public function invitations(): HasMany
    {
        return $this->hasMany(Communication::class, 'school_id')->where('type', Communication::TYPES['invitation']);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(Communication::class, 'school_id')->where('type', Communication::TYPES['job request']);
    }

    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class, 'school_id');
    }

}
