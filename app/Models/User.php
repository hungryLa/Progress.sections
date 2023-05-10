<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements MustVerifyEmail, JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    const ROLES_FOR_REGISTER = [
        'user' => 'user',
        'teacher' => 'teacher',
    ];
    const ROLES = [
        'admin' => 'admin',
        'schools_owner' => 'schools_owner',
        'teacher' => 'teacher',
        'user' => 'user',
    ];

    const TYPE = 'user';

    protected $guarded = [];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims(): array
    {
        return [];
    }

    public function hasRole($role){
        if($this->role == $role){
            return true;
        }
        else{
            return false;
        }
    }

    public function getTeacher(){
        $teacher = Teacher::find($this->id);
        return $teacher;
    }

    public function linked_users(): BelongsToMany
    {
        return $this->belongsToMany(User::class,'model_users','user_id','model_id')
            ->where('model_type',ModelUser::TYPES['users']);
    }

    public function people(): HasMany
    {
        return $this->hasMany(Person::class,'user_id');
    }

    public function schools(){
        return $this->belongsToMany(School::class,'model_schools','model_id','school_id');
    }

    public function sections(): BelongsToMany
    {
        return $this->belongsToMany(Section::class,'model_sections','model_id','section_id');
    }

    public function teacher(): BelongsTo{
        return $this->belongsTo(Teacher::class,'user_id');
    }

    public function subscriptions(): BelongsToMany
    {
        return $this->belongsToMany(Subscription::class,'subscription_users')
            ->withPivot(['price_subscription','deposit','remaining_classes']);
    }
}
