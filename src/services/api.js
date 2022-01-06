import axios from 'axios';

const api = axios.create({
    baseURL: 'https://farma-usp.herokuapp.com/'
});

export default api;
