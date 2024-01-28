<?php

namespace App\Jobs;

use App\Clients\TelegramBotApi;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class NewPaymentTelegram implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
//        $this->payment = $payment;
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
//        $user = $this->user;
////        $payment = $this->order;
//
//        $constInUSD = 1;
//        $message =
//            "*Новое пополненине баланса:*\n
//Сумма: {$constInUSD}\n
//Пользователь: {$user->name}";
//        TelegramBotApi::getInstance()->sendMessage($_ENV['TELEGRAM_CHAT'], $message);
    }
}
