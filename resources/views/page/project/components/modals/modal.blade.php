<div class="modal fade" id="project_modal" aria-labelledby="project_modal_label" aria-hidden="true" data-bs-keyboard="false" data-bs-backdrop="static">
    <div class="modal-dialog">
        <div class="modal-content ">
            <div class="modal-header">
                <h5 class="modal-title" id="project_modal_label"></h5>
                <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" id="project_modal_body">
                <form class="form w-100 mb-13" id="">
                    <input type="hidden" id="project_id">
                    <div class="form-group">
                        <label for="project_name">Project name</label>
                        <input id="project_name" class="form-control" type="text" placeholder="Name...">
                        <div class="text-danger" data-field="project_name"></div>
                    </div>
                </form>
            </div>
            <div class="modal-footer" id="project_modal_footer">
                <button onclick="projectCrud()" id="project_submit_btn" class="btn btn-primary">Save</button>
            </div>
        </div>
    </div>
</div>