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
              class="input-field"
              v-model="password"
            />
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
