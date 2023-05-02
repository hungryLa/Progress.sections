<?php

namespace App\Structures;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Contracts\Support\Jsonable;

class TimetableDaysWeek implements Jsonable, Arrayable,\Stringable
{
    public $which_days = [];

    public static function fromArray($data){
        $instance = new TimetableDaysWeek();
        $instance->which_days = $data['which_days'] ?: [];
        return $instance;
    }

    public function toJson($options = 0)
    {
        return json_encode($this);
    }

    public function toArray()
    {
        return [
            'which_days' => $this->which_days,
        ];
    }

    public function __toString(): string
    {
        return $this->toJson();
    }
}
