<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('timetable_sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('section_id');
            $table->unsignedBigInteger('timetable_id')->unique();

            $table->unsignedSmallInteger('lesson_price');
            $table->unsignedSmallInteger('trial_price')->nullable();
            $table->unsignedSmallInteger('group')->nullable();
            $table->unsignedSmallInteger('group_price')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('timetable_sections');
    }
};
