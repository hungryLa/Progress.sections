<?php

namespace App\Http\Resources\Timetable;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimetableResource extends JsonResource
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
            'days_week' => $this->days_week,
            'lesson_time' => $this->lesson_time,
            'workday_start' => $this->workday_start,
            'workday_end' => $this->workday_end,
            'rest' => $this->rest,
            'rest_start' => $this->rest_start,
            'rest_end' => $this->rest_end,
        ]
    }
}
