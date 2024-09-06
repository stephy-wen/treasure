<template>
  <div class="play-container mt-2 mt-md-3 mt-lg-5">
    <div class="d-flex align-items-center justify-content-between mt-3">
      <div class="col-8 d-flex align-items-center">
        <p class="fw-bold">THE POT</p>
        <div
          class="play-prize d-flex align-items-center justify-content-end ps-5"
        >
          <img :src="gameData.prizeIcon" alt="prize icon" />
          <p class="ms-2">{{ gameData.prizeAmount }}</p>
        </div>
      </div>
      <div>
        <div class="player-limit d-flex ps-3 align-items-center">
          <p class="d-flex align-items-center me-3">
            <img
              class="me-2"
              style="max-width: 24px"
              :src="gameData.voteIcon"
              alt=""
            />Vote
          </p>
          <span>{{ gameData.votes }} / {{ gameData.totalVotes }}</span>
          <!-- 動態的參加数 -->
        </div>
      </div>
    </div>
    <div class="game-intro mt-3">
      <div class="row">
        <div class="col-7">
          <div
            class="game-intro-title d-flex justify-content-between align-items-start"
          >
            <h1 class="fw-bold">{{ gameDetails.name }}</h1>
            <div class="d-flex flex-column">
              <p class="d-block">ROUND {{ gameDetails.round }}</p>
              <img
                class="dollar-width"
                style="cursor: pointer"
                :src="gameData.dollarIcon"
                alt=""
                @click="openJoinGameModal"
              />
            </div>
          </div>
          <div class="game-intro-content fs-5">
            The Game is an interactive onchain survival game where contestants
            buy in, join tribes, compete in daily challenges, and vote each
            other out over the course of ten days, until one person wins the
            entire pot.
          </div>
        </div>
        <div
          class="col-5 col-xl-4 ms-md-auto d-flex flex-column justify-content-between"
        >
          <div class="mt-2 d-flex justify-content-center player-list-hexagon">
            <HexagonButton
              v-for="(image, index) in hexagonImages"
              :key="index"
              class="ms-1"
              :backgroundImage="image"
              :isClickable="index === hexagonImages.length - 1"
              @openModal="openModal"
            />

            <!-- Player list Modal large size-->
            <!-- PlayListModal -->
            <PlayerListModal
              :isOpen="showModal"
              :players="playersList"
              @closeModal="showModal = false"
            />
          </div>
          <div class="game-attend mt-3">
            <button
              class="game-attend-btn py-4 fs-1 fw-bold"
              @click="openJoinGameModal"
              :disabled="gameData.votes === gameData.totalVotes"
              :class="{
                'disabled-button': gameData.votes === gameData.totalVotes,
              }"
            >
              START
            </button>

            <!-- Join Modal -->
            <JoinGameModal
              :isOpen="showJoinGameModal"
              :gameInfo="JoinGame"
              @closeModal="showJoinGameModal = false"
              @showInsufficientFundsModal="openInsufficientFundsModal"
              @refreshGameDetails="refreshGameDetails"
              @showVotingFullModal="openVotingFullModal"
            />

            <!-- 餘額不足modal -->
            <InsufficientFundsModal
              :isOpen="showInsufficientFundsModal"
              @closeModal="closeInsufficientFundsModal"
            />

            <!-- maxParticipantsModal-->
            <button class="btn btn-primary" @click="openVotingFullModal">
              Launch demo modal
            </button>
            <VotingFullModal
              :isOpen="showVotingFullModal"
              @closeModal="showVotingFullModal = false"
            />

            <WinnerModal
              :isOpen="showWinnerModal"
              :winnerInfo="WinnerData"
              @closeModal="showWinnerModal = false"
            />
            <button class="btn btn-outline-primary" @click="openWinnerModal">
              WinnerModal
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, onMounted, watch } from "vue";
import { images, getCurrencyIcon } from "@/assets/images.js";
import HexagonButton from "./components/HexagonButton.vue";
import PlayerListModal from "./components/PlayerListModal.vue";
import JoinGameModal from "./components/JoinGameModal.vue";
import NFT01 from "@/assets/images/icon/NFT/01.png";
import NFT02 from "@/assets/images/icon/NFT/02.png";
import backgroundImage01 from "@/assets/images/common/attend_eth.png";
import VotingFullModal from "./components/VotingFullModal.vue";
import WinnerModal from "./components/WinnerModal.vue";
import InsufficientFundsModal from "./components/InsufficientFundsModal.vue";
import dollar from "@/assets/images/icon/dollar-phone2.png";
import mdiVote from "@/assets/images/icon/mdi_vote-outline.svg";

