<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SchoolRecource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'cover' => $this->cover,
            'id' => $this->id,
            'status' => $this->status,
            'recruitment_open' => $this->recruitment_open,
            'type' => $this->type,
            'title' => $this->title,
            'description' => $this->description,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
        ];
    }
}
