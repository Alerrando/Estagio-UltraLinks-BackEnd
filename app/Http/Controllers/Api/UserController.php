<?php
namespace App\Http\Controllers\Api;
use App\Http\Requests\CreatedUpdateUserRequest;
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
            $data = $request->all();
            $cep = $request->only("cep");

            if(!Auth::attempt(["email" => $data["email"], "password" => $data["password"]])){
                $data["password"] = bcrypt($request->password);
                $user = User::create($data);
                $adressController = new AddressController();
                $adressController->create($cep['cep'], $user["id"]);
                return response()->json([
                    "status" => true,
                    "message" => [
                        new UserResource($user),
                    ]
                ]);
            };

            abort(403, 'Erro ao cadastrar!');
        } catch (Throwable $th) {
            report($th);

            return false;
        }
    }

    public function update(Request $request, string $id){
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
