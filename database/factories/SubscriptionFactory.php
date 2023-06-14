<?php

namespace Database\Factories;

use App\Models\School;
use App\Models\Section;
use App\Models\Subscription;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
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
            'section_id' => Section::get()->random()->id,
            'status' => $this->faker->randomElement(Subscription::STATUS),
            'type' => $this->faker->randomElement(Subscription::TYPES),
            'price' => random_int(1000, 15000),
            'title' => $this->faker->text(30),
            'value' => random_int(10, 5000),
            'contents' => $this->faker->text(50),
        ];
    }
}
