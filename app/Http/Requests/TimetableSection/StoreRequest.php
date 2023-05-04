<?php

namespace App\Http\Requests\TimetableSection;

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
            'lesson_price' => 'required|integer',
            'trial_price' => 'required|integer',
            'group' => 'integer',
            'group_price' => 'integer'
        ];
    }
}
