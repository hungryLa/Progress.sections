<?php

namespace App\Http\Requests\User;

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
            'role' => 'required|string',
            'username' => 'required|string',
            'full_name' => 'required|string|min:8',
            'email' => 'required|email:dns,rfs|unique:users',
            'password' => 'required_with:password_confirmation|same:password_confirmation|min:8',
            'password_confirmation' => 'min:8',
        ];
    }
}
