<?php

namespace Database\Seeders;

use App\Models\GameTemplate;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        GameTemplate::create([
            'name' => 'Game Vòng Quay',
            'status' => GameTemplate::ACTIVATED_STATUS,
            'type' => GameTemplate::WHEEL_TYPE,
            'short_description' => 'There are many variations of passages of Lorem Ipsum available...',
            'description' => 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable',
            'thumbnail' => asset('img/wheel/wheel_game.jpeg'),
        ]);
    }
}
