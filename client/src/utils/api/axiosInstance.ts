import axios from "axios";
import { clearToken } from "../store/tokenSlice";
import { toast } from "react-toastify";
import store from "../store/store";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().token.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearToken());
      toast.error("Session expired. Please log in again.");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
