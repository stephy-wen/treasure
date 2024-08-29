// src/stores/user.js
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "../services/modules"; // 引入 API 模組
import { login } from "../services/auth";

export const useUserStore = defineStore("user", () => {
  // 定義狀態 state
  const token = ref(localStorage.getItem("token") || "");
  const userInfo = ref(null);
  const errorMessage = ref("");

  // 判斷是否已登入
  const isLoggedIn = computed(() => !!token.value);

  // 定義 actions
  const loginUser = async (loginData) => {
    try {
      const response = await login(loginData);
      token.value = response.data; // 將 token 儲存到狀態
      localStorage.setItem("token", token.value); // 同時儲存到 localStorage
    } catch (error) {
      token.value = ""; // 登入失敗時清除 token
      localStorage.removeItem("token"); // 確保 localStorage 中的 token 被清除
      if (error.response && error.response.data.systemCode) {
        if ((error.response.data.systemCode = 4001)) {
          errorMessage.value = "Incorrect email or password";
        } else {
          errorMessage.value = error.response.data.message;
        }
      }
    }
  };

  // 定義 actions，用來從 API 獲取用戶信息
  const fetchUserInfo = async () => {
    try {
      const response = await api.auth.getUserInfo();
      userInfo.value = response.data.data;
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  // 定義actions，登出
  const logoutUser = () => {
    token.value = "";
    userInfo.value = null;
    localStorage.removeItem("token"); // 清理本地存儲中的 token
  };

  // 返回 state 和 actions
  return {
    token,
    userInfo,
    isLoggedIn, // 用來判斷是否登入
    loginUser,
    fetchUserInfo,
    logoutUser,
    errorMessage,
  };
});
