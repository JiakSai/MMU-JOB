<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Rating;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Rating>
 */
class RatingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = Rating::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // Automatically create a User for each Rating
            'rating' => $this->faker->numberBetween(1, 5), // Random rating between 1 and 5
            'company_id'=> '1',
            'employeeType' => $this->faker->randomElement(['Full Time', 'Part Time', 'Internship']),
            'jobTitle' => $this->faker->jobTitle,
            'headline'=> $this->faker->sentence,
            'review'=> $this->faker->paragraph,
        ];
    }
}
