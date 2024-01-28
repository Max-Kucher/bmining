<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ManageStoreUserTaskRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:50'],
            'text' => ['required', 'string', 'max:250'],
            'user_id' => ['required', 'numeric', Rule::exists('users', 'id')],
            'show_after' => ['required', 'date'],
        ];
    }
}
