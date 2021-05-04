<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ClaimedReward extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'game_prize_id',
        'game_id',
        'awarded_at',
    ];

    public function game(): BelongsTo
    {
        return $this->belongsTo(Game::class);
    }
    
    public function gamePrize(): BelongsTo
    {
        return $this->belongsTo(GamePrize::class);
    }
}
