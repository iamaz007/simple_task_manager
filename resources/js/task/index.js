import { renderResponseMessage, sendRequest } from "../global/server";
import { initSorting } from "./reorder";

let tasks = [];

$(function () {
    readTasks();

    $('#filter_project').on('change', function () {
        readTasks($(this).val());
    });


})

const readTasks = async () => {
    tasks = await sendRequest('/tasks', {
        'project': $('#filter_project').val(),
    });
    // console.log(tasks);
    renderTasks()
}

const renderTasks = () => {
    let body = '';
    for (let i = 0; i < tasks.length; i++) {
        body += `
        <li draggable="true" data-id="${tasks[i]['id']}" data-index="${tasks[i]['priority']}">
            <div class="d-flex justify-content-between">
                ${tasks[i]['name']}
                <div>
                    <button onclick="taskModal(${i})" id="" class="btn btn-success"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button onclick="taskDelete(${i})" id="" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button>
                </div>
            </div>
        </li>`.trim();
    }

    $('#task_list').html(body);

    initSorting('task_list', updateAfterSort);
}

window.taskModal = (index = -1) => {
    $('[data-field]').html('');
    if (index > -1) {
        $('#task_modal_label').text('Update Task');
        $('#task_id').val(tasks[index]['id']);
        $('#task_name').val(tasks[index]['name']);
        $('#task_project').val(tasks[index]['project_id']);
        $('#task_submit_btn').removeClass('btn-success').addClass('btn-primary').text('Save');

    } else {
        $('#task_modal_label').text('Save Task');
        $('#task_id').val('');
        $('#task_name').val('');
        $('#task_submit_btn').removeClass('btn-success').addClass('btn-primary').text('Save');
    }

    $('#task_modal').modal('show');
}

window.taskCrud = async () => {
    $('[data-field]').html('');

    let url = '/task/';
    let data = {
        task_name: $('#task_name').val(),
        project: $('#task_project').val(),
    }

    if ($('#task_id').val().length > 0) {
        data['task_id'] = $('#task_id').val();
        url += 'update';
    } else {
        url += 'store';
    }


    let resp = await sendRequest(url, data);
    console.log(resp)
    renderResponseMessage(resp, 'under_field_message');

    if (resp[0]) {
        // if ($('#task_id').val().length > 0) {
        //     var index = tasks.findIndex(x => x.id == $('#task_id').val());
        //     if (index > -1) {
        //         tasks[index] = resp[1];
        //     }
        // } else {
        //     tasks.push(resp[1]);
        // }
        readTasks();

        // renderTasks()

        $('#task_modal').modal('hide');
    }
}

window.taskDelete = async (index) => {
    let url = '/task/delete';
    let data = {
        task_id: tasks[index]['id'],
    }

    var resp = await sendRequest(url, data);
    if (resp[0]) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

const updateAfterSort = async (data) => {
    // console.log(data)
    let url = '/task/sort';
    let resp = await sendRequest(url, data);
    console.log(resp)
    readTasks();
}