<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepositResource;
use Illuminate\Support\Facades\DB;
use App\Models\Deposit;
use Illuminate\Http\Request;
use App\Http\Validations\Validations;
use Illuminate\Support\Facades\Auth;

class DepositController extends Controller{
    public function deposit(Request $request){
        $data = $request->except(['user_id']);
        $user_id = $request->only("user_id");
        $validation = new Validations();
        $returnValdation = $validation->validate(['user_cpf', 'value'], $data);

        if($returnValdation === true){
            if (!Auth::attempt(["id" => $user_id])) {
                $nextSequence = $this->getNextUserID();
                $authorizationCode = 'DEP'.str_pad($nextSequence, 4, '0', STR_PAD_LEFT);
                $data["authorization_code"] = $authorizationCode;

                $deposit = Deposit::create($data);
                return response()->json([
                    "status" => true,
                    "message" => [
                        new DepositResource($deposit),
                    ]
                ]);
            }
        }

        return $returnValdation;
    }

    public function getNextUserID(){
        $statement = DB::select("show table status like 'deposits'");

        return $statement[0]->Auto_increment;
    }
}
