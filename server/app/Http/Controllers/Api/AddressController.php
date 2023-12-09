<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AddressResource;
use App\Models\Address;
use Illuminate\Support\Facades\Http;

class AddressController extends Controller{
    public function create(string $cep, int $user_id){
        try {
            $url = 'https://viacep.com.br/ws/'.str_replace("-", "", $cep).'/json/';
            $response = Http::get($url);

            if ($response->successful()) {
                $bodyInfos = $response->json();
                $bodyInfos["user_id"] = $user_id;

                $address = Address::create($bodyInfos);

                return response()->json([
                    "status" => true,
                    "message" => [
                        new AddressResource($address),
                    ]
                ]);
            } else {
                abort(403, 'Erro ao cadastrar endereço!');
            }
        } catch (Throwable $th) {
            report($th);

            return false;
        }
    }
}
