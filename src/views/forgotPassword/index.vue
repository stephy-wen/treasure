<template>
  <div class="winnie-bg-dark">
    <div class="reset-password-container d-flex mx-auto">
      <FormSide class="text-center">
        <!-- 返回按鈕 -->
        <div class="position-absolute winnie-back-btn">
          <button @click="goBack" class="arrow mb-3">
            <font-awesome-icon icon="fa-solid fa-arrow-left fs-4" />
          </button>
        </div>
        <!-- 返回按鈕 -->
        <AuthForm
          :title="formTitle"
          :buttonText="buttonText"
          :totalSteps="5"
          :currentStep="currentStep"
          @goToLogin="returnToLogin"
          :handleButtonClick="handleButtonClick"
          :isButtonDisabled="isButtonDisabled"
        >
          <!-- 步驟 1: Email 和推薦碼 -->
          <template v-slot:email-input v-if="currentStep === 1">
            <div class="form-floating mb-3">
              <input
                v-model="email"
                id="floatingInputEmailReset"
                class="form-control"
                type="email"
                placeholder="Email"
              />
              <label for="floatingInputEmailReset">Email</label>
            </div>
          </template>

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
            <p v-if="currentStep === 3">
              Complete the puzzle to verify you're not a robot.
            </p>
          </template>

          <!-- 步驟 1: 插入設置密碼或返回首頁的鏈接 -->
          <template v-slot:extra-action>
            <router-link
              v-if="currentStep === 1 || currentStep === 4"
              to="login"
              class="text-decoration-underline winnie-reset-password-link"
              >Return to login
            </router-link>

            <p id="resendMessage" v-if="currentStep === 2" class="resend mt-2">
              Didn't receive anything? <br />
              <button
                id="resendCode"
                class="resend-link px-0"
                @click="resendCode"
                :disabled="isTimerActive"
              >
                Resend code
              </button>
              <span v-if="isTimerActive"> ({{ timer }}s)</span>
            </p>
          </template>

          <!-- 步驟 2: 驗證碼 -->
          <template v-slot:extra-input v-if="currentStep === 2">
            <p class="mb-5" style="color: #75797e">
              We've sent a code to <span id="userEmail"></span>. Please enter it
              within 30 minutes.
            </p>
            <input
              v-model="verificationCode"
              class="input-field"
              type="text"
              placeholder="Verification Code"
            />
          </template>

          <!-- 步驟 4: 設置密碼 -->
          <template v-slot:extra-password v-if="currentStep === 4">
            <input
              v-model="password"
              class="input-field"
              type="password"
              placeholder="New Password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              class="input-field"
            />
          </template>

          <!-- 步驟 5: 成功頁面 -->
          <template v-slot:extra-final v-if="currentStep === 5">
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
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

import AuthForm from "@/components/AuthForm/AuthForm.vue";
import FormSide from "@/components/FormSide.vue";
import ImageSide from "@/components/ImageSide.vue";
import modules from "@/services/modules.js"; // import API module
import { handleApiError } from "@/utils/errorHandler.js";

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

const isButtonDisabled = ref(false);

// 針對不同步驟的處理邏輯
const handleButtonClick = () => {
  //if (!validateStep()) return; // 驗證失敗 終止後續操作
  handleStepChange(currentStep.value + 1);
  // isButtonDisabled.value = true; // 禁用按鈕

  // if (currentStep.value === 1) {
  //   sendVerificationEmail(); // 點下一步之後可以發驗證信
  // } else if (currentStep.value === 2) {
  //   verifyCode(); //驗證 驗證碼
  // } else if (currentStep.value === 3) {
  //   registerAccount();
  // } else {
  //   returnToLogin();
  // }
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
  } finally {
    isButtonDisabled.value = false;
  }
};

// 驗證驗證碼
const verifyCode = async () => {
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
    isButtonDisabled.value = false;
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
  } finally {
    isButtonDisabled.value = false;
  }
};

// 返回首頁邏輯
const returnToLogin = () => {
  router.push("/login");
};

// 返回上一頁的函數
const goBack = () => {
  if (currentStep.value === 1) {
    router.go(-1);
  } else if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
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
    {
      regex: /[a-z]/,
      message: "Password must contain at least one lowercase letter.",
    },
    {
      regex: /[A-Z]/,
      message: "Password must contain at least one uppercase letter.",
    },
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
    errorMessage.value = errors.join("\n");
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
      return "Next";
    case 3:
      return "Next";
    case 4:
      return "Confirm";
    default:
      return "Next";
  }
});

// 動態設置標題
const formTitle = computed(() => {
  if (currentStep.value === 1) {
    return "Reset Password";
  } else if (currentStep.value === 2) {
    return "Enter Verification";
  } else if (currentStep.value === 3) {
    return "Puzzle Verification";
  } else if (currentStep.value === 4) {
    return "Reset Password";
  } else if (currentStep.value === 4) {
    return "";
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
@media (min-width: 991px) and (max-width: 1199.98px) {
  .winnie-back-btn {
    top: 1rem;
  }
}

.arrow {
  border: none;
  background: transparent;
  font-size: x-large;
  color: #bbb;
  padding: 0px;
}

.winnie-bg-dark .form-control {
  border: none;
  border-bottom: 1px solid #bbbbbb;
  background-color: transparent !important;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.3s ease;
}

.winnie-bg-dark .form-control:focus {
  border-bottom: 1px solid #181a20;
  outline: none;
}

.winnie-bg-dark .form-floating label {
  background-color: transparent;
  color: #bbb;
}

.form-floating > input + label:after {
  background-color: transparent !important;
}

.reset-password-container {
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

.register-password-img {
  flex: 2;
}

.winnie-bg-dark .reset-password-container .winnie-reset-password-btn {
  background-color: #181a20;
  color: #f8f8f8;
}

.winnie-bg-dark .reset-password-container .winnie-log-in-link {
  color: #181a20;
  transition: color 0.3s ease;
  bottom: 2rem;
  left: 0;
  right: 0;
}

.winnie-bg-dark .reset-password-container .winnie-reset-password-link {
  color: #181a20;
}

.winnie-bg-dark .reset-password-container .winnie-reset-password-link:hover {
  color: #fcd535;
}

.winnie-bg-dark .reset-password-container .winnie-forget-pw-link {
  color: #181a20;
}

.winnie-bg-dark .reset-password-form .winnie-back-btn {
  top: 2rem;
}

.winnie-bg-dark .reset-password-form .terms-remind p {
  color: #181a20;
}

.winnie-bg-dark .reset-password-form .terms-remind p a {
  color: #181a20;
  text-decoration: underline;
}

@media (max-width: 991px) {
  .reset-password-container {
    flex-direction: row;
    height: 100%;
    justify-content: center;
    border-radius: 0px;
    width: 100%;
    background-color: #f8f8f8;
  }

  .reset-password-form {
    width: 100%;
    padding: 15px;
  }
}

button.arrow {
  border: none;
  background-color: transparent;
  color: #bbb;
}

button.arrow:hover {
  color: #1e2329;
}
</style>
