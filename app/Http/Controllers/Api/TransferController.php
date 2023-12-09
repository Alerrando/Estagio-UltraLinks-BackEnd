<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TransferController extends Controller{
    public function transfer(Request $request){
        $data = $request->except(['user_id']);
        $userCpf = $request->input('user_cpf');
        $validation = new Validations();
        $returnValidation = $validation->validate(['user_cpf', 'value'], $data);

        if($returnValidation === true){
            $user = User::where('cpf', $userCpf)->first();
            if ($user) {
                $user->total_value += $data["value"];
                $user->save();
                $authorizationCode = 'DEP' . str_pad($this->getNextUserID(), 4, '0', STR_PAD_LEFT);
                $data["authorization_code"] = $authorizationCode;

                $deposit = Deposit::create($data);

                return response()->json(["status" => true,"message" => [new DepositResource($deposit)]]);
            }
        }
        return $returnValidation;
    }

    public function getNextUserID(){
        $statement = DB::select("show table status like 'transfers'");

        return $statement[0]->Auto_increment;
    }
}
