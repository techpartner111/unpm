<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up()
{
    Schema::create('rpl_sections', function (Blueprint $table) {
        $table->id();
        $table->string('type'); 
        // header | skema | tahapan | sk | persyaratan

        $table->string('title')->nullable();
        $table->text('content')->nullable();

        $table->string('extra')->nullable(); 
        // bisa untuk: gambar / pdf / subtitle

        $table->integer('order')->default(0);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rpl_sections');
    }
};
