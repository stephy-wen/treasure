import { ElMessage } from "element-plus";

export const handleError = (error) => {
  let message = "失敗，請稍後再試。"; // 預設錯誤訊息

  const errorMessages = {
    2005: "驗證碼不正確",
    2006: "驗證碼已過期",
    2021: "推薦碼錯誤",
    4001: "請求無效，請檢查輸入資訊",
    5000: "伺服器內部錯誤，請稍後再試",
  };

  if (error.response && error.response.data.message) {
    const systemCode = error.response.data.systemCode;

    message =
      errorMessages[systemCode] || error.response.data.message || message;
    return message;
  } else {
    return "網絡錯誤，請稍後再試。";
  }
};

export const handleApiError = (error) => {
  if (error.response && error.response.data.message) {
    return error.response.data.message;
  } else {
    return "網絡錯誤，請稍後再試。";
  }
};

export const showErrorNotification = () => {
  ElMessage.error({
    message: "伺服器忙線中，請稍後再試！",
    duration: 3000,
  });
};
