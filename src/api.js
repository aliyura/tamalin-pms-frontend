import axios from "axios";

// Tamalin Base Url
const instance = axios.create({
  baseURL: "https://service.phopis.com/tapi/v1",
});

export default instance;
