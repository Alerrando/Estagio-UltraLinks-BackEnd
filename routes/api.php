<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DepositController;

Route::get("/users", [UserController::class, "index"]);
Route::post("/users", [UserController::class, "create"]);
Route::post("/users/find", [UserController::class, "validateUser"]);
Route::post("/users/by-cpf", [UserController::class, "infosByCpf"]);
Route::put("/users/{id}", [UserController::class, "update"]);
Route::delete("/users/{id}", [UserController::class, "delete"]);

Route::post("/users/deposit", [DepositController::class, "deposit"]);
