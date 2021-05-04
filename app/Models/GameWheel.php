<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameWheel extends Model
{
    use HasFactory;

    protected $fillable = [
        'border_path',
        'arrow_path',
        'button_path',
    ];
}
