import axios from "axios";

const api = axios.create({
  baseURL: "https://frontbd.vercel.app/",
});

export default api;
