// src/utils/api.js
import axios from "axios";
import { getToken, setToken, removeToken } from "./auth";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  if (res.data.token) setToken(res.data.token);
  return res.data;
};

export const signup = async (userData) => {
  const res = await api.post("/auth/signup", userData);
  if (res.data.token) setToken(res.data.token);
  return res.data;
};

export default api;
