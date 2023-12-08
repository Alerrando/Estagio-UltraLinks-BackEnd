<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Models\User;

class UserController extends Controller{
    public function __construct(protected User $repository){
    }

    public function show(string $id)
    {
        $user = $this->repository->findOrFail();
        return response()->json($user);
    }
}
