<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ClaimedRewardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->resource->id,
            'game_prize_name' => $this->resource->gamePrize->name ?? '',
            'game_prize_id' => $this->resource->game_prize_id ?? null,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}
