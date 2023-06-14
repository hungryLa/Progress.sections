<?php

namespace Database\Factories;

use App\Models\Subscription;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SubscriptionUser>
 */
class SubscriptionUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subscription = Subscription::get()->random();
        $deposit = null;
        $remaining_classes = null;
        if ($subscription->type == Subscription::TYPES['deposit']) {
            $deposit = random_int(1000, 15000);
        }
        if ($subscription->type == Subscription::TYPES['section card']) {
            $remaining_classes = random_int(5, 25);
        }
        return [
            'user_id' => User::where('role', User::ROLES['user'])->get()->random()->id,
            'subscription_id' => $subscription->id,
            'price_subscription' => random_int(1000, 15000),
            'deposit' => $deposit,
            'remaining_classes' => $remaining_classes,
        ];
    }
}
