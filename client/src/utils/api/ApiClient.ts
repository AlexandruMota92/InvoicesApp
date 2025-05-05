import axiosInstance from "./axiosInstance";

export const apiClient = {
  get: <T = any>(url: string, config = {}) =>
    axiosInstance.get<T>(url, config).then((res) => res.data),

  post: <T = any>(url: string, data?: any, config = {}) =>
    axiosInstance.post<T>(url, data, config).then((res) => res.data),

  put: <T = any>(url: string, data?: any, config = {}) =>
    axiosInstance.put<T>(url, data, config).then((res) => res.data),

  delete: <T = any>(url: string, config = {}) =>
    axiosInstance.delete<T>(url, config).then((res) => res.data),
};
