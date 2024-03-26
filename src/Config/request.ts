import axios, { AxiosInstance } from "axios";
import { loadState } from "./storage";

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    if (config.url !== "/api/admin-login/") {
      const token = loadState("token");
      if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      } else {
        console.error("Token is missing!");
      }
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

export { request };
