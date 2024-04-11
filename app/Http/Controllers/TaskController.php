<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pc = new ProjectController();
        // return $pc->read(true);
        return view('page.task.index', [
            'projects' => $pc->read(true),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function read(Request $r)
    {
        $q = Task::query();
        $q->with(['project']);
        $q->orderBy('priority', 'ASC');
        $q->where('project_id', $r->project);
        return $q->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $r)
    {
        $new_task = new Task();
        $new_task->project_id = $r->project;
        $new_task->name = $r->task_name;
        $new_task->priority = count(Task::where('project_id', $r->project)->get()) + 1;
        $new_task->save();
        return [true, 'Saved', $new_task];
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $r, Task $task)
    {
        $task = Task::find($r->task_id);
        $old_project_id = $task->project_id;

        if ($old_project_id != $r->project) {
            $task->project_id = $r->project;
            $task->priority = count(Task::where('project_id', $r->project)->get()) + 1;
        }

        $task->name = $r->task_name;

        $task->save();

        self::update_priority($old_project_id);
        return [true, 'Updated', $task];
    }

    function update_priority($project_id)
    {
        $tasks = Task::where('project_id', $project_id)->orderBy('priority', 'ASC')->get();
        for ($i = 0; $i < count($tasks); $i++) {
            if ($tasks[$i]->priority != ($i + 1)) {
                $tasks[$i]->priority = ($i + 1);
                $tasks[$i]->save();
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $r)
    {
        $task = Task::find($r->task_id);
        $old_project_id = $task->project_id;
        $task->delete();
        self::update_priority($old_project_id);

        return [true, 'Deleted'];
    }

    public function sort(Request $r)
    {
        // return $r->item_1['task_id'];
        Task::where('id', $r->item_1['task_id'])->update(['priority' => $r->item_1['task_priority']]);
        Task::where('id', $r->item_2['task_id'])->update(['priority' => $r->item_2['task_priority']]);

        return [true, 'sorted'];
    }
}
