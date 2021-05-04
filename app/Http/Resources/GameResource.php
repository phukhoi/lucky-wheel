<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class GameResource extends JsonResource
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
            'code' => $this->resource->code,
            'name' => $this->resource->name,
            'status' => $this->resource->status,
            'type' => $this->resource->type,
            'created_by' => $this->resource->created_by,
            'updated_by' => $this->resource->updated_by,
            'account_id' => $this->resource->account_id,
            'ref_type' => $this->resource->ref_type,
            'ref_id' => $this->resource->ref_id,
            'game_template_id' => $this->resource->game_template_id,
            'deleted_at' => $this->resource->deleted_at,
            'created_at' => $this->resource->created_at,
            'updated_at' => $this->resource->updated_at,
        ];
    }
}
