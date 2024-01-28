<?php

namespace App\Clients;

use GuzzleHttp\Client;
use Illuminate\Http\JsonResponse;

class CoinApiIo
{
    private Client $httpClient;
    const API_URL = "https://rest.coinapi.io/v1";
    private $apiLink;
    private $apiKey;

    public function __construct(Client $httpClient, $apiKey = "1c29345b-e67f-4887-8fb7-cdaad341cd86")
    {
        $this->httpClient = $httpClient;
        $this->apiLink = self::API_URL;
        $this->apiKey = $apiKey;
    }

    public static function createGuzzleHttpClient($apiKey)
    {
        $config = [
            'http_errors' => false,
            'headers' => [
                'Accepts' => 'application/json',
                'X-CoinAPI-Key' => $apiKey
            ],
        ];

        return new Client($config);
    }

    public static function getInstance($apiKey): self
    {
        $client = self::createGuzzleHttpClient($apiKey);
        $coinmarkerApi = new self($client, $apiKey);
        return $coinmarkerApi;
    }

    public function getCurrencyCourseRequest($from = ["BTC", "LTC"], $to = 'USD')
    {
        if (is_array($from)) {
            $fromAsset = implode(',', $from);
        }
        $req = $this->httpClient->get($this->apiLink . "/exchangerate/$to?invert=true&filter_asset_id=$fromAsset", [
        ]);
        $data = $req->getBody()->getContents();

        $decodedData = json_decode($data, true);
        return $decodedData;
    }

        public function getMainCurrencyCourse()
    {
        $data = $this->getCurrencyCourseRequest(['BTC', 'LTC'], 'USD');
        $courses = [];
        foreach ($data['rates'] as $rateData) {
            $courses[$rateData['asset_id_quote']] = $rateData['rate'];
        }

        return $courses;
    }
}
