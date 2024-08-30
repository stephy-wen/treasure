// src/services/modules.js
import apiClient from "./api";

// auth module
const auth = {
  getUserInfo: (withGamePlayData = true, withRewardData = true) =>
    apiClient.get("/Account/AccountInfo", {
      params: {
        withGamePlayData,
        withRewardData,
      },
    }),
};

// account module
// 發送註冊驗證信
const account = {
  register: (userData) => apiClient.post("/Account/Register", userData),

  sendVerificationCode: (verificationType, email) =>
    apiClient.post("/Account/SendVerificationCode", {
      verificationType,
      email,
    }),

  checkVerificationCode: (verificationType, email, code) =>
    apiClient.post("/Account/CheckVerificationCode", {
      verificationType,
      email,
      code,
    }),
};

// user module
const userInfo = {
  changeNickname: (name) => apiClient.post("/Account/ChangeNickname", { name }), // 變更暱稱
  getAvatarList: () => apiClient.get("/Account/AvatarList"), // 取得頭像列表
};

// game module
const game = {
  getGameRoomList: () => apiClient.get("/Game/GetGameRoomListResultData"),
};

// 統一導出模組
export default {
  auth,
  account,
  game,
  userInfo,
};
