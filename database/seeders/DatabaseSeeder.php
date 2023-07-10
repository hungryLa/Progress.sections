<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\ModelSchool;
use App\Models\Occupation;
use App\Models\School;
use App\Models\SchoolType;
use App\Models\Section;
use App\Models\Subscription;
use App\Models\SubscriptionUser;
use App\Models\Teacher;
use App\Models\TeacherInformation;
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
        $teacher_count = 20;
        $school_count = 30;
        $section_count = 30;
        User::factory(5)->create();
        Teacher::factory($teacher_count)->create();
        Occupation::factory(5)->create();
        TeacherInformation::factory(5)->create();
        SchoolType::factory($school_count / 2)->create();
        School::factory($school_count)->create();
//        Timetable::factory($teacher_count * 6)->create();
        Section::factory($section_count)->create();
        TimetableSection::factory($section_count + 10)->create();
        ModelSchool::factory($school_count / $teacher_count)->create();
        Subscription::factory($school_count * 4)->create();
        SubscriptionUser::factory($school_count * 4)->create();
    }
}
