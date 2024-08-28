<template>
  <div class="winnie-bg-dark">
    <div class="register-container d-flex mx-auto">
      <FormSide>
        <!-- 返回按鈕 -->
        <div class="position-absolute winnie-back-btn">
          <button @click="goBack" class="arrow mb-3">
            <font-awesome-icon icon="fa-solid fa-arrow-left fs-4" />
          </button>
        </div>
        <!-- 返回按鈕 -->
        <AuthForm
          title="Login"
          :buttonText="buttonText"
          :totalSteps="2"
          :currentStep="currentStep"
          @update:currentStep="handleStepChange"
        >
          <!-- 步驟 1: Email 和推薦碼 -->
          <template v-slot:email-input v-if="currentStep === 1">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInputEmailReset"
                placeholder="Email"
              />
              <label for="floatingInputEmailReset">Email</label>
            </div>
          </template>

          <!-- 步驟 1: 插入設置密碼或返回首頁的鏈接 -->
          <template
            v-slot:extra-action
            v-if="currentStep === 1 || currentStep === 2"
          >
            <div class="d-flex justify-content-between mb-3">
              <router-link to="/forgot-password" class="winnie-forget-pw-link"
                >Forgot your password?
              </router-link>
            </div>
            <div class="text-center winnie-sign-up-link position-absolute">
              <p class="mb-0">
                Don't have an account?
                <router-link to="/register" class="fw-bold"
                  >Sign up
                </router-link>
              </p>
            </div>
          </template>

          <!-- 步驟 4: 設置密碼 -->
          <template v-slot:extra-password v-if="currentStep === 2">
            <input
              type="password"
              placeholder="New Password"
              v-model="password"
              class="input-field"
            />
          </template>
        </AuthForm>
      </FormSide>
      <ImageSide />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

import AuthForm from "@/components/AuthForm/AuthForm.vue";
import FormSide from "@/components/FormSide.vue";
import ImageSide from "@/components/ImageSide.vue";
const router = useRouter();

// 定義步驟狀態
const currentStep = ref(1);

const email = ref("");
const referralCode = ref("");
const verificationCode = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorMessage = ref("");

// 計算當前步驟的按鈕文字
const buttonText = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Next";
    case 2:
      return "Login";
    default:
      return "Next";
  }
});

// 返回上一頁的函數
const goBack = () => {
  if (currentStep.value === 1) {
    router.go(-1);
  } else if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};
// 返回首頁邏輯
const returnToLogin = () => {
  router.push("/login");
};

// 步驟變更邏輯
const handleStepChange = (newStep) => {
  // if (validateStep()) {
  //   if (currentStep.value <= 4) {
  //     currentStep.value = newStep;
  //   }
  // }
  currentStep.value = newStep;
};

// 表單驗證函數
const validateStep = () => {
  if (currentStep.value === 1 && !validateEmail(email.value)) {
    errorMessage.value = "Invalid email format.";
    console.log("Email format is invalid");
    return false;
  }
  if (currentStep.value === 3 && !validatePassword(password.value)) {
    errorMessage.value = "Password must be at least 6 characters.";
    console.log("Password is invalid");
    return false;
  }
  errorMessage.value = ""; // 驗證通過時清空錯誤消息
  return true;
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePassword = (password) => password.length >= 6;
</script>

<style scoped>
.error-message {
  color: red;
}
.winnie-bg-dark {
  background-color: #181a20;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 20px;
}
@media (max-width: 991px) {
  .winnie-bg-dark {
    padding: 0px;
    height: 100%;
  }
}

.register-container {
  background: linear-gradient(
    to left,
    transparent 0%,
    transparent 25%,
    #f8f8f8 50%,
    #f8f8f8 75%,
    #f8f8f8 100%
  );
  overflow: hidden;
  position: relative;
  max-width: 1200px;
  border-radius: 30px;
}

@media (max-width: 991px) {
  .register-container {
    flex-direction: row;
    height: 100%;
    justify-content: center;
    border-radius: 0px;
    width: 100%;
    background-color: #f8f8f8;
  }
}

.winnie-back-btn {
  top: 2rem;
}

.arrow {
  border: none;
  background: transparent;
  font-size: x-large;
  color: #bbb;
}
</style>
