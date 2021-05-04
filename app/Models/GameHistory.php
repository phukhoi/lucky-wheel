<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameHistory extends Model
{
    use HasFactory;

    protected $fillable = [
        'type',
        'customer_id',
        'ref_type',
        'ref_id',
        'game_prize_id',
        'game_id',
    ];
}
