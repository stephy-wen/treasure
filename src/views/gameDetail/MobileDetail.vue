<template>
  <div class="container play-container px-0 mt-2 mt-md-3 mt-lg-5">
    <div class="d-flex align-items-center justify-content-between mt-3">
      <div class="col-8 d-sm-flex align-items-center">
        <p>THE POT</p>
      </div>
      <div class="col-4">
        <div class="play-prize d-flex align-items-center justify-content-end">
          <img class="" :src="gameData.prizeIcon" alt="prizeIcon" />
          <p class="ms-2">{{ gameData.prizeAmount }}</p>
        </div>
      </div>
    </div>
    <div class="d-flex mt-2 justify-content-center player-list-hexagon">
      <HexagonButton
        v-for="(image, index) in hexagonImages"
        :key="index"
        class="ms-1"
        :backgroundImage="image"
        :isClickable="index === hexagonImages.length - 1"
        @openModal="openModal"
      />
      <!-- Player list Modal small size-->
      <PlayerListModal
        :isOpen="showModal"
        :players="playersList"
        @closeModal="showModal = false"
      />
    </div>
    <div class="d-flex mt-3 justify-content-between align-items-center">
      <p>ROUND {{ gameDetails.round }}</p>
      <div class="player-limit d-flex align-items-center">
        <p class="d-flex align-items-center me-3">
          <img
            class="me-2"
            style="max-width: 24px"
            src="@/assets/images/icon/mdi_vote-outline.svg"
            alt=""
          />Vote
        </p>
        <span>{{ gameData.votes }} / {{ gameData.totalVotes }}</span>
      </div>
    </div>
    <div class="game-intro mt-3">
      <div class="row">
        <div class="col-12 col-sm-7">
          <div
            class="game-intro-title d-flex justify-content-between align-items-center"
          >
            <h1 class="fw-bold">{{ gameDetails.name }}</h1>
            <div class="d-flex flex-column">
              <img
                class="dollar-width"
                style="cursor: pointer"
                src="@/assets/images/icon/dollar-phone2.png"
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
          class="col-12 col-sm-5 col-md-4 ms-md-auto d-flex flex-column justify-content-between"
        >
          <div class="game-attend mt-3">
            <button
              class="game-attend-btn py-4 fs-1 fw-bold"
              @click="openJoinGameModal"
            >
              START
            </button>
            <!-- Join Modal -->
            <JoinGameModal
              :isOpen="showJoinGameModal"
              :gameInfo="JoinGame"
              @closeModal="showJoinGameModal = false"
              @showInsufficientFundsModal="openInsufficientFundsModal"
            />

            <!-- InsufficientFunds Modal -->
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
              :gameInfo="JoinGame"
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
import { ref, defineProps } from "vue";
import { images, getCurrencyIcon } from "@/assets/images.js";
import HexagonButton from "./components/HexagonButton.vue";
import PlayerListModal from "./components/PlayerListModal.vue";
import JoinGameModal from "./components/JoinGameModal.vue";
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

const gameData = ref({});
const showInsufficientFundsModal = ref(false); // 控制InsufficientFundsModal的顯示與隱藏

const openInsufficientFundsModal = () => {
  showJoinGameModal.value = false; // 先關閉JoinGameModal遊戲視窗
  showInsufficientFundsModal.value = true; // 打開InsufficientFundsModal餘額不足視窗
};

// 關閉餘額不足的視窗
const closeInsufficientFundsModal = () => {
  showInsufficientFundsModal.value = false;
};

gameData.value = {
  title: props.gameDetails.name,
  prizeIcon: getCurrencyIcon(props.gameDetails.rewardSymbol),
  prizeAmount: props.gameDetails.rewardQuantity,
  voteIcon: mdiVote, // 固定投票圖標
  votes: props.gameDetails.betQuantityTotal,
  totalVotes: props.gameDetails.maxQuantity,
  round: props.gameDetails.round || "-", // 預設回合數
  dollarIcon: dollar, // 固定美元圖標
};

const showModal = ref(false); //player list modal 控制模態框是否顯示
const showJoinGameModal = ref(false);
const showVotingFullModal = ref(false);
const showWinnerModal = ref(false);

// 打开模态框
// 打開模態框的函數
const openModal = () => {
  console.log("openModal function called in Mobile.vue"); // 檢查是否觸發
  showModal.value = true; // 當接收到 openModal 事件時顯示模態框
  console.log("showModal value after openModal:", showModal.value); // 確認 showModal 的值是否正確設置為 true
};
const openJoinGameModal = () => {
  showJoinGameModal.value = true; // 确保将showJoinGameModal设置为true
};
const openVotingFullModal = () => {
  console.log("openVotingFullModal function called in Mobile.vue");
  showVotingFullModal.value = true; // 确保将showVotingFullModal设置为true
  console.log(
    "showVotingFullModal value after openModal:",
    showVotingFullModal.value
  );
};

const openWinnerModal = () => {
  console.log("openWinnerModal function called in Mobile.vue");
  showWinnerModal.value = true;
};

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
    image: "../images/icon/NFT/01.png",
    vote: 1,
    rate: 12.5,
  },
  {
    name: "1515djijiedd",
    image: "../images/icon/NFT/02.png",
    vote: 1,
    rate: 12.5,
  },
  // 其他玩家数据...
];

// join game data
const JoinGame = ref({
  backgroundImage: backgroundImage01,
  round: 1501,
  title: "Game Title",
  vote: 1,
});
</script>

<style scoped>
.play-container {
  flex: 1;
}

.play-container .hexagon {
  width: 20%;
  padding-top: 13.64%;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.play-container .hexagon-more {
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-container .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(65, 77, 90, 0.9);
  clip-path: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-container .dots {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.play-container .dot {
  width: 6px;
  height: 6px;
  background-color: #f8f8f8;
  border-radius: 50%;
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

@media (max-width: 480px) {
  .game-intro-title h1 {
    font-size: 22px;
  }
  .game-intro-title .dollar-width {
    height: 46px;
  }
}

.game-attend-btn {
  border-radius: 0px;
}
</style>
