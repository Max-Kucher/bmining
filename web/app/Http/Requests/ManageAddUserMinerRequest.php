<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ManageAddUserMinerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $user = $this->user();
        return $user->hasRole('admin') || $user->hasRole('manager');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'days' => ['required', 'numeric',],
            'deposit' => ['required', 'numeric',],
            'profit' => ['required', 'numeric',],
            'tariff_id' => ['required', 'numeric', Rule::exists('tariffs', 'id')],
            'run' => ['required', 'boolean',],
        ];
    }
}
