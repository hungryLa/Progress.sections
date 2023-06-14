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
        Schema::create('timetables', function (Blueprint $table) {
            $table->id();
            $table->enum('type', \App\Models\Timetable::TYPES);
            $table->unsignedBigInteger('model_id');
            $table->json('weekday');
            $table->time('lesson_time');
            $table->time('workday_start');
            $table->time('workday_end');
            $table->boolean('without_rest')->default(false);
            $table->time('rest_start')->nullable();
            $table->time('rest_end')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timetables');
    }
};
