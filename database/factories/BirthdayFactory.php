<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Birthday>
 */
class BirthdayFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::firstOrCreate(
            ['email' => 'anass@test.com'],
            [
                'id' => (string) Str::uuid(),
                'name' => 'Test Acc Anass',
                'password' => bcrypt('password'),
            ]
        );

        return [
            'id'=> fake()->uuid(),
            'name' => fake()->name(),
            'date' => fake()->date('d/m/y'),
            'user_id' => $user->id
        ];
    }
}
