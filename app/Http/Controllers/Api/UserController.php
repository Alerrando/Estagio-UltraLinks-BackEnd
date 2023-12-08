<?php
namespace App\Http\Controllers\Api;
use App\Http\Requests\CreatedUpdateUserRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller{
    public function __construct(protected User $repository){
    }

    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    public function create(Request $request){
        $data = $request->all();
        $data["password"] = bcrypt($request->password);
        $user = User::create($data);
        return new UserResource($user);
    }

    public function update(Request $request, string $id){
        $data = $request->all();
        $user = User::findOrFail($id);
        $user->update($data);
        return new UserResource($user);
    }
}
