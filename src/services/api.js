import axios from 'axios';

const api = axios.create({
    baseURL: 'http://farma-usp.herokuapp.com/',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});

export default api;
