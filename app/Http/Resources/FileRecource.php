<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FileRecource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'model_type' => $this->model_type,
            'model_id' => $this->model_id,
            'type' => $this->type,
            'position' => $this->position,
            'path' => $this->path,
        ];
    }
}
