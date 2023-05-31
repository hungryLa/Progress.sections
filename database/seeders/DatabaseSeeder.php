<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Day;
use App\Models\ModelSchool;
use App\Models\Occupation;
use App\Models\School;
use App\Models\SchoolType;
use App\Models\Section;
use App\Models\Subscription;
use App\Models\SubscriptionUser;
use App\Models\Teacher;
use App\Models\TeacherInformation;
use App\Models\Timetable;
use App\Models\TimetableDay;
use App\Models\TimetableSection;
use App\Models\User;
use Carbon\Carbon;
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
            'email_verified_at' => Carbon::now(),
        ]);
        User::create([
            'role' => User::ROLES['schools_owner'],
            'full_name' => 'schools_owner',
            'email' => 'schools_owner@mail.ru',
            'password' => Hash::make('password'),
            'email_verified_at' => Carbon::now(),
        ]);
        User::create([
            'role' => User::ROLES['teacher'],
            'full_name' => 'teacher',
            'email' => 'teacher@mail.ru',
            'password' => Hash::make('password'),
            'email_verified_at' => Carbon::now(),
        ]);
        User::create([
            'role' => User::ROLES['user'],
            'full_name' => 'user',
            'email' => 'user@mail.ru',
            'password' => Hash::make('password'),
            'email_verified_at' => Carbon::now(),
        ]);
        User::factory(5)->create();
        Teacher::factory(5)->create();
        Occupation::factory(5)->create();
        TeacherInformation::factory(5)->create();
        Timetable::factory(40)->create();
        SchoolType::factory(5)->create();
        School::factory(20)->create();
        Section::factory(40)->create();
        TimetableSection::factory(40)->create();
        ModelSchool::factory(20)->create();
        Subscription::factory(20)->create();
        SubscriptionUser::factory(40)->create();
    }
}
