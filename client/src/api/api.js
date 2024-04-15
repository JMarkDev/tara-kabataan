import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://jmarkdev.com.tarakabataan.com",
});

export default api;
