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
    Schema::create('biayas', function (Blueprint $table) {
        $table->id();
        $table->string('prodi');
        $table->string('per_bulan')->nullable();
        $table->string('per_semester')->nullable();
        $table->string('bpi')->nullable();
        $table->string('pkkmb')->nullable();
        $table->string('daftar_ulang_a')->nullable();
        $table->string('daftar_ulang_b')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biayas');
    }
};
