import axios from 'axios';
const PATH = 'http://localhost:5000/api/';

export default axios.create({
    baseURL: PATH,
    headers: {
        'Content-Type': 'application/json'
    }
})