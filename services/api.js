import axios from "axios";

const api = axios.create({
  baseURL: "http://10.178.217.70:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;