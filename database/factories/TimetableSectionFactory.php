<?php

namespace Database\Factories;

use App\Models\Occupation;
use App\Models\Section;
use App\Models\Timetable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TimetableSection>
 */
class TimetableSectionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'section_id' => Section::get()->random()->id,
            'timetable_id' => Timetable::get()->random()->id,

            'lesson_price' => random_int(1000,5000),
            'trial_price' => random_int(500,4000),
            'group' => random_int(2,10),
            'group_price' => random_int(1000,3000),
        ];
    }
}
