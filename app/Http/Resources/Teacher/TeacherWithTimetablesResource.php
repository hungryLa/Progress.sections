<?php

namespace App\Http\Resources\Teacher;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherWithTimetablesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'timetables' => $this->timetables,
            'information' => $this->information,
            'id' => $this->id,
            'role' => $this->role,
            'images' => $this->images,
            'schools' => $this->schools,
            'communications' => $this->communications,
            'full_name' => $this->full_name,
            'phone_number' => $this->phone_number,
        ];
    }
}
