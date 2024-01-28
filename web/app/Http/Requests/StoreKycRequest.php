<?php

namespace App\Http\Requests;

use App\Models\KYC;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class StoreKycRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return KYC::getCountByUserId($this->user()->id) === 0;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:100'],
            'surname' => ['required', 'string', 'max:100'],
            'middlename' => ['required', 'string', 'max:100'],
            'photo' => ['required',
                File::types(['jpeg', 'png', 'jpg'])
                    ->min(500)
                    ->max(12 * 1024)]
        ];
    }
}
