<?php

namespace Database\Factories;

use App\Models\Occupation;
use App\Models\User;
use App\Structures\TeacherOccupations;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TeacherInformation>
 */
class TeacherInformationFactory extends Factory
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
            'occupations' => TeacherOccupations::fromArray([
                'which_occupations' => [
                    Occupation::get()->random()->title,
                    Occupation::get()->random()->title,
                ]
            ]),
            'teaching_experience' => $this->faker->text(200),
            'about_me' => $this->faker->text(100),
        ];
    }
}
