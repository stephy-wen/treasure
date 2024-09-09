<template>
  <div class="winnie-bg-dark">
    <div class="login-container d-flex mx-auto">
      <ImageSide />
      <FormSide class="login-form position-relative">
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
          :handleButtonClick="handleButtonClick"
        >
          <!-- 步驟 1: Email 和推薦碼 -->
          <template v-slot:email-input v-if="currentStep === 1">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInputEmailReset"
                placeholder="Email"
                v-model="email"
                @keydown.enter.prevent="handleButtonClick"
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
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control input-field"
              id="floatingInputPasswordReset"
              placeholder="New Password"
              v-model="password"
              @keydown.enter.prevent="handleButtonClick"
            />
            <label for="floatingInputPasswordReset">Password</label>
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

import AuthForm from "@/components/AuthForm/AuthForm.vue";
import FormSide from "@/components/FormSide.vue";
import ImageSide from "@/components/ImageSide.vue";
const router = useRouter();

// 定義步驟狀態
const currentStep = ref(1);

const email = ref("");
const password = ref("");

const errorMessage = ref("");
const userStore = useUserStore();

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
  errorMessage.value = "";
  if (currentStep.value === 1) {
    router.go(-1);
  } else if (currentStep.value > 1) {
    currentStep.value -= 1;
  }
};

// 針對不同步驟的處理邏輯
const handleButtonClick = async () => {
  if (currentStep.value === 1) {
    if (!email.value) {
      errorMessage.value = "email cannot be empty.";
      return
    }
    handleStepChange(currentStep.value + 1);
  } else if (currentStep.value === 2) {
    await login(); // 打登入api
  }
};

const login = async () => {
  errorMessage.value = ""

  if (!password.value) {
    errorMessage.value = "Password cannot be empty.";
    return
  }

  await userStore.loginUser({
    email: email.value,
    password: password.value,
  });

  if(userStore.token) {
    router.push("/");
  }

  // 使用 store 中的 errorMessage 判斷是否有錯誤
  if (userStore.errorMessage) {
    errorMessage.value = userStore.errorMessage; // get store errorMessage
  } 
};

// 步驟變更邏輯
const handleStepChange = (newStep) => {
  if (currentStep.value <= 2) {
    currentStep.value = newStep;
  }
};
</script>

<style scoped>
/* login */

.winnie-bg-dark{
  background-color: #181A20;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 20px;
}

.login-container{
  background: linear-gradient(to right, transparent 0%, transparent 25%, #F8F8F8 50%, #F8F8F8 75%, #F8F8F8 100%);
  overflow: hidden;
  position: relative;
  max-width: 1200px;
  border-radius: 30px;
}

.login-img{
    flex: 2;
}

.login-form {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  width: 100%;
  max-width: 400px;
}

.form-title p{
    color: #181A20;
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

.winnie-bg-dark .login-container .login-form form .winnie-login-btn {
  background-color: #181A20;
  color: #F8F8F8;
  border: none;
}

.form-floating > input + label:after {
  background-color: transparent !important;
}

.winnie-bg-dark .login-container .winnie-sign-up-link{
  color: #181A20;
}

.winnie-bg-dark .login-container .winnie-sign-up-link a{
  color: #181A20;
}

.winnie-bg-dark .login-container .winnie-sign-up-link a:hover{
  color: #FCD535;
}

.winnie-bg-dark .login-container .winnie-forget-pw-link {
  color: #181A20;
}

.winnie-bg-dark .login-container .winnie-forget-pw-link:hover {
  color: #FCD535;
}

.winnie-bg-dark .login-form .winnie-back-btn{
  top: 2rem;
}

.winnie-bg-dark .winnie-sign-up-link {
  color: #181A20;
  text-decoration: none;
  transition: color 0.3s ease;
  bottom: 2rem;
  left: 0;
  right: 0;
}

@media (max-width: 991px) {
  .login-img {
    display: none;
  }

  .login-container {
    background-color: #f8f8f8;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    border-radius: 0px;
    width: 100%;
    border-color: #F8F8F8;
  }

  .login-form {
    width: 100%;
    padding: 15px;
  }
  
  .winnie-bg-dark {
    padding: 0px;
    height: 100%;
  }
}

button.arrow {
  border: none;
  background-color: transparent;
  color: #BBB;
}

button.arrow:hover {
  color: #1E2329;
}

</style>
