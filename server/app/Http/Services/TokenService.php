<?php
namespace App\Http\Services;
use Illuminate\Support\Facades\Auth;

class TokenService{

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function respondWithToken(array $credentials){
        try {
            $credentials_token = collect($credentials)->only(['email', 'password'])->toArray();
            $token = Auth::attempt($credentials_token);

            if (!$token) {
                return response()->json(["status" => false, "message" => "Credenciais inválidas"], 401);
            }

            return response()->json([
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ], 200);
        } catch (Exception $e) {
            return response()->json(["status" => false, "message" => "Erro ao criar o token: " . $e->getMessage()], 500);
        }
    }
}
