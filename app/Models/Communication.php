<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Communication extends Model
{
    use HasFactory;

    protected $guarded = [];

    const TYPE = 'communication';

    const TYPES = [
        'invitation' => 'invitation',
        'job request' => 'job request',
    ];

    const STATUS = [
        'accepted' => 'accepted',
        'invited' => 'invited',
        'The application has been sent' => 'The application has been sent',
        'rejected' => 'rejected',
    ];

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class, 'school_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(Teacher::class, 'user_id');
    }
}
