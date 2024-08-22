<template>
  <div class="login-buttons">
    <button
      class="btn btn-outline-primary me-1 me-xl-2 fs-6"
      type="button"
      @click="login"
    >
      Log In
    </button>
    <button
      class="btn btn-primary me-lg-2 me-xl-5 ms-lg-2 fs-6"
      type="button"
      @click="signup"
    >
      Sign Up
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const emit = defineEmits(["login", "signup"]);

const login = () => {
  emit("login");
};

const signup = () => {
  emit("signup");
};
</script>

<style scoped>
/* 可在此處加入 LoginButtons 的樣式 */
</style>
