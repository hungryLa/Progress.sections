<?php

namespace Database\Factories;

use App\Models\Section;
use App\Models\Timetable;
use App\Models\User;
use App\Structures\TimetableDaysWeek;
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
        $timetable = Timetable::create([
            'type' => $this->faker->randomElement(Timetable::TYPES),
            'model_id' => User::where('role', User::ROLES['teacher'])->get()->random()->id,
            'weekday' => TimetableDaysWeek::fromArray([
                'which_days' => [
                    $this->faker->randomElement(Timetable::DAYS_WEEK),
                    $this->faker->randomElement(Timetable::DAYS_WEEK),
                    $this->faker->randomElement(Timetable::DAYS_WEEK),
                ]
            ]),
            'lesson_time' => "01:00",
            'workday_start' => "07:00",
            'workday_end' => "20:00",
            'without_rest' => $this->faker->boolean,
            'rest_start' => $this->faker->time,
            'rest_end' => $this->faker->time,
        ]);

        return [
            'section_id' => Section::get()->random()->id,
            'timetable_id' => $timetable->id,

            'lesson_price' => random_int(1000, 5000),
            'trial_price' => random_int(500, 4000),
            'group' => random_int(2, 10),
            'group_price' => random_int(1000, 3000),
        ];
    }
}
