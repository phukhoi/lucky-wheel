<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Str;

class Game extends Model
{
    use HasFactory;

    public const DRAFT_STATUS = 'draft';

    protected $fillable = [
        'code',
        'name',
        'status',
        'type',
        'created_by',
        'updated_by',
        'account_id',
        'ref_type',
        'ref_id',
        'game_template_id',
        'deleted_at',
    ];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->setAttribute('code', $model->generateCode());
        });
    }

    public function gameType(): MorphTo
    {
        return $this->morphTo('ref');
    }

    protected function generateCode()
    {
        do {
            $code = Str::uuid();
        } while (Game::where('code', $code)->exists());

        return $code;
    }
}
