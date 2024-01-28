<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Lead;
use App\Models\ManagerInfo;
use App\Models\User;
use Carbon\Carbon;
use Database\Factories\UserFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Money\Currencies\CurrencyList;
use Money\Currency;
use Money\Money;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = new User([
            'name' => 'Pretty',
            'surname' => 'Cat',
            'email' => 'always.taktless@gmail.com',
            'password' => Hash::make('11111111'),
            'phone' => '380999999999',
            'email_verified_at' => time(),
        ]);
        $user->assignRole('admin');
        $user->save();
        $date = Carbon::now();
        $userData = [
            'id' => 1,
            'username' => 'Little cat',
            'avatar' => 'http://127.0.0.1:8000/storage/avatars/7QHNKbxlpVan6pLngytBAE96vjCzjUKaMceBcnNN.png',
        ];
        $text = 'Lorem ipsum dolor amet glory hole someone help me hear my voice in the void';
        Event::createUserNotificationForManager($user->id, 'Help me', $text, $userData, $date);



        $user = new User([
            'name' => 'Manager',
            'surname' => 'Manager',
            'email' => 'manager@gmail.com',
            'password' => Hash::make('11111111'),
            'phone' => '3809999999',
            'email_verified_at' => time(),
        ]);


        $user->assignRole('manager');
        $user->save();
        $newManagerInfo = new ManagerInfo([
            'manager_id' => $user->id,
            'balance' => 0,
            'percent' => 5,
        ]);
        $newManagerInfo->save();


        $user = new User([
            'name' => 'Customer',
            'surname' => 'Customer',
            'email' => 'customer@gmail.com',
            'password' => Hash::make('11111111'),
            'phone' => '3809999999123213',
            'email_verified_at' => time(),
        ]);

        $user->assignRole('customer');
        $user->save();
        Lead::createOrUpdateExistsByUser($user->id);



        $users = User::factory()->count(10)->create();

        for ($i = 0; $i < 5; $i++) {
//            Event::create([
//                'user_id' => $user->id,
//                'content' => 'Hello, kitty',
//                'show_after' => Carbon::now(),
//            ]);
//
        }


        foreach ($users as $user) {
            $user->assignRole('customer');
            Lead::createOrUpdateExistsByUser($user->id);
        }
    }
}
