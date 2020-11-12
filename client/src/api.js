import axios from 'axios';
const PATH = 'http://cafe-orders-react.herokuapp.com/api/';

export default axios.create({
    baseURL: PATH,
    headers: {
        'Content-Type': 'application/json'
    }
})