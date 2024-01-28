<?php

namespace App\Clients;

use GuzzleHttp\Client;

class TelegramBotApi
{
    const API_LINK = 'https://api.telegram.org/';

    private string $apiKey;
    private $httpClient;

    public static function getInstance(): self
    {
        return new self($_ENV['TELEGRAM_BOT_KEY']);
    }

    public function __construct($apiKey)
    {
        $this->apiKey = $apiKey;
        $this->httpClient = new Client([
            'base_uri' => self::API_LINK,
        ]);
    }

    public function apiRequest($method, $data)
    {
        $req = $this->httpClient->post('/bot' . $this->apiKey . '/' . $method, [
            'json' => $data,
        ]);
        if ($req->getStatusCode() === 200) {
            return $req->getBody()->getContents();
        }

        return null;
    }

    public function sendMessage($chatId, $message)
    {
        return $this->apiRequest('sendMessage', [
            'chat_id' => $chatId,
            'text' => $message,
        ]);
    }
}
