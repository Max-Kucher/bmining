<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class EmailVerificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $targetUser = User::find(($this->route('id')));
        if ($targetUser === null) {
            return false;
        }

        $targetEmail = $targetUser->email;

        if (!hash_equals(sha1($targetEmail), (string)$this->route('hash'))) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }

    /**
     * Fulfill the email verification request.
     *
     * @return void
     */
    public function fulfill()
    {
        $targetUser = User::find(($this->route('id')));

        if (!$targetUser->hasVerifiedEmail()) {
            $targetUser->markEmailAsVerified();

            event(new Verified($targetUser));
        }
    }

    /**
     * Configure the validator instance.
     *
     * @param \Illuminate\Validation\Validator $validator
     * @return void
     */
    public function withValidator(Validator $validator)
    {
        return $validator;
    }
}
