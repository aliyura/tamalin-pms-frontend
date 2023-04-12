import axios from "axios";

// Tamalin Base Url
const instance = axios.create({
  baseURL: "http://localhost:8082/v1",
});

export default instance;
