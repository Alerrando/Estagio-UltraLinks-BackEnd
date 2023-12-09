<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DepositController;

Route::get("/users", [UserController::class, "index"]);
Route::get("/users/nextId", [UserController::class, "getNextUserID"]);
Route::post("/users", [UserController::class, "create"]);
Route::post("/users/find", [UserController::class, "validateUser"]);
Route::put("/users/{id}", [UserController::class, "update"]);
Route::delete("/users/{id}", [UserController::class, "delete"]);

Route::post("/deposit", [DepositController::class, "deposit"]);
