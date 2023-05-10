<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeacherInformationRecource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'teacher_id' => $this->teacher_id,
            'occupations' => $this->occupations,
            'teacher_experience' => $this->teacher_experience,
            'about_me' => $this->about_me,
        ];
    }
}
