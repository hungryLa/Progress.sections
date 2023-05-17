<?php

namespace App\Structures;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;

class TeacherOccupations implements Jsonable, Arrayable, \Stringable
{
    public $which_occupations = [];

    public static function fromArray($data)
    {
        $instance = new TeacherOccupations();
        $instance->which_occupations = $data['which_occupations'] ?: [];
        return $instance;
    }


    public function toArray()
    {
        return [
            'which_occupations' => $this->which_occupations,
        ];
    }

    public function __toString(): string
    {
        return $this->toJson();
    }

    public function toJson($options = 0)
    {
        return json_encode($this);
    }
}
