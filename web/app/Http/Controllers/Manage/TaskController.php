<?php

namespace App\Http\Controllers\Manage;

use App\Helpers\ResponseHelper;
use App\Http\Requests\ManageStoreUserTaskRequest;
use App\Models\Task;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Js;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Psy\Util\Json;

class TaskController
{
    public function storeUserTask(ManageStoreUserTaskRequest $request)
    {
        $validated = $request->validated();
        $user = auth()->user();
        $targetUser = User::find($validated['user_id']);


        if ($user->hasRole('admin') || $targetUser->hasRole('customer')) {


            $date = new Carbon($validated['show_after']);

            $task = Task::create([
                'author_id' => $user->id,
                'user_id' => $targetUser->id,
                'title' => $validated['title'],
                'description' => $validated['text'],
                'show_after' => $date,
                'state' => Task::NEW,
            ]);

            return new JsonResponse([
                'success'
            ]);
        }
        throw ValidationException::withMessages([
            'error' => ["Can't create task"],
        ]);
    }

    public function getMyUserTasks(int $id)
    {
        $user = auth()->user();

        if ($user->hasRole(['admin'])) {
            $tasks = Task::findByUser($id);
        } else {
            $tasks = Task::findByAuthorAndUser($user->id, $id);
        }

        return new JsonResponse([
            'tasks' => $tasks,
        ]);
    }

    public function removeTask(int $id)
    {
        $user = auth()->user();
        $task = Task::find($id);
        if (!$user->hasRole('admin') && $task->author_id !== $user->id) {
            return new JsonResponse(ResponseHelper::jsonErrorMsg('You have not permissions for this action.'), JsonResponse::HTTP_FORBIDDEN);
        }
        $dateNow = Carbon::now();
        if (!($dateNow->unix() >= $task->show_after->unix())) {
            $task->delete();
        } else {
            $task->delete();
        }

        return new JsonResponse([]);
    }

    public function myTasksApi()
    {
        $user = Auth::user();
        return new JsonResponse([
            'tasks' => Task::findLastTasksByManager($user->id),
        ]);
    }
}
