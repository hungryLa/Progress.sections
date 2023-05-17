<?php

namespace App\Casts;

use App\Structures\TeacherOccupations as TeacherOccupationsStructure;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class TeacherOccupations implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return TeacherOccupationsStructure::fromArray(json_decode($value, true));
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        if (!is_string($value) && !$value instanceof TeacherOccupationsStructure) {
            throw new \InvalidArgumentException($key.' value must be instance of BenefactorStatus or json string');
        }
        if (is_string($value)) {
            return $value;
        }
        return $value->toJson();
    }
}
