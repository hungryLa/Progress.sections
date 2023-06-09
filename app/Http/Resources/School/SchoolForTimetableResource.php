<?php

namespace App\Http\Resources\School;

use App\Http\Resources\Teacher\TeacherWithTimetablesResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SchoolForTimetableResource extends JsonResource
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
            'status' => $this->status,
            'recruitment_open' => $this->recruitment_open,
            'type' => $this->type,
            'title' => $this->title,
            'description' => $this->description,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'timetables' => $this->timetables,
            'teachers' => TeacherWithTimetablesResource::collection($this->teachers),
        ];
    }
}
