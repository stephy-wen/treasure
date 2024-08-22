// src/services/modules.js
import apiClient from "./api";

// 認證模組
const auth = {
  getUserInfo: (withGamePlayData = true, withRewardData = true) =>
    apiClient.get("/Account/AccountInfo", {
      params: {
        withGamePlayData,
        withRewardData,
      },
    }),
};

// 帳戶模組
const account = {
  register: (userData) => apiClient.post("/Account/Register", userData),
  sendVerificationCode: (verificationType, email) =>
    apiClient.post("/Account/SendVerificationCode", {
      verificationType,
      email,
    }), // 發送註冊驗證信
};

// 使用者模組
const userInfo = {
  changeNickname: (name) => apiClient.post("/Account/ChangeNickname", { name }), // 變更暱稱
  getAvatarList: () => apiClient.get("/Account/AvatarList"), // 取得頭像列表
};

// 遊戲模組
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
