<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimetableSectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.ß
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'timetable' => new TimetableResource($this->timetable),
            'id' => $this->id,
            'section_id' => $this->section_id,
            'lesson_price' => $this->lesson_price,
            'trial_price' => $this->trial_price,
            'group' => $this->group,
            'group_price' => $this->group_price,
        ];
    }
}
