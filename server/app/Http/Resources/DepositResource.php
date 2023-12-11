<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DepositResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'cpf' => $this->user_cpf,
            'authorization_code' => $this->authorization_code,
            'value' => $this->value,
            "created" => Carbon::make($this->created_at)->format('Y-m-d'),
        ];
    }
}
