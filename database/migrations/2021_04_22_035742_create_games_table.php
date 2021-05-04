<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('name');
            $table->string('status');
            $table->string('type')->nullable();
            $table->string('created_by')->nullable();
            $table->string('updated_by')->nullable();
            $table->string('account_id')->nullable();
            $table->string('ref_type');
            $table->unsignedBigInteger('ref_id');
            $table->foreignId('game_template_id')->constrained();
            $table->timestamp('deleted_at');
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
        Schema::dropIfExists('games');
    }
}
