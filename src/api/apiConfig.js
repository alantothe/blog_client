import axios from "axios";

const apiUrl = "https://alanblog-f3da64d0f879.herokuapp.com/api";

const api = axios.create({
  baseURL: apiUrl,
});

export default api;
