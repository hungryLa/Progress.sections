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
        Schema::create('communications', function (Blueprint $table) {
            $table->id();
            $table->unique(['type','school_id','user_id']);
            $table->enum('type', \App\Models\Communication::TYPES);
            $table->unsignedBigInteger('school_id');
            $table->unsignedBigInteger('user_id');
            $table->enum('status',\App\Models\Communication::STATUS);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('communications');
    }
};
