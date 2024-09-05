// src/services/modules.js
import apiClient from "./api";

// auth module
// const response = await auth.getUserInfo(false, true); 如果我要在別的地方使用自定義參數，不用預設時
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

  changePassword: (passwordPayload) =>
    apiClient.put("/Account/ChangePassword", passwordPayload),

  sendVerificationCode: (verificationType, email) =>
    apiClient.post("/Account/SendVerificationCode", {
      verificationType,
      email,
    }),

  sendAuthCode: (verificationType) =>
    apiClient.post("/Account/SendAuthCode", {
      verificationType,
    }),

  checkVerificationCode: (verificationType, email, code) =>
    apiClient.post("/Account/CheckVerificationCode", {
      verificationType,
      email,
      code,
    }),

  forgotPasswordChange: (email, newPassword, code) =>
    apiClient.post("/Account/ForgotPasswordChange", {
      email,
      newPassword,
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
  getGameRoomList: () => apiClient.get("/Game/GameRoomList"),
  getGameRoom: (roomId) =>
    apiClient.get("/Game/GameRoom", {
      params: {
        gameRoomId: roomId,
      },
    }),
  searchRoom: (name) =>
    apiClient.get("/Game/GameRoomByName", {
      params: {
        name,
      },
    }),
};

// 統一導出模組
export default {
  auth,
  account,
  game,
  userInfo,
};
