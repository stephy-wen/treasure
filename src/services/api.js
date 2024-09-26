// src/services/api.js
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const router = useRouter();

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
      ElMessage.error({
        message: "Please log in again!",
        duration: 3000,
      });
      console.log("Token 過期或無效，請重新登入。");

      // 清除本地存儲的 token
      localStorage.removeItem("token");
      window.location.href("/login");
      // router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