const props = defineProps({
  gameDetails: {
    type: Object,
    required: true,
  },
});

const showModal = ref(false); //player list modal 控制模態框是否顯示
const showJoinGameModal = ref(false);
const showVotingFullModal = ref(false);
const showWinnerModal = ref(false);
const showInsufficientFundsModal = ref(false); // 控制InsufficientFundsModal的顯示與隱藏

// 打開餘額不足的視窗
const openInsufficientFundsModal = () => {
  showJoinGameModal.value = false; // 先關閉JoinGameModal遊戲視窗
  showInsufficientFundsModal.value = true;
};

// 關閉餘額不足的視窗
const closeInsufficientFundsModal = () => {
  showInsufficientFundsModal.value = false;
};

// 打开模态框
// 打開模態框的函數
const openModal = () => {
  console.log("openModal function called in Desktop.vue"); // 檢查是否觸發
  showModal.value = true; // 當接收到 openModal 事件時顯示模態框
  console.log("showModal value after openModal:", showModal.value); // 確認 showModal 的值是否正確設置為 true
};

const openJoinGameModal = () => {
  showJoinGameModal.value = true;
};

const openVotingFullModal = () => {
  showVotingFullModal.value = true;
};

const openWinnerModal = () => {
  showWinnerModal.value = true;
};

const emit = defineEmits(["refreshGameDetails"]);

const refreshGameDetails = () => {
  emit("refreshGameDetails");
};

const gameData = computed(() => ({
  title: props.gameDetails.name,
  prizeIcon: getCurrencyIcon(props.gameDetails.rewardSymbol),
  prizeAmount: props.gameDetails.rewardQuantity,
  voteIcon: mdiVote, // 固定投票圖標
  votes: props.gameDetails.betQuantityTotal,
  totalVotes: props.gameDetails.maxQuantity,
  round: props.gameDetails.round || "-", // 預設回合數
  dollarIcon: dollar, // 固定美元圖標
}));

// 右側定義六角形頭像圖片
const hexagonImages = [
  images.nft01,
  images.nft02,
  images.nft03,
  images.nft04,
  images.nft05,
  images.nft06,
  images.nft07,
  images.HexagonImage,
];

// playersList data
const playersList = [
  {
    name: "hehe15235",
    image: NFT01,
    vote: 1,
    rate: 12.5,
  },
  {
    name: "1515djijiedd",
    image: NFT02,
    vote: 1,
    rate: 12.5,
  },
  // 其他玩家数据...
];

let iconImage;

if (props.gameDetails.betSymbol === "POINT") {
  iconImage = backgroundImage01;
}
// join game data
const JoinGame = ref({
  backgroundImage: iconImage,
  round: props.gameDetails.round,
  title: props.gameDetails.name,
  betUnitAmount: props.gameDetails.betUnitAmount,
  vote: props.gameDetails.betQuantityTotal,
  maxVote: props.gameDetails.maxQuantity,
});

const WinnerData = ref({
  winnerName: props.gameDetails.winnerName,
  winnerAvatarUrl: props.gameDetails.winnerAvatarUrl,
  backgroundImage: iconImage,
});

// 監聽 gameDetails 的變化
watch(
  () => props.gameDetails,
  (newDetails) => {
    console.log("gameDetails 更新:", newDetails);
    // 當遊戲結束且有贏家時，打開 WinnerModal
    if (newDetails.gameEnded && newDetails.winnerName) {
      // 更新 WinnerData，以確保彈窗顯示最新的贏家資訊
      WinnerData.value = {
        winnerName: newDetails.winnerName,
        winnerAvatarUrl: newDetails.winnerAvatarUrl,
        backgroundImage: backgroundImage01,
      };
      openWinnerModal();
    }
  }
);

