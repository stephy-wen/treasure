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
          :totalSteps="2"
          :currentStep="currentStep"
          :handleButtonClick="handleButtonClick"
          @goToLogin="returnToLogin"
        >
          <!-- 步驟 1: 輸入原密碼、新密碼、Email驗證 -->
          <template v-slot:extra-password v-if="currentStep === 1">
            <div class="mb-3">
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
                  @keydown.enter.prevent
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
                @keydown.enter.prevent
              />
            </div>
            <div class="mb-3">
              <label for="inputConfirmNewPassword" class="form-label"
                >Confirm new password</label
              >
              <input
                type="password"
                id="managePasswordConfirmPassword"
                class="form-control"
                placeholder="Enter your new password again"
                v-model="confirmPassword"
                @keydown.enter.prevent
              />
            </div>
            <div class="mb-3">
              <label for="inputEmailAuthentication" class="form-label"
                >Email authentication</label
              >
              <div class="d-flex align-items-center gap-1">
                <input
                  type="text"
                  id="inputEmailAuthentication"
                  class="form-control"
                  v-model="verificationCode"
                  placeholder="Enter code"
                  @keydown.enter.prevent="handleButtonClick"
                />
                <!-- 測試 -->
                <p class="d-flex align-items-center gap-1">
                  <button
                    style="height: 38px;"
                    type="button"
                    class="btn btn-resend-code"
                    @click="resendCode"
                    :disabled="isTimerActive"
                  >
                    Resend
                  </button>
                  <span :style="{ visibility: isTimerActive ? 'visible' : 'hidden' }"> ({{ timer }}s)</span>
                </p>
                <!-- 測試 -->
              </div>
            </div>
            <p
              v-if="currentStep === 1"
              class="mb-1 text-start"
              style="color: #75797e; font-size: 12px"
            >
              To protect your account, you won't be able to withdraw funds or
              use P2P trading to sell crypto for 24 hours after you reset or
              change your account password.
            </p>
          </template>

          
          <!-- 插入錯誤訊息 -->
          <template v-slot:error>
            <p v-if="errorMessage" class="error-message mt-5">
              <pre>{{ errorMessage }}</pre>
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
import { ref, computed, watch, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import AuthForm from "@/components/AuthForm/AuthForm.vue";
import FormSide from "@/components/FormSide.vue";
import ImageSide from "@/components/ImageSide.vue";
import modules from "@/services/modules.js";
import { handleApiError } from "@/utils/errorHandler.js";

const router = useRouter();
const {
  account: { changePassword, sendAuthCode, checkVerificationCode },
} = modules;

const userStore = useUserStore();

// 定義步驟狀態
const currentStep = ref(1);
const verificationCode = ref("");
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
let currentPasswordValid = false;
let codeVerified = false;

const errorMessage = ref("");

// 計時器狀態
const timer = ref(60);
const isTimerActive = ref(false);
let countdownInterval = null;

const verificationType = "ChangePassword";
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

// 針對不同步驟的處理邏輯
const handleButtonClick = async () => {
  if (currentStep.value === 1) {
    try {
      // 首先進行前端表單的輸入驗證
      const isStepValid = validateStep();

      if (!isStepValid) return; // 如果前端驗證失敗，阻止後續操作
      // 初始化錯誤訊息陣列
      const errors = [];

      // 如果前端驗證通過，則進行後端驗證，首先驗證碼
      await verifyCode();
      // 接著驗證當前密碼，並更新狀態
      await ChangePassword();

       // 驗證驗證碼是否正確
      if (!codeVerified) {
        errors.push("驗證碼不正確");
      }

      // 驗證舊密碼是否正確
      if (!currentPasswordValid) {
        errors.push("當前密碼不正確");
      }

      if (errors.length > 0) {
        errorMessage.value = errors.join("\n");
        return false;
      }
      // 如果所有驗證通過，進入下一步
      handleStepChange(currentStep.value + 1);
      errorMessage.value = "";
    } catch (error) {
      // 處理非預期錯誤
      console.error("發生未預期的錯誤", error);
      errorMessage.value = "發生了一些錯誤，請稍後再試";
    }
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
  currentStep.value = newStep;
};

// 驗證驗證碼
const verifyCode = async () => {
  // console.log(userStore.userInfo?.email, "查驗驗證碼"); // 確認有拿到使用者信箱
  try {
    const response = await checkVerificationCode(
      verificationType,
      userStore.userInfo?.email,
      verificationCode.value
    );

    if (response.data.success) {
      errorMessage.value = "";
      codeVerified = true;
    }
  } catch (error) {
    // 檢查錯誤響應中是否有 systemCode
    if(error.response.data.systemCode === 2005) {
      codeVerified = false;
    } else {
      // 處理錯誤
      errorMessage.value = "伺服器發生錯誤，請稍後再試。";
      console.error("驗證失敗", error);
    }
  }
};

// 變更密碼函數
const ChangePassword = async () => {
  try {
    // 建構請求資料
    const passwordPayload = {
      password: currentPassword.value,
      newPassword: newPassword.value,
      code: verificationCode.value,
    };

    // 發送請求
    const response = await changePassword(passwordPayload);
    if (response.data.success) {
      currentPasswordValid = true;
      errorMessage.value = "";
    }
  } catch (error) {
    // 如果是4006代表當前密碼錯誤 
    if(error.response.data.systemCode === 4006) {
      currentPasswordValid = false;
    } else {
      currentPasswordValid = true;  // 其他情況下仍然設置為 true
      // 處理錯誤
      // errorMessage.value = handleApiError(error);
      console.error("驗證失敗", error);
      errorMessage.value = "伺服器發生錯誤，請稍後再試。";
    }
  }

};

// 表單驗證函數
const validateStep = () => {
  const errors = [];

  if (!verificationCode.value) {
    errors.push("請輸入驗證碼");
  }

  if (!currentPassword.value) {
    errors.push("請輸入當前密碼");
  }

  // 驗證舊密碼與新密碼是否不同
  if (newPassword.value === currentPassword.value) {
    errors.push("新舊密碼不得相同");
  }

  // 驗證新密碼與確認密碼是否一致
  if (newPassword.value !== confirmPassword.value) {
    errors.push("新密碼和確認密碼不一致");
  }

  // 驗證密碼的強度
  const rules = [
    { regex: /.{8,}/, message: "密碼長度至少為 8 位" },
    { regex: /[0-9]/, message: "密碼必須包含至少一個數字" },
    { regex: /[a-z]/, message: "密碼必須包含至少一個小寫字母" },
    { regex: /[A-Z]/, message: "密碼必須包含至少一個大寫字母" },
  ];

  for (const rule of rules) {
    if (!rule.regex.test(newPassword.value)) {
      errors.push(`新密碼: ${rule.message}`);
    }
  }

  if (errors.length > 0) {
    errorMessage.value = errors.join("\n");
    return false;
  }

  errorMessage.value = "";
  return true;
};

// 發驗證信
const sendVerificationEmail = async () => {
  try {
    const response = await sendAuthCode(verificationType, userStore.userInfo?.email);

    if (response.data.success) {
      errorMessage.value = "";
      startTimer(); // 啟動新的倒計時
    }
  } catch (error) {
    errorMessage.value = "伺服器發生錯誤，請稍後再試。";
    console.error("發送驗證信失敗", error);
  }
};

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
const resendCode = async () => {
  if (!isTimerActive.value) {
    // 在這裡觸發重發驗證碼的邏輯
    await sendVerificationEmail();
  }
};


onMounted(async () => {
  await userStore.fetchUserInfo(); // get email
  await sendVerificationEmail();
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
  top: 1rem;
}

.arrow {
  border: none;
  background: transparent;
  font-size: x-large;
  color: #bbb;
}

.winnie-bg-dark input.form-control {
  border: 1px solid #bbb;
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
  color: #bbb;
}

.manage-pw-container .manage-pw-form label {
  color: #181a20;
}

.manage-pw-container .manage-pw-form input::placeholder {
  color: #bbb;
}

.winnie-bg-dark .manage-pw-container .form-control {
  border: 1px solid #bbb;
  border-radius: 4px;
}

.winnie-bg-dark .manage-pw-container .form-control:focus {
  border: 1px solid #181a20;
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

.winnie-bg-dark .btn-resend-code {
  background-color: #181a20;
  color: #f8f8f8;
  border: none;
}

.winnie-bg-dark .btn-resend-code:hover {
  background-color: #2b3139;
}
</style>
