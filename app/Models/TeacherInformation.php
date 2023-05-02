<?php

namespace App\Models;

use App\Casts\TeacherOccupations;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeacherInformation extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $casts = [
        'occupations' => TeacherOccupations::class,
    ];

    public function teacher():BelongsTo
    {
        return $this->belongsTo(Teacher::class,'teacher_id');
    }
}
