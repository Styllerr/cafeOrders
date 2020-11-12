import axios from 'axios';
const PATH = 'http://localhost:5000/api/';

console.log(PATH);

export default axios.create({
    baseURL: PATH,
    headers: {
        'Content-Type': 'application/json'
    }
})