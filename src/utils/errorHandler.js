import { ElMessage } from "element-plus";

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
