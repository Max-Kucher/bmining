<?php

use App\Enums\AddressType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('crypto_addresses', function (Blueprint $table) {
            $table->id();
            $table->string('address');
            $table->boolean('processing');
            $table->dateTimeTz('last_payment')->nullable()->default(null);
            $table->string('type')->default(AddressType::BTC);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crypto_addresses');
    }
};
