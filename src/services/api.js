import axios from "axios";

const api = axios.create({
  baseURL: "https://farma-usp.herokuapp.com",
});

export const API_AUTH_BASEURL = "https://farma-usp.herokuapp.com/api/v1/usuarios/auth";
export const FRONT_BASEURL = "https://frontbd.vercel.app";
export default api;
