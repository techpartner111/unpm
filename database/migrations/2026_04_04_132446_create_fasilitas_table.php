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
Schema::create('fasilitas', function (Blueprint $table) {
    $table->id();
    $table->string('nama');
    $table->text('deskripsi');
    $table->string('thumbnail')->nullable();
    $table->string('slug')->unique(); // asrama, lab, dll
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fasilitas');
    }
};
