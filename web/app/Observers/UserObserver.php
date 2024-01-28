<?php

namespace App\Observers;

use App\Models\Lead;
use App\Models\ManagerInfo;
use App\Models\ReferralProgram;
use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        do {
            $hashLink = mb_strimwidth(str_shuffle(md5(uniqid())), 0, 8);
            // just generate random symbols for link
            $referralProgram = new ReferralProgram([
                'user_id' => $user->id,
                'hash' => $hashLink,
            ]);
        } while (ReferralProgram::getCountByHash($hashLink) > 0);
        $referralProgram->save();
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        if ($user->hasRole(['admin', 'manager'])) {
            # Managers or admins cant be leads
            return;
        }

        if ($user->hasRole('manager')) {
            if (!ManagerInfo::isExistsByUserId($user->id)) {
                (ManagerInfo::create(['manager_id' => $user->id]))->save();
            }
            // TODO: Move this logic to other place
        }

        if ($user->isDirty('email_verified_at')) {
            // email has changed
            $newVerif = $user->email_verified_at;
            $oldVerif = $user->getOriginal('email_verified_at');
            if ($oldVerif == null && $newVerif !== null) {
                Lead::createOrUpdateExistsByUser($user->id);
            }
        }
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        Lead::removeLeadsById($user->id);
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
