<?php

use App\Models\File;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('files', function (Blueprint $table) {
            $table->id();
            $table->enum('model_type', File::TYPES)->nullable();
            $table->unsignedBigInteger('model_id')->nullable();
            $table->enum('type', File::TYPE);
            $table->unsignedSmallInteger('position')->nullable();
            $table->string('name');
            $table->string('original_name');
            $table->string('path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
