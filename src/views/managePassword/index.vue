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
          :handleButtonClick="handleButtonClick"
          @goToLogin="returnToLogin"
        >

          <!-- 步驟 1: 輸入原密碼、新密碼、Email驗證 -->
          <template v-slot:extra-password v-if="currentStep === 1">
            <div class="mb-3" v-if="currentStep === 1">
              <div id="passwordInputContainer" class="mb-3">
                <label for="inputPassword" class="form-label"
                  >Current password</label
                >
                <input
                  type="password"
                  class="form-control"
                  placeholder="Enter your current Password"
                  id="managePasswordCurrentPassword"
                  v-model="currentPassword"
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="inputNewPassword" class="form-label"
                >New Password</label
              >
              <input
                type="password"
                class="form-control"
                placeholder="Enter your New Password"
                id="managePasswordNewPassword"
                v-model="newPassword"
              />
            </div>
            <div class="mb-3">
              <label for="inputConfirmNewPassword" class="form-label"
                >Confirm new password</label
              >
              <input
                type="password"
                class="form-control"
                placeholder="Enter your new password again"
                id="managePasswordConfirmPassword"
                v-model="confirmPassword"
              />
            </div>
            <div class="mb-3">
              <label for="inputEmailAuthentication" class="form-label"
                >Email authentication</label
              >
              <div class="d-flex align-items-center gap-1">
                <input
                  type="password"
                  class="form-control"
                  id="inputEmailAuthentication"
                  v-model="verificationCode"
                  placeholder="Enter code"
                />
                <button
                  type="button"
                  class="btn btn-send-code"
                  style="height: 38px"
                  @click="sendVerificationEmail"
                >
                  Send
                </button>
                <!-- 測試 -->
                <p v-if="!isTimerActive" class="mt-2">
                <button
                  type="button"
                  class="btn btn-resend-code"
                  @click="resendCode"
                  :disabled="isTimerActive"
                >
                  Resend Code
                </button>
                <span v-if="isTimerActive"> ({{ timer }}s)</span>
                </p>
                <!-- 測試 -->
              </div>
            </div>
            <p
              v-if="currentStep === 1"
              class="mb-1 text-start"
              style="color: #75797e; font-size: 12px;"
            >
              To protect your account, you won't be able to withdraw funds or
              use P2P trading to sell crypto for 24 hours after you reset or
              change your account password.
            </p>
          </template>

          <!-- 步驟 2: 成功頁面 -->
          <template v-slot:extra-final v-if="currentStep === 2">
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
import modules from "@/services/modules.js";
import { handleApiError } from "@/utils/errorHandler.js";

const router = useRouter();
const {
  account: { changePassword, sendAuthCode, CheckVerificationCode },
} = modules;

// 定義步驟狀態
const currentStep = ref(1);

const verificationCode = ref("");
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

// 計時器狀態
const errorMessage = ref("");
const verificationError = ref(null);

const timer = ref(60);
const isTimerActive = ref(false);
let countdownInterval = null;

const verificationType = "ChangePassword"; // 驗證類型，例如 "emailVerification"
const testEmail = "winnielin0527a@gmail.com";
const emailCode = "123456";

// 計算當前步驟的按鈕文字
const buttonText = computed(() => {
  switch (currentStep.value) {
    case 1:
      return "Confirm";
    case 2:
      return "Go to Homepage";
    default:
      return "Confirm";
  }
});

// 验证电子邮件验证码
const validateEmailCode = (code) => {
  return code === emailCode; // 比对验证码
};


// 針對不同步驟的處理邏輯
const handleButtonClick = () => {
  if (!validateStep()) return; // 驗證失敗 終止後續操作

  if (currentStep.value === 1) {
    sendVerificationEmail(); // 點下一步之後可以發驗證信
  } else if (currentStep.value === 2) {
    verifyCode(); //驗證 驗證碼
  } else if (currentStep.value === 3) {
    ChangePassword();
  } else {
    returnToLogin();
  }
};

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

