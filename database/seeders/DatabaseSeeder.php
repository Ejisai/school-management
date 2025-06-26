<?php


namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Teacher;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@gmail.com',
            'password' => '123456789',

        ]);
        Admin::factory()->create([
            'firstname' => 'Test Admin firstname',
            'lastname' => 'Test Admin lastname',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(), 10),
            'email' => 'admin@gmail.com',
            'password' => Hash::make('123456789'),
        ]);
        Teacher::factory()->create([
            'firstname' => 'Test Teacher firstname',
            'lastname' => 'Test Teacher lastname',
            'date_of_birth' => fake()->date(),
            'address' => fake()->address(),
            'phone' => substr(fake()->phoneNumber(), 10),
            'email' => 'teacher@gmail.com',
            'password' => Hash::make('123456789'),
        ]);
    }
}
