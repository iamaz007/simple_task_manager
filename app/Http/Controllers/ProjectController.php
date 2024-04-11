<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('page.project.index', []);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function read($orderByName = false)
    {
        $q = Project::query();
        if ($orderByName) {
            $q->orderBy('name', 'ASC');
        }
        return $q->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $r)
    {
        // return $request->all();
        $new_project = new Project();
        $new_project->name = $r->project_name;
        $new_project->save();
        return [true, 'Saved', $new_project];
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $r, Project $project)
    {
        $new_project = Project::find($r->project_id);
        $new_project->name = $r->project_name;
        $new_project->save();
        return [true, 'Updated', $new_project];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $r)
    {
        Project::find($r->project_id)->delete();

        return [true, 'Deleted'];
    }
}
