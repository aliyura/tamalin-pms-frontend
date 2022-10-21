import axios from 'axios';

// Tamalin Base Url
const instance = axios.create(
    {
        baseURL: "http://ec2-52-90-238-150.compute-1.amazonaws.com:8082/v1"
    }
);

export default instance