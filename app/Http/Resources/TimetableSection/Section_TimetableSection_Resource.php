<?php

namespace App\Http\Resources\TimetableSection;

use App\Http\Resources\ReservationResource;
use App\Http\Resources\Timetable\TimetableResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Section_TimetableSection_Resource extends JsonResource
{
    /**
     * Transform the resource into an array.ß
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'reservations' => ReservationResource::collection($this->reservations),
            'timetable' => new TimetableResource($this->timetable),
            'id' => $this->id,
            'lesson_price' => $this->lesson_price,
            'trial_price' => $this->trial_price,
            'group' => $this->group,
            'group_price' => $this->group_price,
        ];
    }
}
