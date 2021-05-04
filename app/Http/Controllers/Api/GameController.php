<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\GameResource;
use App\Models\Game;
use App\Models\GameTemplate;
use App\Models\GameWheel;
use Illuminate\Http\Request;

class GameController
{
    public function index()
    {
        return response()->json([
            'data' => GameResource::collection(Game::latest()->get())
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:229'],
            'game_template_id' => ['required', 'numeric', 'exists:game_templates,id'],
            'account_id' => ['nullable', 'string', 'max:229'],
            'created_by' => ['nullable', 'string', 'max:229'],
            'updated_by' => ['nullable', 'string', 'max:229'],
        ]);

        $game = new Game(
            $request->only([
                'name',
                'game_template_id',
                'account_id',
                'created_by',
                'updated_by',
            ])
        );

        $game->type = GameTemplate::find($request->input('game_template_id'))->type;
        $game->status = Game::DRAFT_STATUS;

        $game->gameType()->associate(GameWheel::create());

        $game->save();
        
        return response()->json([
            'data' => GameResource::make($game)
        ]);
    }
}