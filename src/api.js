import axios from "axios";

// Tamalin Base Url
const instance = axios.create({
  baseURL: "http://localhost:8081/v1",
  //"https://service.phopis.com/tapi/v1",
});

export default instance;
