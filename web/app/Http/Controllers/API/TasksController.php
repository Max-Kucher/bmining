<?php

namespace App\Http\Controllers\API;

use App\Helpers\ResponseHelper;
use App\Models\Event;
use App\Models\Task;
use http\Env\Request;
use Illuminate\Http\JsonResponse;

class TasksController
{

    public function getLastTasks()
    {
        $user = auth()->user();

        $unviewedTasks = Task::findLastTasksByManager($user->id, true);
        return new JsonResponse([
            'tasks' => $unviewedTasks,
        ]);
    }

    public function markAsDone(int $id)
    {
        $user = auth()->user();
        $task = Task::find($id);
        if (!($task instanceof Task)) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('Not found'), 404);
        }
        if ($task->author_id !== null && ($task->user_id !== $user->id && $task->author_id !== $user->id)) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg("You can't edit this task"), 403);
        }

        $task->state = Task::DONE;
        $task->save();
        return new JsonResponse([
            'message' => 'success'
        ]);
    }

    public function getCountActive()
    {
        $user = auth()->user();

        return new JsonResponse([
            'count' => Task::getCountActiveByUserId($user->id),
        ]);
    }

    public function removeEvent(int $id)
    {
        $user = auth()->user();
        Event::removeByIdAndUser($id, $user->id);
        return new JsonResponse([]);
    }
}
