<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Teacher extends Model
{
    use HasFactory;

    protected $table = 'users';

    protected $guarded = [];

    const TYPE = 'teacher';

    public function school(School $school){
        return ModelSchool::where([
            'model_type' => ModelSchool::TYPES['teacher'],
            'model_id' => $this->id,
            'school_id' => $school->id
        ])->first();
    }

    public function invitations(){
        return $this->hasMany(Invitation::class,'user_id');
    }

    public function user(): BelongsTo{
        return $this->belongsTo(User::class,'user_id');
    }

    public function timetables(): HasMany
    {
        return $this->hasMany(Timetable::class,'teacher_id');
    }

    public function information(): BelongsTo
    {
        return $this->belongsTo(TeacherInformation::class,'teacher_id');
    }
}
