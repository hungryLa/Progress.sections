<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invitation extends Model
{
    use HasFactory;

    protected $guarded = [];

    const TYPE = 'invitation';

    const STATUS = [
        'accepted' => 'accepted',
        'invitation' => 'invitation',
        'rejected' => 'rejected',
    ];

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class,'school_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class,'user_id');
    }
}
