<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['string', 'max:255'],
            'surname' => ['string', 'max:255'],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->route('id'))],
            'phone' => ['string', 'max:255', Rule::unique(User::class)->ignore($this->route('id'))],
            'balance' => ['numeric'],
            'email_verified_at' => ['boolean'],
            'password' => ['string', 'nullable', 'max:100'],
            'custom_bonus' => ['numeric'],
            'status' => ['string'],
            'is_admin' => ['boolean'],
            'is_manager' => ['boolean'],
            'tariff_id' => ['numeric', 'nullable', Rule::exists('tariffs', 'id')],
        ];
    }
}