// 變更密碼函數
const ChangePassword = async() => {
  try {
    // 建構請求資料
    const passwordPayload = {
      password: currentPassword.value,
      newPassword: newPassword.value,
      code: verificationCode,
    };

    // 發送請求
    const response = await changePassword(passwordPayload);
    if (response.data.success) {
      handleStepChange(currentStep.value + 1);
      errorMessage.value ="";
    }
    console.log("變更成功", response.data);

  } catch (error) {
    console.error("變更失敗", error.response ? error.response.data : error);
    // 處理錯誤
    errorMessage.value = handleApiError(error);
  }
}

const validateStep = () => {
  if (currentStep.value === 1 && !validateCurrentPassword(currentPassword.value)) {
    errorMessage.value = "Incorrect current password.";
    console.log("Current password is incorrect.");
    return false;
  }
  if (currentStep.value === 1 && !validatePasswords()) {
    console.log("Password validation failed.");
    return false;
  }
  if (currentStep.value === 1 && !validateEmailCode(emailCode)) {
    errorMessage.value = "Invalid email verification code.";
    console.log("Email verification code is invalid.");
    return false;
  }
  errorMessage.value = ""; // 驗證通過時清空錯誤消息
  return true;
};

const validateCurrentPassword = (currentPassword) => {
  const loggedInUserPassword = "123456"; // 硬編碼測試密碼
  return currentPassword === loggedInUserPassword;
};

const validatePasswords = () => {
  const errors = [];
  if (newPassword.value !== confirmPassword.value) {
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
    if (!rule.regex.test(newPassword.value)) {
      errors.push(`Password: ${rule.message}`);
    }
  }

  if (errors.length > 0) {
    errorMessage.value = errors.join('\n');
    return false;
  }

  errorMessage.value = "";
  return true;
};

// 驗證email
const sendVerificationEmail = async () => {
  try {
    const response = await sendAuthCode(verificationType, testEmail);
    console.log(response, "驗證信已發送");
    if (response.data.success) {
      handleStepChange(currentStep.value + 1);
      errorMessage.value = "";
      startTimer(); // 啟動新的倒計時
    }
  } catch (error) {
    errorMessage.value = handleApiError(error);
    console.error("發送驗證信失敗", error);
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


// 驗證驗證碼
const verifyCode = async () => {
  // isTimerActive.value = false; // 發驗證信的按鈕
  // isVerifying.value = true; // 驗證碼按鈕
  verificationError.value = null;

  try {
    const response = await CheckVerificationCode(
      verificationType,
      testEmail,
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
  top: 1rem;
}

.arrow {
  border: none;
  background: transparent;
  font-size: x-large;
  color: #bbb;
}

.winnie-bg-dark input.form-control {
  border: 1px solid #BBB;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.3s ease;
  border-radius: 3px;
}

.winnie-bg-dark input.form-control:focus {
  border: 1px solid #181a20;
}

.winnie-bg-dark input.form-control::placeholder {
  color: #BBB;
}

.manage-pw-container .manage-pw-form label {
  color: #181A20;
}

.manage-pw-container .manage-pw-form input::placeholder {
  color: #BBB;
}

.winnie-bg-dark .manage-pw-container .form-control {
  border: 1px solid #BBB;
  border-radius: 4px;
}

.winnie-bg-dark .manage-pw-container .form-control:focus {
  border: 1px solid #181A20;
  outline: none;
}

.winnie-bg-dark .manage-pw-form .winnie-back-btn {
  top: 4rem;
}

@media (min-width: 991.98px) and (max-width: 1199.98px) {
    .winnie-bg-dark .manage-pw-container .fs-1 {
      font-size: calc(0.75rem + 1.5vw) !important;
    }
    .manage-pw-form {
      padding: 10px;
    }
}

@media (min-width: 991.98px) {
  .winnie-bg-dark .manage-pw-form .winnie-back-btn {
    right: 4rem;
    top: 1.75rem;
  }
}

.winnie-bg-dark .btn-send-code {
  background-color: #181A20;
  color: #F8F8F8;
  border: none;
}

.winnie-bg-dark .btn-send-code:hover {
  background-color: #2B3139;
}

</style>
