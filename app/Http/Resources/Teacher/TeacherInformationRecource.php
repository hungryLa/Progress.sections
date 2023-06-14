<?php

namespace App\Http\Resources\Teacher;

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
            'teaching_experience' => $this->teaching_experience,
            'about_me' => $this->about_me,
        ];
    }
}
