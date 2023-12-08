<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;

Route::get("/users", [UserController::class, "index"]);
Route::post("/users", [UserController::class, "create"]);
Route::put("/users/{id}", [UserController::class, "update"]);
