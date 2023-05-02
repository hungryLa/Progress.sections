<?php

namespace Database\Factories;

use App\Models\Occupation;
use App\Models\User;
use App\Structures\TeacherOccupations;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'role' => User::ROLES['teacher'],
            'full_name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }
}
