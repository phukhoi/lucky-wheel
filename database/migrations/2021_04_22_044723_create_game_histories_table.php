<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGameHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game_histories', function (Blueprint $table) {
            $table->id();
            $table->string('type')->nullable();
            $table->string('customer_id')->nullable();
            $table->string('ref_type');
            $table->unsignedBigInteger('ref_id');
            $table->foreignId('game_prize_id')->constrained();
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
        Schema::dropIfExists('game_histories');
    }
}
