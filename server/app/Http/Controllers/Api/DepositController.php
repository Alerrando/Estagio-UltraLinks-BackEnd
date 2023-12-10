<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepositResource;
use App\Models\Deposit;
use App\Models\User;
use App\Http\Validations\Validations;
use Illuminate\Http\Request;

class DepositController extends Controller{
    public function deposit(Request $request){
        $data = $request->except(['user_id']);
        $userCpf = $request->input('user_cpf');
        $validation = new Validations();
        $returnValidation = $validation->validate(['user_cpf', 'value'], $data);

        if($returnValidation === true){
            $user = User::where('cpf', $userCpf)->first();
            if ($user) {
                $value_result = $user->total_value + $data["value"];
                $user->total_value = $value_result;
                $user->save();

                $lastAuthorizationCode = Deposit::orderBy('id', 'desc')->value('authorization_code');
                $lastNumber = intval(substr($lastAuthorizationCode, 3));

                $nextNumber = $lastNumber + 1;
                $authorizationCode = 'DEP' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
                $data["authorization_code"] = $authorizationCode;

                $deposit = Deposit::create($data);

                return response()->json(["status" => true,"message" => [new DepositResource($deposit)]]);
            }
        }
        return $returnValidation;
    }
}

