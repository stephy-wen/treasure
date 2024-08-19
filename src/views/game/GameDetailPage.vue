<template>
  <div v-if="gameDetails" class="container play-container mt-2 mt-md-3 mt-lg-5">
    <div class="play-cover">
      <img class="w-100" :src="gameDetails.imageSrc" alt="" />
    </div>
    <div class="d-flex align-items-center justify-content-between mt-3">
      <div class="col-8 d-sm-flex align-items-center">
        <p>THE POT</p>
        <div
          class="play-prize d-none d-sm-flex align-items-center justify-content-end ps-5"
        >
          <img :src="gameDetails.prizeIcon" alt="prize icon" />
          <p class="ms-2">{{ gameDetails.prizeAmount }}</p>
        </div>
      </div>
      <div class="col-4">
        <div
          class="d-sm-none play-prize d-flex align-items-center justify-content-end"
        >
          <img :src="gameDetails.prizeIcon" alt="prize icon" />
          <p class="ms-2">{{ gameDetails.prizeAmount }}</p>
        </div>
        <div class="player-limit d-none d-sm-flex ps-3 align-items-center">
          <p class="d-flex align-items-center me-3">
            <img
              class="me-2"
              style="max-width: 24px"
              :src="gameDetails.voteIcon"
              alt="vote icon"
            />Vote
          </p>
          <span>{{ gameDetails.votes }} / {{ gameDetails.totalVotes }}</span>
          <!-- 动态的參加数 -->
        </div>
      </div>
      <div class="col-6"></div>
    </div>

    <!-- 手機板 -->
    <div
      class="d-flex mt-2 justify-content-center player-list-hexagon d-sm-none"
    >
      <HexagonButton
        v-for="(image, index) in hexagonImages"
        :key="index"
        :backgroundImage="image"
        :isClickable="index === hexagonImages.length - 1"
        @openModal="openModalHandler(index)"
      />

      <PlayerListModal
        :showModal="showModal"
        :players="playersList"
        @close="showModal = false"
      />
    </div>

    <div
      class="d-flex d-sm-none mt-3 justify-content-between align-items-center"
    >
      <p>ROUND {{ gameDetails.round }}</p>
      <div class="player-limit d-flex align-items-center">
        <p class="d-flex align-items-center me-3">
          <img class="me-2" style="max-width: 24px" :src="mdiVote" alt="" />Vote
        </p>
        <span>{{ gameDetails.votes }} / {{ gameDetails.totalVotes }}</span>
      </div>
    </div>

    <div class="game-intro mt-3">
      <div class="row">
        <div class="col-12 col-sm-7">
          <div
            class="game-intro-title d-flex justify-content-between align-items-center align-items-sm-start"
          >
            <h1 class="fw-bold">HUNTING GAME</h1>
            <div class="d-flex flex-column">
              <p class="d-none d-sm-block">ROUND 1547</p>
              <img
                class="dollar-width"
                style="cursor: pointer"
                src="../images/icon/dollar-phone2.png"
                alt=""
                data-bs-toggle="modal"
                data-bs-target="#joinModal"
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
        <!-- 手機板結束 -->
        <div
          class="col-12 col-sm-5 col-md-4 ms-md-auto d-flex flex-column justify-content-between"
        >
          <div
            class="mt-2 justify-content-center player-list-hexagon d-none d-sm-flex"
          >
            <HexagonButton
              v-for="(image, index) in hexagonImages"
              :key="index"
              :backgroundImage="image"
              :isClickable="index === hexagonImages.length - 1"
              @openModal="() => openModalHandler(index)"
            />
          </div>
        </div>
      </div>
    </div>

    <h1>游戏详情页</h1>
    <p>游戏 ID: {{ gameId }}</p>
  </div>
</template>

<script setup>
import playEth from "@/assets/images/common/play_eth.png";
import ethAccount from "@/assets/images/icon/ETH-account.svg";
import mdiVote from "@/assets/images/icon/mdi_vote-outline.svg";
import playBnb from "@/assets/images/common/play_bnb.png";
import bnbAccount from "@/assets/images/icon/BNB-account.svg";
import HexagonImage from "@/assets/images/icon/NFT/08.png";
import { images } from "@/assets/images.js";

import HexagonButton from "./HexagonButton.vue";
import PlayerListModal from "./PlayerListModal.vue";

import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const gameId = route.params.gameId; // 获取游戏 ID

const showModal = ref(false); //player list modal

// 模拟加载游戏详情数据
const gameDetails = ref({});

// 模擬參加人數數據
const hexagonNumber = ref({});
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

// 定义 HexagonButton 的图片
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

// 打开模态框
const openModalHandler = (index) => {
  console.log(`點了第 ${index + 1} 個 HexagonButton`);
  showModal.value = true;
};

console.log(hexagonImages.length, "nub");

// 模拟游戏数据
const games = {
  eth123: {
    imageSrc: playEth, // 动态图片
    title: "THE POT", // 动态标题
    prizeIcon: ethAccount, // 动态奖品图标
    prizeAmount: "1.5", // 动态奖品金额
    voteIcon: mdiVote, // 动态投票图标
    votes: 8, // 动态投票数
    totalVotes: 535, // 总票数
    round: 1547,
  },
  bnb456: {
    imageSrc: playBnb,
    title: "BNB POT",
    prizeIcon: bnbAccount,
    prizeAmount: "2.0",
    voteIcon: mdiVote,
    votes: 12,
    totalVotes: 600,
    round: 1258,
  },
  // 添加更多游戏数据...
};

onMounted(() => {
  const gameId = route.params.gameId; // 获取路由参数 gameId

  gameDetails.value = games[gameId]; // 加载对应的游戏数据
  console.log(gameDetails.value);
});
</script>
