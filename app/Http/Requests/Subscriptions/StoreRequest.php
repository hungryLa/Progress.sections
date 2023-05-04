<?php

namespace App\Http\Requests\Subscriptions;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'images' => 'array',
            'images.*' => 'required|image',
            'section_id' => 'nullable|integer',
            'status' => 'required|string',
            'type' => 'required|string',
            'title' => 'required|string',
            'value' => 'required|integer',
            'contents' => 'required|string',
        ];
    }
}
