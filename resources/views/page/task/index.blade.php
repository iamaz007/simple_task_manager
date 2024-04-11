@extends('layout.layout')

@push('styles')
    <style>
        #task_list {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        #task_list li {
            background-color: #f2f2f2;
            padding: 8px;
            margin-bottom: 4px;
            cursor: grab;
        }
        #task_list li:hover {
            background-color: #ddd;
        }
    </style>
@endpush

@section('content')
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Tasks</h1>
    </div>
    <button onclick="taskModal()" class="btn btn-primary">Add Task</button>
    <div class="form-group my-2">
        <label for="filter_project">Filter by project</label>
        <select id="filter_project" class="form-control w-25">
            @for ($i = 0; $i < count($projects); $i++)
                <option value="{{$projects[$i]->id}}">{{$projects[$i]->name}}</option>
            @endfor
        </select>
    </div>
    <div class="w-50">
        <ul id="task_list"></ul>
    </div>
@endsection
@push('modals')
    @include('page.task.components.modals.modal')
@endpush

@push('scripts')
    @vite('resources/js/task/index.js', 'build')
@endpush