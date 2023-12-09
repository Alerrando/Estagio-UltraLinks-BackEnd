<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Api\AddressController;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserController extends Controller{
    public function __construct(protected User $repository){
    }

    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function getNextUserID(){

    $statement = DB::select("show table status like 'users'");

    return response()->json(['user_id' => $statement[0]->Auto_increment]);
    }

    public function validateUser(Request $request){
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            abort(403, 'Credenciais inválidas');
        }

        return $user;
    }

    public function create(Request $request){
        try {
            $adressController = new AddressController();
            $cep = $request->only("cep");
            $data = $request->only(['name', 'email', 'date_of_birth', 'password', 'cpf', 'cep', 'address_number']);
            $requiredFields = ['name', 'email', 'date_of_birth', 'password', 'cpf', 'cep', 'address_number'];
            foreach ($requiredFields as $field) {
                if (!isset($data[$field])) {
                    return response()->json(['error' => 'Campo ' . $field . ' ausente'], 400);
                }
            }

            if(!Auth::attempt(["email" => $data["email"], "password" => $data["password"]])){
                $user = User::create($data);
                $adressController->create($cep['cep'], $user["id"]);
                return response()->json([
                    "status" => true,
                    "message" => [
                        new UserResource($user),
                    ]
                ]);
            };

            return response()->json([
                "status" => false,
                "message" => "Erro ao cadastrar!"
            ]);
        } catch (Throwable $th) {
            report($th);
            return response()->json([
                "status" => false,
                "message" => "Erro no sistema: ".$th,
            ]);
        }
    }


    public function update(Request $request, string $id){
        $data = $request->only(['name', 'email', 'date_of_birth', 'password', 'cpf', 'cep', 'address_number']);
        $requiredFields = ['name', 'email', 'date_of_birth', 'password', 'cpf', 'cep', 'address_number'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return response()->json(['error' => 'Campo ' . $field . ' ausente'], 400);
            }
        }
        
        $data = $request->all();
        $user = User::findOrFail($id);
        $user->update($data);
        return new UserResource($user);
    }

    public function delete(string $id){
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'Usuário excluído com sucesso'], 200);
    }
}
