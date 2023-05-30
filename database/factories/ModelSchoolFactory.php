<?php

namespace Database\Factories;

use App\Models\ModelSchool;
use App\Models\School;
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
        $model_type = $this->faker->randomElement(ModelSchool::TYPES_FOR_FACTORY);
        if ($model_type == ModelSchool::TYPES_FOR_FACTORY['teacher']) {
            $model_id = User::where('role', User::ROLES['teacher'])->get()->random()->id;
        } else {
            $model_id = User::where('role', User::ROLES['user'])->get()->random()->id;
        }
        if ($model_type == ModelSchool::TYPES_FOR_FACTORY['teacher']) {
            $status = ModelSchool::STATUS['works'];
        }
        return [
            'status' => $status,
            'model_type' => $model_type,
            'model_id' => $model_id,
            'school_id' => School::get()->random()->id,
        ];
    }
}
