<template>
  <div class="winnie-bg-dark">
    <div class="register-container d-flex mx-auto">
      <FormSide class="position-relative">
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
          :totalSteps="4"
          :currentStep="currentStep"
          @goToLogin="returnToLogin"
          :handleButtonClick="handleButtonClick"
          :isButtonDisabled="isButtonDisabled"
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
                @keydown.enter.prevent="handleButtonClick"
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
                @keydown.enter.prevent="handleButtonClick"
              />
              <label for="floatingInput">Referral code (optional)</label>
            </div>
          </template>

          <!-- 步驟 1: 插入隱私政策或提醒內容 -->
          <template v-slot:extra-content v-if="currentStep === 1">
            <div id="termsRemind" class="terms-remind mt-5 mb-3">
              <p class="fs-6">
                By using this site, you agree to the <a
                  href="/terms-of-service"
                  >Terms of Service</a
                >.
              </p>
            </div>
          </template>

          <!-- 步驟 2: 驗證碼 -->
          <template v-slot:extra-input v-if="currentStep === 2">
            <p class="verificationMessage">
              We've sent a verification code to your email. Please enter it
              below within 30 minutes.
            </p>
            <input
              type="text"
              class="input-field verification-code-input my-3 w-100"
              placeholder="Verification Code"
              v-model="verificationCode"
              @keydown.enter.prevent="handleButtonClick"
            />
          </template>

          <!-- 步驟 3: 插入設置密碼或返回首頁的鏈接 -->
          <template v-slot:extra-action>
            <div
              id="logInLink"
              class="text-start winnie-log-in-link position-absolute"
            >
              <p class="mb-0" v-if="currentStep === 1 || currentStep === 3">
                Already have an account?
                <a @click="returnToLogin" class="fw-bold">Log In</a>
              </p>
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
            </div>
          </template>

          <!-- 步驟 3: 設置密碼 -->
          <template v-slot:extra-password v-if="currentStep === 3">
            <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control input-field"
              placeholder="New Password"
              v-model="password"
              @keydown.enter.prevent="handleButtonClick"
            />
            <label for="floatingInput">Password</label>
            </div>
            <div class="form-floating mb-3">
            <input
              type="password"
              placeholder="Confirm Password"
              class="form-control input-field"
              v-model="confirmPassword"
              @keydown.enter.prevent="handleButtonClick"
            />
            <label for="floatingInput">Confirm Password</label>
            </div>
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
            <p v-if="errorMessage" class="error-message d-flex align-items-center">
              <img src="@/assets/images/icon/antOutline-close 1.svg" class="me-2" style="width: 14px;" alt="">
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
import { useRouter, useRoute } from "vue-router";

import AuthForm from "@/components/AuthForm/AuthForm.vue";
import FormSide from "@/components/FormSide.vue";
import ImageSide from "@/components/ImageSide.vue";
import modules from "@/services/modules.js"; // import API module
import { handleApiError } from "@/utils/errorHandler.js";

// const { sendVerificationCode } = modules.account;
const {
  account: { sendVerificationCode, checkVerificationCode, register },
} = modules;

const router = useRouter();
const route = useRoute();

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
const verificationType = "Register";
const testEmail = "nalsonlionmedia+16@gmail.com";


const isButtonDisabled = ref(false);


// 動態設置標題
const formTitle = computed(() => {
  if (currentStep.value === 1) {
    return "Register";
  } else if (currentStep.value === 2) {
    return "Email Verification";
  } else if (currentStep.value === 3) {
    return "Create Password";
  }
});


// 針對不同步驟的處理邏輯
const handleButtonClick = async () => {
  errorMessage.value = ""; // 驗證通過時清空錯誤消息

  if (!validateStep()) return; // 驗證失敗 終止後續操作

  isButtonDisabled.value = true; // 禁用按鈕

  if (currentStep.value === 1) {
    sendVerificationEmail(); // 點下一步之後可以發驗證信
  } else if (currentStep.value === 2) {
    const hasVerifyCode = await verifyCode(); // 驗證驗證碼
    if (!hasVerifyCode) return; // 如果驗證碼驗證失敗，則停止
  } else if (currentStep.value === 3) {
    registerAccount();
  } else {
    returnToLogin();
  }
};

