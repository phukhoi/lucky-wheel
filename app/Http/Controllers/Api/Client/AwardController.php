<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\GameHistoryResource;
use App\Models\ClaimedReward;
use App\Models\GameHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class AwardController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'reward_id' => ['required'],
        ]);

        $user = Auth::guard('client_api')->user();

        if (
            ! ($reward = ClaimedReward::query()
                ->where([
                    'user_id' => $user->id,
                    'id' => $request->input('reward_id')
                ])
                ->whereNull('awarded_at')
                ->first())
        ) {
            return response()->json([
                'message' => 'Reward not found',
            ], 422);
        }

        $reward->update(['awarded_at' => Carbon::now()]);

        return GameHistoryResource::make(
            GameHistory::create([
                'type' => $reward->game->type ?? '',
                'ref_type' => $reward->game->ref_type ?? null,
                'ref_id' => $reward->game->ref_id ?? null,
                'game_id' => $reward->game->id,
                'customer_id' => $user->id,
                'game_prize_id' => $reward->game_prize_id,
            ])
        );
    }
}