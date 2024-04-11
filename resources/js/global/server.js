const sendRequest = async (url, data, headers = {}, request = 'post') => {
    var config = {
        'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content'),
        'Content-Type': 'application/json'
    };

    if (Object.keys(headers).length !== 0) {
        config = Object.assign(config, headers);
    }

    try {
        let response;
        if (request === 'post') {
            response = await axios.post(url, data, config);
        } else if (request === 'get') {
            response = await axios.get(url, { params: data }, config);
        }
        return response.data;
    } catch (error) {
        if (error.response) {
            // console.error('Error response:', error.response.data);
            if (error.response.data.errors) {
                return [false, error.response.data.errors];
            } else {
                return [false, 'Unknown error occurred'];
            }
        } else if (error.request) {

            // console.error('No response received:', error.request);
        } else {

            // console.error('Error message:', error.message);
        }
        return [false, 'Error occurred'];
    }
};


const renderResponseMessage = (response, alertType) => {
    if (response[0]) {
        return true;
    } else {
        var message = '';
        // console.log(Object.keys(response[1]).length)
        if (alertType == 'under_field_message') {
            for (const key in response[1]) {
                if (Object.hasOwnProperty.call(response[1], key)) {
                    message = '';

                    // Render error message for single field
                    for (let i = 0; i < response[1][key].length; i++) {
                        message += `<div>${response[1][key][i]}</div>`;
                    }

                    $(`div[data-field="${key}"]`).html(message);
                }
            }
        }
    }
}

export { sendRequest, renderResponseMessage }