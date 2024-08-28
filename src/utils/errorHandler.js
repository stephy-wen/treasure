export const handleApiError = (error, errorMessage) => {
  if (error.response) {
    const { systemCode } = error.response.data;
    if (systemCode === 2005) {
      errorMessage.value = "驗證碼錯誤，請重新輸入。";
    } else if (systemCode === 2006) {
      errorMessage.value = "驗證碼已過期。";
    } else if (systemCode === 2007) {
      errorMessage.value = "Email already exists";
    } else {
      errorMessage.value = "驗證失敗，請稍後再試。";
    }
  } else {
    errorMessage.value = "網絡錯誤，請稍後再試。";
  }
  console.error("API 錯誤", error);
};
