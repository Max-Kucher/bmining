<?php

namespace App\Http\Controllers\API;

use App\Models\Event;
use http\Env\Request;
use Illuminate\Http\JsonResponse;

class EventController
{

    public function getUnviewed()
    {
        $user = auth()->user();

        $unviewedEvents = Event::getLastByUserId($user->id, 15);
        return new JsonResponse([
            'events' => $unviewedEvents,
        ]);
    }

    public function markAsViewed()
    {
        $user = auth()->user();
        $viewed = Event::updateAllAsViewedByUserId($user->id);
        return new JsonResponse([
            'viewed' => $viewed,
        ]);
    }

    public function getCountUnviewed()
    {
        $user = auth()->user();

        return new JsonResponse([
            'count' => Event::getCountUnviewedByUserId($user->id),
        ]);
    }

    public function removeEvent(int $id)
    {
        $user = auth()->user();
        Event::removeByIdAndUser($id, $user->id);
        return new JsonResponse([]);
    }
}
