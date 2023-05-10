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
            'type' => $this->type,
            'model_id' => $this->model_id,
            'weekday' => $this->weekday,
            'lesson_time' => $this->lesson_time,
            'workday_start' => $this->workday_start,
            'workday_end' => $this->workday_end,
            'without_rest' => $this->without_rest,
            'rest_start' => $this->rest_start,
            'rest_end' => $this->rest_end,
        ];
    }
}
