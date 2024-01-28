<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTariffApiRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'string|nullable',
            'description' => 'string|nullable',
            'price' => 'required|numeric',
            'percent' => 'required|numeric',
            'available' => 'required|boolean',
        ];
    }
}
