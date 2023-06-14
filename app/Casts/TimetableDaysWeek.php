<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use App\Structures\TimetableDaysWeek as TimetableDaysWeekStructure;

class TimetableDaysWeek implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return TimetableDaysWeekStructure::fromArray(json_decode($value,true));
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        if (!is_string($value) && !$value instanceof TimetableDaysWeekStructure){
            throw new \InvalidArgumentException($key.' value must be instance of BenefactorStatus or json string');
        }
        if(is_string($value)) return $value;
        return $value->toJson();
    }
}
