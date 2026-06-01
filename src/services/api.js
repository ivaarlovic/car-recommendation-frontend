import axios from "axios";

const api = axios.create({
  baseURL: "https://car-recommendation-app-backend.onrender.com/api",
});

export default api;
