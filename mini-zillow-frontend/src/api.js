import axios from "axios";

const api = axios.create({
  baseURL: "https://mini-zillow.onrender.com/api",
});

export default api;
