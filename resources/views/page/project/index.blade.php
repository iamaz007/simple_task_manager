@extends('layout.layout')

@section('content')
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Projects</h1>
    </div>
    <button onclick="projectModal()" class="btn btn-primary">Add project</button>
    <div class="table-responsive">
        <table class="table table-striped table-sm">
            <thead>
                <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody id="project_table_body"></tbody>
        </table>
    </div>
@endsection

@push('modals')
    @include('page.project.components.modals.modal')
@endpush

@push('scripts')
    @vite('resources/js/project/index.js', 'build')
@endpush