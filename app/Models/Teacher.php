<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Teacher extends User
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
}
