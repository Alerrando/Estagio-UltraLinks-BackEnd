<?php
namespace App\Http\Controllers\Api;
use App\Http\Requests\CreatedUpdateUserRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller{
    public function __construct(protected User $repository){
    }

    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function validateUser(Request $request){
        $user = User::where('email', $request->email)->first();

        return $user;
    }

    public function create(Request $request){
        try {
            $data = $request->all();

            if(Auth::attempt(["email" => $data["email"], "password" => $data["password"]])){
                $data["password"] = bcrypt($request->password);
                $user = User::create($data);
                return new UserResource($user);
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
