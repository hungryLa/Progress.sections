<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SubscriptionRecource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'school_id' => $this->school_id,
            'section_id' => $this->section_id,
            'status' => $this->status,
            'type' => $this->type,
            'price' => $this->price,
            'title' => $this->title,
            'value' => $this->value,
            'contents' => $this->contents,
        ];
    }
}
