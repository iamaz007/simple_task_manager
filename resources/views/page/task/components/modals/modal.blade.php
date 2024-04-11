<div class="modal fade" id="task_modal" aria-labelledby="task_modal_label" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content ">
            <div class="modal-header">
                <h5 class="modal-title" id="task_modal_label"></h5>
                <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="task_modal_body">
                <form class="form w-100 mb-13" id="">
                    <input type="hidden" id="task_id">
                    <div class="form-group">
                        <label for="task_project">Project</label>
                        <select id="task_project" class="form-control">
                            @for ($i = 0; $i < count($projects); $i++)
                                <option value="{{$projects[$i]->id}}">{{$projects[$i]->name}}</option>
                            @endfor
                        </select>
                        <div class="text-danger" data-field="project"></div>
                    </div>
                    <div class="form-group">
                        <label for="task_name">Task name</label>
                        <input id="task_name" class="form-control" type="text" placeholder="Name...">
                        <div class="text-danger" data-field="task_name"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer" id="task_modal_footer">
                <button onclick="taskCrud()" id="task_submit_btn" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>