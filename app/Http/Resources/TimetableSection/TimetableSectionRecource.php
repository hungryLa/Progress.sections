<?php

namespace App\Http\Resources\TimetableSection;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimetableSectionRecource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'section_id' => $this->section_id,
            'timetable_id' => $this->timetable_id,
            'lesson_price' => $this->lesson_price,
            'trial_price' => $this->trial_price,
            'group' => $this->group,
            'group_price' => $this->group_price,
        ];
    }
}
