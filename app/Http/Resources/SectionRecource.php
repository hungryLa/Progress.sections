<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionRecource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'images' => $this->images,
            'id' => $this->id,
            'school_id' => $this->school_id,
            'occupation_id' => $this->occupation_id,
            'occupation' => $this->occupation,
            'description' => $this->description,
            'contents' => $this->contents,
        ];
    }
}
