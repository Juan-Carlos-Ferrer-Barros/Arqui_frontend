import axios from 'axios';

async function sendAuthRequest(method, url, token, body) {
    try {
        const response = await axios({
            method,
            url,
            headers: {
                Authorization: `${token}`,
                // User: localStorage.getItem('userId')
            },
            data: body
        });
        return response.data;
    } catch (error) {
        console.error('Error making request:', error);
        throw error;
    }
}

export default sendAuthRequest;
