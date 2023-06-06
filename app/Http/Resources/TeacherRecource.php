<?php

namespace App\Http\Resources;

use App\Http\Resources\TimetableSection\TimetableSectionWithSectionResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherRecource extends JsonResource
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
            'images' => $this->images,
            'schools' => SchoolRecource::collection($this->schools),
            'communications' => $this->communications,
            'full_name' => $this->full_name,
            'phone_number' => $this->phone_number,
            'email' => $this->email,
            'email_verified_at' => $this->email_verified_at,
            'remember_token' => $this->remember_token,
            'sections' => $this->sections,
        ];
    }
}
