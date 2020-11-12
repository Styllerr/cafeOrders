import axios from 'axios';
const PORT = process.env.PORT || 80;
const PATH = 'http://localhost:' + PORT;

console.log(PATH);

export default axios.create({
    baseURL: PATH,
    headers: {
        'Content-Type': 'application/json'
    }
})