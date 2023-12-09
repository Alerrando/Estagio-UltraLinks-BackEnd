<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DepositResource;
use Illuminate\Support\Facades\DB;
use App\Models\Deposit;
use Illuminate\Http\Request;

class DepositController extends Controller{
    public function deposit(Request $request){
        $data = $request->all();
        $user = auth()->user();
        $requiredFields = ['cpf', 'value'];
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return response()->json(['error' => 'Campo ' . $field . ' ausente'], 400);
            }
        }
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

    public function getNextUserID(){
        $statement = DB::select("show table status like 'deposits'");

        return $statement[0]->Auto_increment;
    }
}
