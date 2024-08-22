// src/services/api.js
import axios from "axios";

// 建立 axios 實例
const apiClient = axios.create({
  baseURL: "https://tyche-testapi.doubleplus.online/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "text/plain",
  },
});

// 設定請求攔截器（可選）
apiClient.interceptors.request.use(
  (config) => {
    // 假設需要添加 Authorization 標頭
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 設定回應攔截器（可選）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 可在這裡做全局錯誤處理
    if (error.response.status === 401) {
      // 比如跳轉到登入頁面
      window.location = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
