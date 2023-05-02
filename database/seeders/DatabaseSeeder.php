<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Day;
use App\Models\ModelSchool;
use App\Models\Occupation;
use App\Models\School;
use App\Models\Section;
use App\Models\Teacher;
use App\Models\TeacherInformation;
use App\Models\Timetable;
use App\Models\TimetableDay;
use App\Models\TimetableSection;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
             'role' => User::ROLES['admin'],
             'full_name' => 'admin',
             'email' => 'admin@mail.ru',
             'password' => Hash::make('password'),
         ]);
        User::create([
            'role' => User::ROLES['schools_owner'],
            'full_name' => 'schools_owner',
            'email' => 'schools_owner@mail.ru',
            'password' => Hash::make('password'),
        ]);
        User::create([
            'role' => User::ROLES['teacher'],
            'full_name' => 'teacher',
            'email' => 'teacher@mail.ru',
            'password' => Hash::make('password'),
        ]);
        User::create([
            'role' => User::ROLES['user'],
            'full_name' => 'user',
            'email' => 'user@mail.ru',
            'password' => Hash::make('password'),
        ]);
        User::factory(5)->create();
        Teacher::factory(5)->create();
        Occupation::factory(20)->create();
        TeacherInformation::factory(5)->create();
        Timetable::factory(10)->create();
        School::factory(40)->create();
        Section::factory(40)->create();
        TimetableSection::factory(10)->create();
        ModelSchool::factory(10)->create();

    }
}
