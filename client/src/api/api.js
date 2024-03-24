import axios from "axios";

const api = axios.create({
  // baseURL: "https://jmarkdev.com.tarakabataan.com",
  baseURL: "http://localhost:5000",
});

export default api;
