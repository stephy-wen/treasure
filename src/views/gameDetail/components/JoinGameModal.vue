<template>
  <div
    v-if="isOpen"
    ref="modal"
    class="modal fade show"
    id="joinModal"
    tabindex="-1"
    aria-labelledby="joinModalLabel"
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
            @click="$emit('closeModal')"
            aria-label="Close"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div
          class="modal-body text-center d-flex flex-column justify-content-center"
        >
          <div class="game-round-name fw-bold">
            <p class="fs-5 mb-2">Round {{ gameInfo.round }}</p>
            <p class="fs-2">{{ gameInfo.title }}</p>
          </div>
          <div class="attend-fee mt-5 fs-5 fw-bold">
            <p class="mb-2">Total Amount Deducted</p>
            <p class="fs-3 fw-bold">
              <img
                class="me-2"
                style="width: 50px"
                src="@/assets/images/icon/balance-icon.png"
                alt=""
              />{{ totalAmountDeducted }}
            </p>
          </div>
          <div class="attend-times-btn d-flex justify-content-center mt-5 fs-5">
            <button @click="setAttendVote(1)" class="fw-bold">1</button>
            <button @click="setAttendVote(5)" class="mx-3 mx-md-4 fw-bold">
              5
            </button>
            <button @click="setAttendVote(10)" class="fw-bold">10</button>
          </div>
          <div class="attend-times-input mt-4">
            <span class="fw-5 fw-bold">x</span>
            <input
              class="fs-5 fw-bold"
              min="1"
              type="text"
              v-model="attendVote"
            />
            <!-- <span>Times</span> -->
          </div>
        </div>
        <div class="modal-footer mx-auto">
          <button
            type="button"
            class="btn attend-confirm-btn mb-5 fs-5"
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
import { ref, computed, defineProps, defineEmits, inject } from "vue";
import { useUserStore } from "@/stores/user";
import { useRoute } from "vue-router";
import modules from "@/services/modules";
import { ElMessage } from "element-plus";

const props = defineProps({
  isOpen: Boolean,
  gameInfo: Object,
});

const emit = defineEmits([
  "closeModal",
  "showInsufficientFundsModal",
  "refreshGameDetails",
]);

const {
  game: { playGame },
} = modules;
const route = useRoute();

const modal = ref(null); // 用於存儲模態框的 DOM 元素
const attendVote = ref(1);
const votes = inject("votes");
const maxVotes = inject("maxVotes");
const gameDetails = inject("gameDetails");

const userStore = useUserStore();
const userData = computed(() => userStore.userInfo); // 使用 computed 來響應式地追蹤 userInfo 的變化
const walletAmount = computed(() => userData.value?.balanceData?.balance); // 使用 computed 來取得錢包點數

const totalAmountDeducted = computed(() => {
  // betUnitAmount 乘以 attendVote 來計算總數
  return attendVote.value * props.gameInfo.betUnitAmount;
});

// 參加次數
const setAttendVote = (times) => {
  attendVote.value = times;
};

const voteResult = computed(() => {
  return maxVotes.value - votes.value;
});

// 點擊確認參加
const confirmParticipation = async () => {
  if (totalAmountDeducted.value > walletAmount.value) {
    emit("showInsufficientFundsModal"); // 跳出點數不足視窗
  } else {
    // 按下確認參加遊戲
    const gameRoomId = route.params.gameId; // 獲取路由參數中的 gameId
    try {
      const res = await playGame(gameRoomId, attendVote.value);
      if (res.data.success) {
        // 投票成功後通知父組件刷新遊戲資料
        emit("refreshGameDetails");
      }
    } catch (error) {
      // 檢查遊戲，是否投票已滿
      emit("refreshGameDetails");
      if (attendVote.value > voteResult.value) {
        ElMessage.error("超過總votes");
      } else if (error.response.data.message === "Vote is over quantity") {
        emit("showVotingFullModal");
      } else if (
        error.response.data.message === "Account vote is over quantity"
      ) {
        ElMessage.error("Failed! The number of votes exceeds");
      }
    }
  }
  emit("closeModal"); // 無論點數夠不夠，先關閉JoinGameModal
};
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
  font-weight: 600;
}

.game-attend #joinModal .modal-footer button.attend-confirm-btn:hover {
  background-color: #e5bf30;
}
</style>
