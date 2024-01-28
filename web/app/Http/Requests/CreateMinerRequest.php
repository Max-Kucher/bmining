<?php

namespace App\Http\Requests;

use App\Enums\PaymentMethod;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CreateMinerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
//            'deposit' => ['required', 'numeric', 'min:100', 'max:10000000'],
            'deposit' => ['required', 'numeric', 'min:5', 'max:10000000'],
            'paymentMethod' => ['required', 'string', Rule::in([PaymentMethod::BTC->value, PaymentMethod::CARD->value])]
        ];
    }
}
