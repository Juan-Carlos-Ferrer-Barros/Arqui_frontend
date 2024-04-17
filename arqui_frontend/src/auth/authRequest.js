import axios from 'axios';

function sendAuthRequest(method, url, token) {
    axios({
        method,
        url,
        headers: {
            Authorization: `Bearer ${token}`,
            // User: localStorage.getItem('userId')
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        console.error(error);
    });
}

export default sendAuthRequest;