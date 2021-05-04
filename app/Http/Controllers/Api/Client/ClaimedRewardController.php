<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClaimedRewardResource;
use App\Models\ClaimedReward;
use App\Models\Game;
use App\Models\GamePrize;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClaimedRewardController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'game_code' => ['required', 'exists:games,code'],
        ]);

        return ClaimedRewardResource::make(
            $this->getReward(
                Game::where('code', $request->input('game_code'))->first(),
                Auth::guard('client_api')->user()
            )
        );
    }

    protected function getReward(Game $game, User $user): ClaimedReward
    {
        if (
            $reward = ClaimedReward::query()
                ->where([
                    'game_id' => $game->id,
                    'user_id' => $user->id
                ])
                ->whereNull('awarded_at')
                ->first()
        ) {
            return $reward;
        }

        // Random reward.
        $prizes = GamePrize::where('game_id', $game->id)->get();
        $items = [];

        foreach ($prizes as $prize) {
            $items = array_merge($items, array_fill(0, $prize->win_rate / 100, $prize->id));
        }

        $prize = $prizes->first(function ($prize) use ($items) {
            return $prize->id == $items[array_rand($items)];
        });

        return ClaimedReward::create([
            'user_id' => $user->id,
            'game_prize_id' => $prize->id,
            'game_id' => $game->id,
        ]);
    }
}