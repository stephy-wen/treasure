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
          title="Change login password"
          :buttonText="buttonText"
          :totalSteps="4"
          :currentStep="currentStep"
          @update:currentStep="handleStepChange"
          @goToLogin="returnToLogin"
        >
          <!-- 步驟 1: 插入隱私政策或提醒內容 -->
          <template v-slot:extra-content>
            <p
              v-if="currentStep === 1"
              class="mb-5 text-start fs-6"
              style="color: #75797e"
            >
              To protect your account, you won't be able to withdraw funds or
              use P2P trading to sell crypto for 24 hours after you reset or
              change your account password.
            </p>
          </template>

          <!-- 步驟 4: 設置密碼 -->
          <template v-slot:extra-password>
            <div class="mb-3" v-if="currentStep === 1">
              <label for="inputPassword" class="form-label"
                >Current password</label
              >
              <input
                type="password"
                class="form-control"
                placeholder="Enter your current Password"
                id="managePasswordInputEmail"
                v-model="currentPassword"
              />
            </div>
            <div class="mb-3" v-if="currentStep === 2">
              <label for="inputNewPassword" class="form-label"
                >New Password</label
              >
              <input
                type="password"
                class="form-control"
                placeholder="Enter your New Password"
                id="managePasswordInputPassword"
                v-model="password"
              />
            </div>
            <div class="mb-3" v-if="currentStep === 2">
              <label for="inputConfirmNewPassword" class="form-label"
                >Confirm new password</label
              >
              <input
                type="password"
                class="form-control"
                placeholder="Enter your new password again"
                id="managePasswordInputEmail"
                v-model="confirmPassword"
              />
            </div>
          </template>

          <!-- 步驟 2: 驗證碼 -->
          <template v-slot:extra-input v-if="currentStep === 3">
            <div class="mb-3">
              <label for="inputEmailAuthentication" class="form-label"
                >Email authentication</label
              >
              <div class="d-flex align-items-center gap-1">
                <input
                  type="password"
                  class="form-control"
                  id="inputEmailAuthentication"
                  placeholder="Enter code"
                />
                <button
                  type="submit"
                  class="btn btn-send-code"
                  style="height: 38px"
                >
                  Send
                </button>
              </div>
            </div>
          </template>

          <!-- 步驟 5: 成功頁面 -->
          <template v-slot:extra-final v-if="currentStep === 4">
            <div class="text-center">
              <img
                src="../../assets/images/icon/success.svg"
                alt="Success"
                class="success-image"
              />
              <p class="success-message mt-3">
                You updated the password successfully!
              </p>
            </div>
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
const currentPassword = ref("");
const password = ref("");
const confirmPassword = ref("");

const errorMessage = ref("");

// 計算當前步驟的按鈕文字
const buttonText = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Next";
    case 2:
      return "Next";
    case 3:
      return "Next";
    case 4:
      return "Go to Homepage";
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
