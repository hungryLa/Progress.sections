<?php

namespace App\Http\Resources\Teacher;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherWithSectionsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'information' => $this->information,
            'id' => $this->id,
            'role' => $this->role,
            'communications' => $this->communications,
            'full_name' => $this->full_name,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'sections' => $this->timetables
        ];
    }
}
