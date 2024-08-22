<template>
  <div>
    <button @click="sendCode">Send Verification Code</button>
  </div>
</template>
<script setup>
import api from "../services/modules"; // 引入 API 模組
import { ref } from "vue";

const email = ref("");
const verificationType = ref("Register");

const sendCode = async () => {
  try {
    // 調用 API 並傳遞 type 和 email 參數
    const response = await api.auth.sendVerificationCode(
      verificationType.value,
      email.value
    );
    console.log("Verification code sent successfully:", response.data);
  } catch (error) {
    console.error("Failed to send verification code:", error);
  }
};
</script>
