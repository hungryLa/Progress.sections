<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Day;
use App\Models\Occupation;
use App\Models\TimetableDay;
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
             'username' => 'admin',
             'email' => 'admin@mail.ru',
             'password' => Hash::make('password'),
         ]);
        User::create([
            'role' => User::ROLES['schools_owner'],
            'username' => 'schools_owner',
            'email' => 'schools_owner@mail.ru',
            'password' => Hash::make('password'),
        ]);
        User::create([
            'role' => User::ROLES['teacher'],
            'username' => 'teacher',
            'email' => 'teacher@mail.ru',
            'password' => Hash::make('password'),
        ]);
        User::create([
            'role' => User::ROLES['user'],
            'username' => 'user',
            'email' => 'user@mail.ru',
            'password' => Hash::make('password'),
        ]);
//        Occupation::factory(10)->create();
//        Day::factory(10)->create();
    }
}
