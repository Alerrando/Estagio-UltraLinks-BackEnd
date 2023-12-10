<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\AddressResource;
use App\Http\Validations\Validations;
use App\Models\User;
use App\Models\Address;
use App\Models\Deposit;
use App\Http\Controllers\Api\AddressController;
use App\Http\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller{
    public function __construct(protected User $repository){
    }

    public function index(Request $request)
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function validateUser(Request $request){
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            abort(403, 'Credenciais inválidas');
        }

        return response(['user' => $user, "respond_with_token" => (new TokenService())->respondWithToken($credentials)], 200);
    }

    public function infosByCpf(Request $request){
        $data = $request->all();
        $user = User::where('cpf', $data["cpf"])->first();
        $adress = Address::where('user_id', $user->id)->first();
        $deposits = Deposit::where('user_cpf', $user->cpf)->first();

        if($request->bearerToken() == null){
            return response()->json(["status" => false, "message" => "Token não é válido!"], 403);
        }

        return response()->json([
            "status" => true,
            "message" => [
                "user" => $user,
                "address" => new AddressResource($adress),
                "deposit" => $deposits,
                "token" => $request->bearerToken(),
            ]
        ], 202);
    }

    public function create(Request $request){
        try {
            $data = $request->all();
            $validation = new Validations();
            $returnValidation = $validation->validate(['name', 'email', 'date_of_birth', 'password', 'cpf', 'cep', 'address_number', 'total_value'], $data);

            if($returnValidation === true){
                if (!Auth::attempt(["email" => $data["email"], "password" => $data["password"]])) {
                    $user = User::create($data);
                    $token = (new TokenService())->respondWithToken($data);
                    (new AddressController())->create($request->input('cep'), $user->id);

                    return response()->json(["status" => true, "message" => [ new UserResource($user), $token]]);
                }

                return response()->json(["status" => false, "message" => "Erro ao cadastrar!"], 403);
            }

            return $returnValidation;
        } catch (Throwable $th) {
            report($th);
            return response()->json(["status" => false,"message" => "Erro no sistema: ".$th,]);
        }
    }

    public function update(Request $request, string $id){
        $data = $request->all();
        $user = User::findOrFail($id);

        if ($request->bearerToken() == null) {
            return response()->json(["status" => false, "message" => "Token não é válido!"], 403);
        }

        $validation = new Validations();
        $returnValidation = $validation->validate(['name', 'email', 'date_of_birth', 'password', 'cpf', 'cep', 'address_number', 'total_value'], $data);

        if ($returnValidation === true) {
            $user->update($data);
            return new UserResource($user);
        }

        return $returnValidation;
    }

    public function delete(Request $request, string $id){
        if ($request->bearerToken() == null) {
            return response()->json(["status" => false, "message" => "Token não é válido!"], 403);
        }

        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Usuário excluído com sucesso'], 200);
    }
}