// 檢查 `winnerName` 並決定是否顯示 `WinnerModal`
onMounted(() => {
  console.log("DeskTopDetail 組件已掛載");
  // 檢查遊戲是否已經結束並且有贏家
  if (props.gameDetails.gameEnded && props.gameDetails.winnerName) {
    console.log("名字為空");
    openWinnerModal();
  }
});
</script>

<style scoped>
.play-container {
  flex: 1;
}

@media (min-width: 575.98px) and (max-width: 991.98px) {
  .play-container .dot {
    width: 4px;
    height: 4px;
    background-color: #f8f8f8;
    border-radius: 50%;
  }
}

.play-container .player-limit p {
  border: 1px solid #bbb;
  padding: 2px 4px;
}

.play-container .game-attend-btn {
  background-image: url("@/assets/images/common/play_button.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: transparent;
  border: 1px solid #bbb;
  color: #f8f8f8;
  width: 100%;
}

.play-container .game-attend-btn {
  position: relative;
  /* 确保伪元素覆盖按钮 */
  z-index: 1;
}

.play-container .game-attend-btn::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease;
  z-index: 2;
}

.play-container .game-attend-btn:hover::after {
  background-color: rgba(255, 255, 255, 0.1);
}

.play-container .game-attend-btn.disable {
  color: #f8f8f8;
}

@media (min-width: 575.98px) {
  .game-intro-title {
    flex-direction: column;
    align-items: flex-start;
  }
  .game-intro-title .flex-column {
    flex-direction: row !important;
    align-items: center;
  }
  .game-intro-title .flex-column p {
    padding-right: 20px;
  }
}

.game-attend-btn {
  border-radius: 0px;
}

.winnie-btn-close {
  background-color: #1e2329;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

.winnie-btn-close:hover {
  background-color: #414d5a;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

.winnie-text-white {
  color: #f8f8f8;
}

.winnie-text-gray {
  color: #bbb;
}

@media (max-width: 767.98px) {
  .custom-rounded {
    border-radius: 0px;
  }
}

/* game-attend-modal & winner-modal */
.game-attend .modal-dialog {
  width: 100%;
}

@media (min-width: 575.98px) {
  .game-attend .modal-dialog {
    max-width: 400px;
  }
}

.game-attend #joinModal .modal-background,
#winnerModal .modal-background,
#maxParticipantsModal .modal-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.game-attend #joinModal .modal-content {
  color: #f8f8f8;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
}

.game-attend #joinModal .attend-times-btn button {
  background-color: transparent;
  border: 1px solid #f8f8f8;
  padding: 8px 30px;
  color: #f8f8f8;
  border-radius: 10px;
}

.game-attend #joinModal .modal-header,
#winnerModal .modal-header,
#playerListModal .modal-header,
#playerListSmModal .modal-header,
#insufficientBalanceModal .modal-header,
#maxParticipantsModal .modal-header {
  border-bottom: none;
}

.game-attend #joinModal .modal-footer,
#winnerModal .modal-footer,
#playerListModal .modal-footer,
#playerListSmModal .modal-footer,
#insufficientBalanceModal .modal-footer,
#maxParticipantsModal .modal-footer {
  border-top: none;
}

.game-attend #joinModal .modal-body input {
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

#winnerModal .modal-dialog .modal-content {
  min-height: 500px;
}

#winnerModal .modal-footer .winnie-color-gray,
#maxParticipantsModal .winnie-color-gray {
  color: #bbb;
}

#playerListModal .table,
#playerListSmModal .table {
  --bs-table-bg: transparent;
  color: #f8f8f8;
  --bs-table-color: none;
  width: 100%;
  margin: 0;
}

#playerListModal .table .player-list-name {
  font-size: 1rem;
}

#playerListModal .table td,
#playerListModal .table th {
  vertical-align: middle;
}

#insufficientBalanceModal .modal-dialog {
  max-width: 576px;
}

