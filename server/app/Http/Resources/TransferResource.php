<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransferResource extends JsonResource
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
            'cpf_transfer' => $this->user_cpf_transfer,
            'authorization_code' => $this->authorization_code,
            'value' => $this->value,
        ];
    }
}
