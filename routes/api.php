<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

Route::get("/users", [UserController::class, "index"]);
Route::get("/users/nextId", [UserController::class, "getNextUserID"]);
Route::post("/users", [UserController::class, "create"]);
Route::post("/users/find", [UserController::class, "validateUser"]);
Route::put("/users/{id}", [UserController::class, "update"]);
Route::delete("/users/{id}", [UserController::class, "delete"]);
