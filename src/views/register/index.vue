<template>
  <div class="winnie-bg-dark">
    <div class="register-container d-flex mx-auto">
      <!-- 返回按鈕 -->
      <div class="position-absolute winnie-back-btn">
        <a href="#" class="mb-3">
          <font-awesome-icon
            style="color: #bbb"
            icon="fa-solid fa-arrow-left"
          />
        </a>
      </div>
      <FormSide>
        <AuthForm
          title="Register"
          :buttonText="buttonText"
          :totalSteps="4"
          :currentStep="currentStep"
          @update:currentStep="handleStepChange"
          @goToLogin="returnToLogin"
        >
          <!-- 步驟 1: Email 和推薦碼 -->
          <template v-slot:email-input v-if="currentStep === 1">
            <div id="emailInputContainerRegister" class="form-floating mb-3">
              <input
                v-model="email"
                type="email"
                class="form-control"
                id="floatingInputEmailRegister"
                placeholder="Email"
              />
              <label for="floatingInput">Email</label>
            </div>
            <div id="referralCodeInput" class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInputReferralCode"
                placeholder="Referral code (optional)"
                v-model="referralCode"
              />
              <label for="floatingInput">Referral code (optional)</label>
            </div>
          </template>

          <!-- 步驟 1: 插入隱私政策或提醒內容 -->
          <template v-slot:extra-content v-if="currentStep === 1">
            <div id="termsRemind" class="terms-remind mt-5 mb-3">
              <p class="fs-6">
                By creating an account, I agree to Binance's <a
                  href="../terms-of-service"
                  >Terms of Service</a
                >
              </p>
            </div>
          </template>

          <!-- 步驟 2: 驗證碼 -->
          <template v-slot:extra-input v-if="currentStep === 2">
            <p>
              We've sent a verification code to your email. Please enter it
              below:
            </p>
            <input
              type="text"
              placeholder="Verification Code"
              v-model="verificationCode"
              class="input-field"
            />
          </template>

          <!-- 步驟 3: 插入設置密碼或返回首頁的鏈接 -->
          <template v-slot:extra-action>
            <div
              id="logInLink"
              class="text-center winnie-log-in-link position-absolute"
            >
              <p class="mb-0" v-if="currentStep === 3">
                Already have an account?
                <a @click="returnToLogin" class="fw-bold">Log In</a>
              </p>
              <p id="resendMessage" v-if="currentStep === 2" class="resend">
                Didn't receive anything? <br />
                <span
                  id="resendCode"
                  class="resend-link"
                  @click="resendCode"
                  :disabled="isTimerActive"
                >
                  Resend code
                </span>
                <span v-if="isTimerActive"> ({{ timer }}s)</span>
              </p>
            </div>
          </template>

          <!-- 步驟 3: 設置密碼 -->
          <template v-slot:extra-password v-if="currentStep === 3">
            <input
              type="password"
              placeholder="New Password"
              v-model="password"
              class="input-field"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              class="input-field"
            />
          </template>

          <!-- 步驟 4: 成功頁面 -->
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

          <!-- 插入錯誤訊息 -->
          <template v-slot:error>
            <p v-if="errorMessage" class="error-message mt-5">
              {{ errorMessage }}
            </p>
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

// 計時器狀態
const timer = ref(60);
const isTimerActive = ref(false);
let countdownInterval = null;
const errorMessage = ref("");

// 開始倒數計時
const startTimer = () => {
  isTimerActive.value = true;
  timer.value = 60;

  countdownInterval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(countdownInterval);
      isTimerActive.value = false;
    }
  }, 1000);
};

// 重新發送驗證碼
const resendCode = () => {
  if (!isTimerActive.value) {
    // 在這裡觸發重發驗證碼的邏輯
    console.log("Resend code clicked");

    // 開始新的倒數計時
    startTimer();
  }
};

// 計算當前步驟的按鈕文字
const buttonText = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Next";
    case 2:
      return "Verify Code";
    case 3:
      return "Register";
    case 4:
      return "Go to Homepage";
    default:
      return "Next";
  }
});

// 監聽 currentStep，當進入步驟 2 時自動啟動倒數計時
watch(currentStep, (newStep) => {
  if (newStep === 2) {
    startTimer();
  }
});

// 返回首頁邏輯
const returnToLogin = () => {
  router.push("/login");
};

// 步驟變更邏輯
const handleStepChange = (newStep) => {
  if (validateStep()) {
    if (currentStep.value <= 4) {
      currentStep.value = newStep;
    }
  }
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

@media (min-width: 991.98px) {
  .winnie-back-btn {
    right: 4rem;
    top: 1.75rem;
  }
}

.resend {
}
</style>
