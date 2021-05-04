<?php

namespace App\Http\Controllers\Api;

use App\Models\GameTemplate;

class GameTemplateController
{
    public function index()
    {
        return response()->json([
            'data' => GameTemplate::all()->transform(function ($template) {
                return [
                    'id' => $template->id,
                    'name' => $template->name,
                    'status' => $template->status,
                    'type' => $template->type,
                    'short_description' => $template->short_description,
                    'description' => $template->description,
                    'thumbnail' => $template->thumbnail,
                    'created_at' => $template->created_at,
                    'updated_at' => $template->updated_at,
                ];
            })
        ]);
    }
}