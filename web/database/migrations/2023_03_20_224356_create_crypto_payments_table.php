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
        Schema::create('crypto_payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('address_id')->nullable();
            $table->foreign('address_id')->references('id')->on('crypto_addresses')->nullOnDelete();
            $table->unsignedBigInteger('sum')->default(0);
            $table->dateTimeTz('confirmed_at')->nullable()->default(null);
            $table->dateTimeTz('last_check')->nullable()->default(null);
            $table->unsignedBigInteger('rate')->default(0);
            $table->string('transaction')->nullable();
            $table->string('currency')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crypto_payments');
    }
};
