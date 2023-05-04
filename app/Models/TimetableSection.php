<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TimetableSection extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function section(): BelongsTo
    {
        return $this->belongsTo(TimetableSection::class,'section_id');
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class,'teacher_id');
    }
}
