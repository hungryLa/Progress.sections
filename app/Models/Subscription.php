<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Subscription extends Model
{
    use HasFactory;

    protected $guarded = [];

    const TYPE = 'subscription';

    const TYPES = [
        'deposit' => 'deposit',
        'section card' => 'section card',
    ];

    const STATUS = [
        'active' => 'active',
        'inactive' => 'inactive',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class,'subscription_users')
            ->withPivot(['price_subscription','deposit','remaining_classes']);
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class,'school_id');
    }

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class, 'section_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(File::class,'model_id')
            ->where('model_type','LIKE',self::TYPE)
            ->where('type','LIKE', File::TYPE['image'])->orderBy('position','asc');
    }
}
