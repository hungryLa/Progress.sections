<?php

namespace Database\Factories;

use App\Models\Occupation;
use App\Models\School;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Section>
 */
class SectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'school_id' => School::get()->random()->id,
            'occupation_id' => Occupation::get()->random()->id,
            'description' => $this->faker->text(80),
            'contents' => $this->faker->text(200),
        ];
    }
}
