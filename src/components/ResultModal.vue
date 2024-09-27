<!-- ResultModal.vue -->
<template>
  <div
    class="modal fade"
    id="resultModal"
    tabindex="-1"
    aria-labelledby="resultModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="resultModalLabel">Withdraw Result</h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div class="modal-body">
          <!-- 顯示成功或失敗的訊息 -->
          <p v-if="isSuccess">{{ successMessage }}</p>
          <p v-else>{{ errorMessage }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 接收父組件傳遞的 props
const props = defineProps({
  isSuccess: {
    type: Boolean,
    default: false,
  },
  successMessage: {
    type: String,
    default: "Withdrawal Successful!",
  },
  errorMessage: {
    type: String,
    default: "Withdrawal Failed. Please try again.",
  },
});
</script>

<style scoped>
#resultModal .modal-content {
  background-color: #181a20;
  border: 1px solid #414d5a;
}

#resultModal .modal-header {
  border-bottom: none;
  display: flex;
  justify-content: space-between;
}

#resultModal .modal-header h5 {
  font-size: 32px;
  padding: 10px;
}

#resultModal .modal-body {
  font-size: 20px;
  padding: 16px 28px;
}

#resultModal .modal-footer {
  border-top: none;
  padding: 10px;
}

.winnie-btn-close {
  background-color: #2b3139;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}
</style>
