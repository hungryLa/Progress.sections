<?php

namespace Database\Factories;

use App\Models\ModelSchool;
use App\Models\School;
use App\Models\Section;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ModelSchool>
 */
class ModelSchoolFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'model_type' => $this->faker->randomElement(ModelSchool::TYPES),
            'model_id' => User::where('role', User::ROLES['schools_owner'])->first()->id,
            'school_id' => School::get()->random()->id,
        ];
    }
}
