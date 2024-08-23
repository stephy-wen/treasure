<template>
  <div class="login-buttons">
    <button
      :class="['btn btn-outline-primary me-1 me-xl-2', loginButtonClass]"
      type="button"
      @click="login"
    >
      Log In
    </button>
    <button
      :class="['btn btn-outline-primary me-1 me-xl-2', signupButtonClass]"
      type="button"
      @click="signup"
    >
      Sign Up
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps({
  loginButtonClass: {
    type: String,
  },
  signupButtonClass: {
    type: String,
  },
});

// define
const emit = defineEmits(["login", "signup"]);

// send
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
