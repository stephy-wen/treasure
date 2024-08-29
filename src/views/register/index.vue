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
          @goToLogin="returnToLogin"
          :handleButtonClick="handleButtonClick"
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
                <button
                  id="resendCode"
                  class="resend-link"
                  @click="resendCode"
                  :disabled="isTimerActive"
                >
                  Resend code
                </button>
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
              <pre>{{ errorMessage }}</pre>

            </p>
          </template>
        </AuthForm>
      </FormSide>
      <ImageSide />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

import AuthForm from "@/components/AuthForm/AuthForm.vue";
import FormSide from "@/components/FormSide.vue";
import ImageSide from "@/components/ImageSide.vue";
import modules from "@/services/modules.js"; // import API module
import { handleApiError } from "@/utils/errorHandler.js";

// const { sendVerificationCode } = modules.account;
const {
  account: { sendVerificationCode, CheckVerificationCode, register },
} = modules;

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
const verificationType = "Register"; // 驗證類型，例如 "emailVerification"
const testEmail = "nalsonlionmedia+16@gmail.com";
const verificationError = ref(null);

// 針對不同步驟的處理邏輯
const handleButtonClick = () => {
  if (!validateStep()) return; // 驗證失敗 終止後續操作

  if (currentStep.value === 1) {
    sendVerificationEmail(); // 點下一步之後可以發驗證信
  } else if (currentStep.value === 2) {
    verifyCode(); //驗證 驗證碼
  } else if (currentStep.value === 3) {
    registerAccount();
  } else {
    returnToLogin();
  }
};

// 發驗證信
const sendVerificationEmail = async () => {
  try {
    const response = await sendVerificationCode(verificationType, email.value); //這邊到時候測試完要改掉
    console.log(response, "驗證信已發送");
    // 如果成功 就到下一步
    if (response.data.success) {
      handleStepChange(currentStep.value + 1);
      errorMessage.value = "";
    }
  } catch (error) {
    errorMessage.value = handleApiError(error);

    console.error("發送驗證信失敗", error);
  }
};

// 驗證驗證碼
const verifyCode = async () => {
  // isTimerActive.value = false; // 發驗證信的按鈕
  // isVerifying.value = true; // 驗證碼按鈕
  verificationError.value = null;

  try {
    const response = await CheckVerificationCode(
      verificationType,
      email.value,
      verificationCode.value
    );
    console.log(response, "拿到的驗證資料");
    if (response.data.success) {
      console.log("驗證成功");
      // 跳轉到下一步或其他處理
      handleStepChange(currentStep.value + 1); //成功的話跳轉下一步
      errorMessage.value = "";
    }
  } catch (error) {
    // 檢查錯誤響應中是否有 systemCode
    errorMessage.value = handleApiError(error);
    console.error("驗證失敗", error);
  } finally {
    // isVerifying.value = false;
  }
};

// 重新發送驗證碼
const resendCode = async () => {
  if (!isTimerActive.value) {
    // 在這裡觸發重發驗證碼的邏輯
    console.log("Resend code clicked");
    await sendVerificationEmail();
    // 開始新的倒數計時
    startTimer();
  }
};

// 監聽 currentStep，當進入步驟 2 時自動啟動倒數計時
watch(currentStep, (newStep) => {
  if (newStep === 2) {
    startTimer();
  }
});

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

// 註冊函數
const registerAccount = async () => {
  try {
    // 構建註冊請求的資料
    const userData = {
      email: email.value, // 使用者 Email
      password: password.value, // 密碼
      code: verificationCode.value, // 驗證碼
      refererId: referralCode.value || null, // 推薦碼（可選）
    };

    // 發送註冊請求
    const response = await register(userData);
    if (response.data.success) {
      handleStepChange(currentStep.value + 1);
      errorMessage.value = "";
    }
    console.log("註冊成功", response.data);

    // 根據需求進行下一步處理（例如跳轉頁面或顯示成功訊息）
  } catch (error) {
    console.error("註冊失敗", error.response ? error.response.data : error);
    // 處理錯誤（例如顯示錯誤訊息給使用者）
    errorMessage.value = handleApiError(error);
  }
};

// 返回首頁邏輯
const returnToLogin = () => {
  router.push("/login");
};

// 步驟變更邏輯
const handleStepChange = (newStep) => {
  if (currentStep.value <= 4) {
    currentStep.value = newStep;
  }
};

// 表單驗證函數
const validateStep = () => {
  if (currentStep.value === 1 && !validateEmail(email.value)) {
    errorMessage.value = "Invalid email format.";
    console.log("Email format is invalid");
    return false;
  }
  if (currentStep.value === 3 && !validatePasswords(password.value)) {
    console.log("密碼驗證");
    return false;
  }
  errorMessage.value = ""; // 驗證通過時清空錯誤消息
  return true;
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePasswords = () => {
  const errors = [];
  if (password.value !== confirmPassword.value) {
    errors.push(
      "Password and Confirm password are different. Please re-enter it."
    );
  }

const rules = [
  { regex: /.{8,}/, message: "Password must be at least 8 characters long." },
  { regex: /[0-9]/, message: "Password must contain at least one number." },
  { regex: /[a-z]/, message: "Password must contain at least one lowercase letter." },
  { regex: /[A-Z]/, message: "Password must contain at least one uppercase letter." },
];

  for (const rule of rules) {
    if (!rule.regex.test(password.value)) {
      errors.push(`Password: ${rule.message}`);
    }
  }

  for (const rule of rules) {
    if (!rule.regex.test(confirmPassword.value)) {
      errors.push(`Confirm Password: ${rule.message}`);
    }
  }

  if (errors.length > 0) {
    errorMessage.value = errors.join('\n');
    return false;
  }

  errorMessage.value = "";
  return true;
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
