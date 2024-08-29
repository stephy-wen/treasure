export const handleApiError = (error) => {
  if (error.response && error.response.data.message) {
    return error.response.data.message;
  } else {
    return "網絡錯誤，請稍後再試。";
  }
};
