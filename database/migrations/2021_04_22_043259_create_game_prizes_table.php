<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGamePrizesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game_prizes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type')->nullable();
            $table->unsignedInteger('win_rate')->default(0);
            $table->string('ref_type');
            $table->unsignedBigInteger('ref_id');
            $table->foreignId('game_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('game_prizes');
    }
}
