<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reservation extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function TimetableSection(): BelongsTo
    {
        return $this->belongsTo(TimetableSection::class, 'timetable_section_id');
    }
}
