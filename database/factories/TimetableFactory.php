<?php

namespace Database\Factories;

use App\Models\Teacher;
use App\Models\Timetable;
use App\Models\User;
use App\Structures\TimetableDaysWeek;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Timetable>
 */
class TimetableFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'teacher_id' => User::where('role',User::ROLES['teacher'])->get()->random()->id,
            'days_week' => TimetableDaysWeek::fromArray([
               'which_days' => [
                   $this->faker->randomElement(Timetable::DAYS_WEEK),
                   $this->faker->randomElement(Timetable::DAYS_WEEK),
               ]
            ]),
            'lesson_time' => $this->faker->time,
            'workday_start' => $this->faker->time,
            'workday_end' => $this->faker->time,
            'rest' => $this->faker->boolean,
            'rest_start' => $this->faker->time,
            'rest_end' => $this->faker->time,
        ];
    }
}
