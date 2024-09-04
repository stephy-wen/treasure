<template>
  <div
    v-if="isOpen"
    ref="modal"
    class="modal fade show"
    id="joinModal"
    tabindex="-1"
    aria-labelledby="joinModalLabel"
    aria-hidden="true"
    role="dialog"
    style="display: block"
  >
    <div
      class="modal-dialog mx-auto modal-dialog-centered modal-fullscreen-sm-down"
    >
      <div
        class="modal-content modal-background"
        :style="{ backgroundImage: `url(${gameInfo.backgroundImage})` }"
      >
        <div class="modal-header pb-0 d-flex justify-content-between">
          <h5 class="modal-title" id="joinModalLabel"></h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            @click="closeModal"
            aria-label="Close"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div
          class="modal-body text-center d-flex flex-column justify-content-center"
        >
          <div class="game-round-name">
            <p>Round {{ gameInfo.round }}</p>
            <p class="fs-2 fw-bold">{{ gameInfo.title }}</p>
          </div>
          <div class="attend-fee mt-5">
            <p>Total Amount Deducted</p>
            <p class="fs-3 fw-bold">
              <img
                class="me-2"
                style="width: 50px"
                src="@/assets/images/icon/balance-icon.png"
                alt=""
              />{{ totalAmount }}
            </p>
          </div>
          <div class="attend-times-btn d-flex justify-content-center mt-2">
            <button @click="setAttendTimes(1)">1</button>
            <button @click="setAttendTimes(5)" class="mx-3 mx-md-4">5</button>
            <button @click="setAttendTimes(10)">10</button>
          </div>
          <div class="attend-times-input mt-5">
            <span>x</span>
            <input class="fs-6" v-model="attendTimes"  min="1" type="text" />
            <!-- <span>Times</span> -->
          </div>
        </div>
        <div class="modal-footer mx-auto">
          <button
            type="button"
            class="btn attend-confirm-btn mb-5"
            data-bs-dismiss="modal"
            data-bs-toggle="modal"
            data-bs-target="#winnerModal"
            @click="confirmParticipation"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits } from "vue";

const modal = ref(null); // 用於存儲模態框的 DOM 元素

onMounted(() => {
  //const modalElement = modal.value; // 獲取模態框的 DOM 元素
  //console.log(modalElement, "modalElement");
  //const isHidden = window.getComputedStyle(modalElement).display === "none";
  //console.log(isHidden); // 檢查模態框是否隱藏
});

const props = defineProps({
  isOpen: Boolean,
  gameInfo: Object,
});

console.log("isOpen prop in JoinGameModal:", props.gameInfo);

const emit = defineEmits(["closeModal", "showInsufficientFundsModal"]);

const attendTimes = ref(1);
const currentBalance = ref(1); //目前暫定玩家遊戲幣餘額
const totalAmount = ref(2)//暫定遊戲費用

// 計算總費用
// const totalAmount = computed(() => {
//   return props.gameInfo.voted * attendTimes.value;
// });

// 參加次數
const setAttendTimes = (times) => {
  attendTimes.value = times;
};

const closeModal = () => {
  emit("closeModal");
};

// 點擊確認參加
const confirmParticipation = () => {
  console.log('confirmParticipation function called'); // 檢查函數是否被觸發
  if (totalAmount.value > currentBalance.value) {
    console.log('Insufficient funds'); // 檢查條件是否滿足
    closeModal();
    emit("showInsufficientFundsModal"); // 跳出餘額不足視窗
  } else {
    console.log("成功參與遊戲");
  }
}

</script>

<style scoped>
.winnie-btn-close {
  background-color: #1e2329;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

.winnie-btn-close:hover {
  background-color: #414d5a;
  color: #f8f8f8;
}

.game-attend .modal-dialog {
  width: 100%;
}

@media (min-width: 575.98px) {
  .game-attend .modal-dialog {
    max-width: 400px;
  }
}

#joinModal .modal-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#joinModal .modal-content {
  color: #f8f8f8;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
}

#joinModal .attend-times-btn button {
  background-color: transparent;
  border: 1px solid #f8f8f8;
  padding: 8px 30px;
  color: #f8f8f8;
  border-radius: 10px;
}

#joinModal .attend-times-btn button:hover {
  background-color: rgba(0, 0, 0, 0.25);
}

#joinModal .modal-header {
  border-bottom: none;
}

#joinModal .modal-footer {
  border-top: none;
}

#joinModal .modal-content {
  background-color: transparent;
}

#joinModal .modal-body input {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #f8f8f8;
  color: #f8f8f8;
  text-align: center;
  border-radius: 0px;
}

.game-attend #joinModal .modal-body input:focus {
  outline: none;
}

.game-attend #joinModal .modal-footer button.attend-confirm-btn {
  background-color: #fcd535;
  border: none;
  color: #181a20;
  padding: 8px 90px;
}

.game-attend #joinModal .modal-footer button.attend-confirm-btn:hover {
  background-color: #e5bf30;
}
</style>
