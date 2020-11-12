import axios from 'axios';
const PORT = process.env.PORT || 80;
const PATH = 'http://localhost/api/';

console.log(PATH);

export default axios.create({
    baseURL: PATH,
    headers: {
        'Content-Type': 'application/json'
    }
})