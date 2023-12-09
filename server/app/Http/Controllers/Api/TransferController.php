<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\TransferResource;
use App\Http\Validations\Validations;
use Illuminate\Support\Facades\DB;
use App\Models\Transfer;
use App\Models\User;
use Illuminate\Http\Request;

class TransferController extends Controller{
    public function transfer(Request $request){
        $data = $request->except(['user_id']);
        $userCpf = $request->input('user_cpf');
        $validation = new Validations();
        $returnValidation = $validation->validate(['user_cpf', 'user_cpf_transfer', 'value'], $data);

        if($returnValidation === true){
            $user = User::where('cpf', $userCpf)->first();
            $user_transfer = User::where('cpf', $data["user_cpf_transfer"])->first();
            if ($user) {
                $user->total_value -= $data["value"];
                $user_transfer->total_value += $data["value"];
                $user->save();
                $user_transfer->save();
                $authorizationCode = 'TRANSF' . str_pad($this->getNextUserID(), 4, '0', STR_PAD_LEFT);
                $data["authorization_code"] = $authorizationCode;

                $deposit = Transfer::create($data);

                return response()->json(["status" => true,"message" => [new TransferResource($deposit)]]);
            }
        }
        return $returnValidation;
    }

    public function getNextUserID(){
        $statement = DB::select("show table status like 'transfers'");

        return $statement[0]->Auto_increment;
    }
}
