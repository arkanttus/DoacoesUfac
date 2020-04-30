import axios from "axios";
import { getToken } from "./auth";

const ip = process.env.REACT_APP_HOST

const base_url = "http://" + ip + ":8000/"

const api = axios.create({
  baseURL: base_url
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `JWT ${token}`;
  }
  return config;
});

export default api;