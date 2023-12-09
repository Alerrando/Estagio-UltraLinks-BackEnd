<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->date('date_of_birth');
            $table->string('password');
            $table->string('cpf')->unique();
            $table->string('cep');
            $table->string("address_number");
            $table->timestamps();
        });

        Schema::create("addresses", function(Blueprint $table){
            $table->id();
            $table->string("cep");
            $table->string("logradouro")->nullable();
            $table->string("complemento")->nullable();
            $table->string("bairro")->nullable();
            $table->string("localidade");
            $table->string("uf");
            $table->string("ibge");
            $table->string("gia");
            $table->string("ddd");
            $table->unsignedBigInteger("user_id");
            $table->foreign("user_id")->references("id")->on("users")->unique();
            $table->timestamps();
        });

        Schema::create("deposits", function(Blueprint $table){
            $table->id();
            $table->string("user_cpf");
            $table->foreign("user_cpf")->references("cpf")->on("users");
            $table->string("authorization_code");
            $table->double("value", 8, 2);
            $table->timestamps();
        });

        Schema::create("transfers", function(Blueprint $table){
            $table->id();
            $table->string("user_cpf");
            $table->foreign("user_cpf")->references("cpf")->on("users");
            $table->string("authorization_code");
            $table->double("value", 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
