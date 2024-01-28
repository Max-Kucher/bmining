<?php

namespace App\Helpers;

class ResponseHelper
{
    public static function jsonErrorMsg($messageText)
    {
        return [
            'message' => $messageText,
        ];
    }
}
