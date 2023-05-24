<?php

namespace App\Http\Requests\School;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
            'images.*' => 'image',
            'status' => 'required|string',
            'type' => 'required|string',
            'title' => 'required|string|min:5',
            'description' => 'required|string|min:5',
            'phone_number' => 'required|string',
            'address' => 'required|string|min:5',
        ];
    }

    public function messages(){
        return [
            'images.*' => [
                'image' => 'Не все выбранные файлы являются картинками',
            ]
        ];
    }
}
