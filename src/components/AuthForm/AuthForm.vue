<template>
  <div class="auth-form">
    <div id="formTitle" class="form-title text-center mb-5">
      <p class="fs-1 fw-bold">{{ title }}</p>
    </div>

    <!-- 插入步驟特定的 email 或其他輸入 -->
    <slot name="email-input"></slot>

    <!-- 插入推薦碼 或其他輸入 -->
    <slot name="extra-input"></slot>

    <!-- 插入額外的輸入框 (如推薦碼或新密碼) -->
    <slot name="extra-password"></slot>

    <!-- 插入其他內容，如隱私權政策或提醒 -->
    <slot name="extra-content"></slot>

    <!-- 插入其他內容，如隱私權政策或提醒 -->
    <slot name="extra-final"></slot>

    <!-- 錯誤訊息插槽 -->
    <slot name="error"></slot>

    <button class="btn btn-primary w-100 mb-3 mt-3" @click="handleButtonClick">
      {{ buttonText }}
    </button>

    <!-- 插入返回首頁或其他操作 -->
    <slot name="extra-action"></slot>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";

// 定義 props
const props = defineProps({
  title: String,
  buttonText: String,
  totalSteps: {
    type: Number,
    default: 1,
  },
  currentStep: {
    type: Number,
    default: 1,
  },
  handleButtonClick: Function,
});

const emit = defineEmits(["update:currentStep"]);

// 下一步邏輯
const nextStep = () => {
  // 檢查步驟狀態並發送事件
  if (props.currentStep < props.totalSteps) {
    emit("update:currentStep", props.currentStep + 1); // 更新步驟
  } else if (props.currentStep === props.totalSteps) {
    emit("goToLogin"); // 當到達最後一步時觸發 'goToLogin'
  }
};
</script>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  height: 600px;
}

.btn {
  width: 100%;
  padding: 10px;
}

.btn-primary {
  background-color: #181a20;
  color: #f8f8f8;
  border: none;
}
</style>
