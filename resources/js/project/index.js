import { renderResponseMessage, sendRequest } from "../global/server";

let projects = [];

$(function () {
    readProjects();
})

const readProjects = async () => {
    projects = await sendRequest('/projects', {});
    // console.log(projects);
    renderProjects()
}

const renderProjects = () => {
    let body = '';
    for (let i = 0; i < projects.length; i++) {
        body += `
            <tr>
                <td scope="col">${i+1}</td>
                <td scope="col">${projects[i]['name']}</td>
                <td scope="col">${projects[i]['created_at']}</td>
                <td scope="col">
                    <button onclick="projectModal(${i})" id="" class="btn btn-success"><i class="fa-regular fa-pen-to-square"></i></button>
                    <button onclick="projectDelete(${i})" id="" class="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button>
                </td>
            </tr>
        `;
    }

    $('#project_table_body').html(body)
}

window.projectModal = (index = -1) => {
    $('[data-field]').html('');
    if (index > -1) {
        $('#project_modal_label').text('Update Project');
        $('#project_id').val(projects[index]['id']);
        $('#project_name').val(projects[index]['name']);
        $('#project_submit_btn').removeClass('btn-success').addClass('btn-primary').text('Save');

    } else {
        $('#project_modal_label').text('Save Project');
        $('#project_id').val('');
        $('#project_name').val('');
        $('#project_submit_btn').removeClass('btn-success').addClass('btn-primary').text('Save');
    }

    $('#project_modal').modal('show');
}

window.projectCrud = async () => {
    $('[data-field]').html('');

    let url = '/project/';
    let data = {
        project_name: $('#project_name').val(),
    }

    if ($('#project_id').val().length > 0) {
        data['project_id'] = $('#project_id').val();
        url += 'update';
    } else {
        url += 'store';
    }


    let resp = await sendRequest(url, data);
    console.log(resp)
    renderResponseMessage(resp, 'under_field_message');

    if (resp[0]) {
        if ($('#project_id').val().length > 0) {
            var index = projects.findIndex(x=> x.id == $('#project_id').val());
            if (index > -1) {
                projects[index] = resp[1];
            }
        } else {
            projects.push(resp[1]);
        }

        renderProjects()

        $('#project_modal').modal('hide');
    }
}

window.projectDelete = async (index) => {
    let url = '/project/delete';
    let data = {
        project_id: projects[index]['id'],
    }

    var resp = await sendRequest(url, data);
    if (resp[0]) {
        projects.splice(index,1);
        renderProjects();
    }
}