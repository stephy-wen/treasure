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
import { useUserStore } from "../stores/user"; // 引入 Pinia Store

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const router = useRouter();

const userStore = useUserStore(); // 使用 Pinia Store

const handleLogin = async () => {
  const loginData = {
    email: email.value,
    password: password.value,
  };

  try {
    await userStore.loginUser(loginData);
    await userStore.fetchUserInfo(); // 登入成功後從 API 獲取使用者資訊並存到 Pinia
    // 如果登入壞掉就是這兩隻api 其中一支有問題 先註解其一

    // const UserInfo = await api.auth.getUserInfo(); // 獲取用戶信息
    // console.log(UserInfo.data.data, "userData");
    // userInfoData.value = UserInfo.data.data;
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
