import axios from 'axios';

function sendAuthRequest(method, url, token, body) {
    axios({
        method,
        url,
        headers: {
            Authorization: `${token}`,
            // User: localStorage.getItem('userId')
        },
        data: body
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    });
}

export default sendAuthRequest;