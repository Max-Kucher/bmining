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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('surname', 100);
            $table->string('email', 100)->unique();
            $table->string('phone', '30')->unique();
            $table->string('geo', '50')->nullable();

            $table->string('avatar')->nullable();
            $table->dateTimeTz('last_visit')->nullable()->default(\Illuminate\Support\Facades\DB::raw('CURRENT_TIMESTAMP'));

            $table->unsignedBigInteger('balance')->default(0);
            $table->integer('custom_bonus')->default(0);
            $table->boolean('banned')->default(false);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('status')->default('new');
            $table->boolean('tfa_enabled')->default(false);
            $table->string('google_2fa_secret')->default('');
            $table->unsignedBigInteger('referrer_id')->nullable();
            $table->foreign('referrer_id')->references('id')->on('users')->nullOnDelete();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
