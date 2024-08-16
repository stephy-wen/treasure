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

    <img :src="HexagonImage" alt="Test Image" />
    <HexagonButton
      @openModal="showModal = true"
      :backgroundImage="HexagonImage"
    />

    <PlayerListModal
      :showModal="showModal"
      :players="playersList"
      @close="showModal = false"
    />

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
  },
  bnb456: {
    imageSrc: playBnb,
    title: "BNB POT",
    prizeIcon: bnbAccount,
    prizeAmount: "2.0",
    voteIcon: mdiVote,
    votes: 12,
    totalVotes: 600,
  },
  // 添加更多游戏数据...
};

onMounted(() => {
  const gameId = route.params.gameId; // 获取路由参数 gameId

  gameDetails.value = games[gameId]; // 加载对应的游戏数据
  console.log(gameDetails.value);
});
</script>