@media (min-width: 767.98px) {
  #insufficientBalanceModal .modal-dialog {
    max-width: 750px;
  }
}

#insufficientBalanceModal a p {
  color: #f8f8f8;
}

#insufficientBalanceModal a button {
  color: #f8f8f8;
  background-color: #2b3139;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

#insufficientBalanceModal a button:hover,
#insufficientBalanceModal a button:focus {
  color: #f8f8f8;
  background-color: #414d5a;
}

#insufficientBalanceModal .vertical-line {
  width: 1px;
  background-color: #414d5a;
  height: 100px;
  margin: 0 20px;
}

#insufficientBalanceModal .vertical-line.active {
  background-color: #f8f8f8;
}

#insufficientBalanceModal .divider {
  width: 1px;
  height: 30px;
  background-color: #bbb;
  margin: 0px 30px;
}

@media (min-width: 575.98px) {
  #insufficientBalanceModal .step-container {
    display: flex;
    align-items: flex-start;
    /* margin-bottom: 30px; */
  }
}

#insufficientBalanceModal .circle-number {
  width: 40px;
  height: 40px;
  background-color: #2b3139;
  color: #3d3d3d;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}

#insufficientBalanceModal .circle-number.active {
  background-color: #414d5a;
  color: #f8f8f8;
}

#insufficientBalanceModal .step-title {
  display: flex;
  align-items: center;
  /* margin-bottom: 10px; */
}

#insufficientBalanceModal .dropdown-menu {
  background-color: #2b3139;
  --bs-dropdown-link-hover-bg: #414d5a;
}

#insufficientBalanceModal .step-container .dropdown-toggle {
  width: 280px;
  background-color: transparent;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .step-container .dropdown-toggle {
    width: 600px;
  }
}

#insufficientBalanceModal .step-container ul.dropdown-menu {
  width: 280px;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .step-container ul.dropdown-menu {
    width: 600px;
  }
}

#insufficientBalanceModal .deposit-notice-color {
  color: #f8f8f8;
}

#insufficientBalanceModal .deposit-notice-bk-color {
  background-color: #414d5a;
  border-radius: 8px;
}

#insufficientBalanceModal .winnie-fs-small {
  font-size: 12px;
}

#insufficientBalanceModal .company-address {
  border: 1px solid #565e64;
  color: #f8f8f8;
  border-radius: 8px;
}

#insufficientBalanceModal .deposit-notice-bottom {
  width: 280px;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 400px;
  }
}

@media (min-width: 767.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .deposit-notice-bottom {
    width: 600px;
  }
}

#insufficientBalanceModal .company-address p {
  font-size: 16px;
}
@media (min-width: 767.98px) {
  #insufficientBalanceModal .company-address p {
    font-size: 14px;
  }
}

#insufficientBalanceModal .qrcode-pic {
  width: 160px;
}

@media (min-width: 767.98px) {
  #insufficientBalanceModal .qrcode-pic {
    width: 120px;
  }
}
@media (min-width: 991.98px) {
  #insufficientBalanceModal .qrcode-pic {
    width: 170px;
  }
}

@media (max-width: 768px) {
  #insufficientBalanceModal .company-address p {
    word-wrap: break-word;
    word-break: break-all;
  }
}

#insufficientBalanceModal .form-control {
  box-shadow: none;
}

#insufficientBalanceModal .form-control:focus {
  box-shadow: none;
}

#insufficientBalanceModal ul li a img {
  max-width: 24px;
}

#insufficientBalanceModal ul li a .abbr {
  font-weight: bold;
  color: #f8f8f8;
}
#insufficientBalanceModal ul li a .full-name {
  color: #bbb;
}

.game-intro-title .dollar-width {
  height: 60px;
}

@media (max-width: 400px) {
  .game-intro-title h1 {
    font-size: 22px;
  }
  .game-intro-title .dollar-width {
    height: 46px;
  }
}

#maxParticipantsModal .modal-dialog .modal-content {
  min-height: 300px;
}

#maxParticipantsModal {
  background-color: rgba(0, 0, 0, 0.5);
}

/* 禁用狀態的按鈕樣式 */
.disabled-button {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
