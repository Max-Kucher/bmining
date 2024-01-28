<?php

use App\Models\Order;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('description')->nullable();

            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete();

            $table->unsignedBigInteger('miner_id')->nullable();
            $table->foreign('miner_id')->references('id')->on('user_miners')->nullOnDelete();

            $table->unsignedBigInteger('sum')->default(0);

            $table->unsignedBigInteger('paymentable_id')->nullable();
            $table->string('paymentable_type')->nullable();

            $table->dateTimeTz('paid_at')->nullable()->default(null);

            $table->string('state')->default(Order::PENDING);
            $table->string('method')->default(null);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
