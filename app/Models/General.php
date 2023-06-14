<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class General extends Model
{

    const GENDER = [
        'male' => 'male',
        'female' => 'female',
    ];
    const TYPES_WITHOUT_SCHOOL = [
        Occupation::TYPE => Occupation::TYPE,
    ];

    const TYPES = self::TYPES_WITHOUT_SCHOOL + [
        'school' => School::TYPE,
        'section' => Section::TYPE,
        'subscription' => Subscription::TYPE,
    ];

    static function model($name_table){
        $model = '\App\Models\\'.\ucfirst(\Illuminate\Support\Str::singular($name_table));
        $model = new $model();
        return $model;
    }
}
