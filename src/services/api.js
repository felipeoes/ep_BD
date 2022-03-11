import axios from "axios";

export const FRONT_BASEURL = "http://localhost:3000";

const USER = process.env.REACT_APP_API_USER;
const PASS = process.env.REACT_APP_API_PASS;
const token = Buffer.from(`${USER}:${PASS}`, "utf8").toString("base64");

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    Authorization: `Basic ${token}`,
  },
});

export const apiAuth = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/usuarios/auth",
});

export default api;
