import axios from 'axios';
// const PATH = 'https://5f1b7a17254cec0016082228.mockapi.io/';
const PATH = 'http://localhost:5000/';

export default axios.create({
    baseURL: PATH,
    headers: {
        'Content-Type': 'application/json'
    }
})