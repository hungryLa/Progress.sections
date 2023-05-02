<?php

namespace App\Models;

use App\Casts\TimetableDaysWeek;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Timetable extends Model
{
    use HasFactory;

    use HasFactory;

    protected $casts = [
        'days_week' => TimetableDaysWeek::class,
    ];

    const DAYS_WEEK = [
        'Monday' => 'Monday',
        'Tuesday' => 'Tuesday',
        'Wednesday' => 'Wednesday',
        'Thursday' => 'Thursday',
        'Friday' => 'Friday',
        'Saturday' => 'Saturday',
        'Sunday' => 'Sunday',
    ];

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class,'teacher_id');
    }
}
