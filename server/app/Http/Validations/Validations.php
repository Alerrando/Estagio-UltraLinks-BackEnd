<?php

namespace App\Http\Validations;

class Validations{
    public function __construct(){
    }

    public function validate(array $requiredFields, array $data){
        foreach ($requiredFields as $field) {
            if (!isset($data[$field])) {
                return response()->json(['error' => 'Campo ' . $field . ' ausente'], 400);
            }
        }

        return true;
    }
}
