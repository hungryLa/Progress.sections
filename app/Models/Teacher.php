<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Teacher extends Model
{
    use HasFactory;

    protected $table = 'users';

    protected $guarded = [];

    const TYPE = 'teacher';

    const MAX_FILES = [
        'images' => 1
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

    public function school(School $school)
    {
        return ModelSchool::where([
            'model_type' => ModelSchool::TYPES['teacher'],
            'model_id' => $this->id,
            'school_id' => $school->id
        ])->first();
    }

    public function schools(): BelongsToMany
    {
        return $this->belongsToMany(School::class, 'model_schools', 'model_id', 'school_id');
    }

    public function communications()
    {
        return $this->hasMany(Communication::class, 'user_id');
    }

    public function invitations()
    {
        return $this->hasMany(Communication::class, 'user_id')->where('type', Communication::TYPES['invitation']);
    }

    public function job_requests()
    {
        return $this->hasMany(Communication::class, 'user_id')->where('type', Communication::TYPES['job request']);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function timetables(): HasMany
    {
        return $this->hasMany(Timetable::class, 'model_id')->where('type', Timetable::TYPES['teacher']);
    }

    public function information(): HasOne
    {
        return $this->hasOne(TeacherInformation::class, 'teacher_id');
    }
}
