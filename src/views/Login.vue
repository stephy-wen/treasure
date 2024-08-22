<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email</label>
        <input v-model="email" id="email" type="email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input v-model="password" id="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import api from "../services/modules"; // 導入 API modules
import { ref } from "vue";
import { login } from "../services/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const handleLogin = async () => {
  const loginData = {
    email: email.value,
    password: password.value,
  };
  try {
    const data = await login(loginData);
    // 將 token 設置到 localStorage
    localStorage.setItem("token", data.data);
    await api.auth.getUserInfo(); // 獲取用戶信息
    // router.push("/game/game-list"); // 登入成功後跳轉到 遊戲頁面
    router.push("/"); // 登入成功後跳轉到 /
  } catch (error) {
    errorMessage.value = "Login failed. Please check your credentials.";
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
button {
  padding: 0.5rem 1rem;
}
</style>
