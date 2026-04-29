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
        Schema::create('biaya_rpl', function (Blueprint $table) {
    $table->id();
    $table->string('program_studi');
    $table->string('biaya_semester')->nullable();
    $table->string('pkkmb')->nullable();
    $table->string('bpi_gel_1')->nullable();
    $table->string('bpi_gel_2')->nullable();
    $table->string('bpi_gel_3')->nullable();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('biaya_rpl');
    }
};
