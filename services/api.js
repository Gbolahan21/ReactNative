import axios from "axios";

const api = axios.create({
  baseURL: "http://172.20.10.3:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;