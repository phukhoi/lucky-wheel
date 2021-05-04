<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGameTemplatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('game_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('status');
            $table->string('type')->nullable();
            $table->string('short_description')->nullable();
            $table->text('description')->nullable();
            $table->text('thumbnail')->nullable();
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
        Schema::dropIfExists('game_templates');
    }
}
