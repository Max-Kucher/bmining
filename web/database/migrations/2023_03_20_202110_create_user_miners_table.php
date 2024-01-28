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
        Schema::create('user_miners', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('tariff_id')->nullable();
            $table->foreign('tariff_id')->references('id')->on('tariffs')->nullOnDelete();
            # Tariff for miner

            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();
            # User of the miner

//            $table->unsignedBigInteger('order_id')->nullable();
//            $table->foreign('order_id')->references('id')->on('orders')->nullOnDelete();

            $table->integer('deposit')->default(0);
            $table->integer('profit')->default(0);
//            $table->integer('balance')->default(0);
            $table->integer('days')->nullable()->default(null);
            $table->boolean('run')->default(false);

            $table->boolean('hidden')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_miners');
    }
};
