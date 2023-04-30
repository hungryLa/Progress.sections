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
    ];


}
