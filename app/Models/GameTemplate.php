<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameTemplate extends Model
{
    use HasFactory;

    public const ACTIVATED_STATUS = 'activated';

    public const WHEEL_TYPE = 'wheel';

    protected $fillable = [
        'name',
        'status',
        'type',
        'short_description',
        'description',
        'thumbnail',
    ];
}