// 發驗證信
const sendVerificationEmail = async (shouldChangeStep = true) => {
  try {
    const response = await sendVerificationCode(verificationType, email.value);
    console.log(response, "驗證信已發送");
    // 如果成功 就到下一步
    if (response.data.success) {
      if (shouldChangeStep) {  // 檢查是否應該改變步驟
        handleStepChange(currentStep.value + 1);
      }
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
  if (!verificationCode.value) {
    errorMessage.value = "請輸入驗證碼";
    isButtonDisabled.value = false;
    return false; // 驗證碼為空，返回 false
  }

  try {
    const response = await checkVerificationCode(
      verificationType,
      email.value,
      verificationCode.value
    );
  
    if (response.data.success) {
      // 跳轉到下一步或其他處理
      handleStepChange(currentStep.value + 1); //成功的話跳轉下一步
      errorMessage.value = "";
      return true;
    }
  } catch (error) {
    // 檢查錯誤響應中是否有 systemCode
    if (error.response && error.response.data.systemCode === 2005) {
      errorMessage.value = "驗證碼不正確";
    } else {
      errorMessage.value = "伺服器發生錯誤，請稍後再試。";
    }
    return false; // 驗證失敗
  } finally {
    isButtonDisabled.value = false;
  }
};

// 重新發送驗證碼
const resendCode = async () => {
  if (!isTimerActive.value) {
    // 在這裡觸發重發驗證碼的邏輯
    console.log("Resend code clicked");
    await sendVerificationEmail(false); // 傳遞 `false` 避免步驟跳轉
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
  } catch (error) {
    if (error.response && error.response.data.message === "Account is not Exist") {
      errorMessage.value = "推薦碼錯誤";
      return
    }
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
  errorMessage.value = "";
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
    return false;
  }
// 針對第三步的驗證
  if (currentStep.value === 3) {
    // 如果密碼為空
    if (!password.value) {
      errorMessage.value = "密碼不得為空";
      return false;
    }

    // 密碼格式不符合規範
    if (!validatePasswords()) {
      return false;
    }
  }

  return true;
};

const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validatePasswords = () => {
  const errors = [];
  if (password.value !== confirmPassword.value) {
    errors.push(
      "Password and Confirm password are different. Please re-enter it"
    );
  }

  const rules = [
    { regex: /.{8,}/, message: "Password must be at least 8 characters long" },
    { regex: /[0-9]/, message: "Password must contain at least one number" },
    { regex: /[a-z]/, message: "Password must contain at least one lowercase letter" },
    { regex: /[A-Z]/, message: "Password must contain at least one uppercase letter" },
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

  return true;
};

// 計算當前步驟的按鈕文字
const buttonText = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Next";
    case 2:
      return "Verify";
    case 3:
      return "Register";
    case 4:
      return "Go to Homepage";
    default:
      return "Next";
  }
});

const props = defineProps({
  referralCode: String
});

// 在註冊頁加載時自動檢查 URL 是否有推薦碼
onMounted(() => {
  referralCode.value = props.referralCode
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

.winnie-bg-dark .form-control {
  border: none;
  border-bottom: 1px solid #BBBBBB; 
  background-color: transparent !important;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.3s ease;
}

.winnie-bg-dark .form-control:focus {
  border-bottom: 1px solid #181A20;
  outline: none;
}

.winnie-bg-dark .form-floating label {
  background-color: transparent;
  color: #BBB;
}

.form-floating > input + label:after {
  background-color: transparent !important;
}

.arrow {
  color: #BBB;
}

.arrow:hover {
  color: #1E2329;
}

.verificationMessage {
  color: #75797E;
}

button.resend-link {
  border: none;
  background-color: transparent;
  font-weight: 600;
}

button.resend-link:disabled {
  cursor: not-allowed;
  font-weight: 500;
}

button.resend-link:disabled:hover {
  color: #1010104D;
}

button.resend-link:hover {
  color: #FCD535;
  cursor: pointer;
}

.verification-code-input {
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #BBB;
  background-color: transparent;
  outline: none;
  box-shadow: none;
}

.verification-code-input::placeholder {
  color: #BBB;
}

.winnie-bg-dark .terms-remind p a{
    color: #181A20;
    text-decoration: underline;
}

.winnie-log-in-link a {
  color: #181A20;
}

.winnie-log-in-link a:hover {
  color: #FCD535;
  cursor: pointer;
}

button.arrow {
  border: none;
  background-color: transparent;
  color: #BBB;
}

button.arrow:hover {
  color: #1E2329;
}

.error-message {
  color: #F63E3D;
}

pre {
  font-family: "Inter", sans-serif !important;
  font-size: 16px;
  margin-bottom: 0px;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
  background-color: transparent !important;
  box-shadow: 0 0 0px 1000px #f8f8f8 inset !important;
  -webkit-box-shadow: 0 0 0px 1000px #F8F8F8 inset !important;
  -webkit-text-fill-color: #000 !important;
}
</style>
