<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Day>
 */
class DayFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lesson_time' => $this->faker->time,
            'workday_start' => $this->faker->time,
            'workday_end' => $this->faker->time,
            'rest' => $this->faker->boolean,
            'rest_start' => $this->faker->time,
            'rest_end' => $this->faker->time,
        ];
    }
}
