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
        Schema::create('model_schools', function (Blueprint $table) {
            $table->id();
            $table->enum('model_type',\App\Models\ModelSchool::TYPES);
            $table->unsignedBigInteger('model_id');
            $table->unsignedBigInteger('school_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('model_schools');
    }
};
