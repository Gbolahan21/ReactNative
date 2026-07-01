import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.3:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;