<?php

namespace App\Http\Resources\Section;

use App\Http\Resources\TimetableSection\Section_TimetableSection_Resource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionWithTimetableResource extends JsonResource
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
            'school' => $this->school,
            'occupation' => $this->occupation->title,
            'timetableSections' => Section_TimetableSection_Resource::collection($this->timetables),
        ];
    }
}
