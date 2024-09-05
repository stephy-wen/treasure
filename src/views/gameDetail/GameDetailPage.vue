<template>
  <div>
    <div class="container play-container mt-2 mt-md-3 mt-lg-5">
      <!-- 遊戲banner -->
      <div class="play-cover">
        <img class="w-100" :src="gameDetails.playImgUrl" alt="" />
      </div>

      <!-- 遊戲區塊 -->
      <template v-if="Object.keys(gameDetails).length > 0">
        <MobileDetail v-if="isMobile" :gameDetails="gameDetails" />
        <DeskTopDetail v-else :gameDetails="gameDetails" />
      </template>
      <hr class="my-5" />

      <!-- 歷史得獎紀錄 -->
      <div class="history">
        <TableComponent
          Title="History"
          :headers="headers"
          :data="historyData"
        />
      </div>

      <button class="btn btn-outline-primary" @click="openWinnerModal">
        WinnerModal
      </button>
    </div>
    <!-- 分頁組件 -->
    <!-- <Pagination
      :totalItems="totalItems"
      :itemsPerPage="itemsPerPage"
      @page-changed="fetchPageData"
    /> -->
  </div>
</template>

<script setup>
import playEth from "@/assets/images/common/play_eth.png";
import ethAccount from "@/assets/images/icon/ETH-account.svg";
import mdiVote from "@/assets/images/icon/mdi_vote-outline.svg";
import playBnb from "@/assets/images/common/play_bnb.png";
import bnbAccount from "@/assets/images/icon/BNB-account.svg";
import verify from "@/assets/images/icon/arcoDesign-launch 1.svg";
import nft01 from "@/assets/images/icon/NFT/01.png";
import nft02 from "@/assets/images/icon/NFT/02.png";
import nft03 from "@/assets/images/icon/NFT/03.png";
import nft04 from "@/assets/images/icon/NFT/04.png";
import nft05 from "@/assets/images/icon/NFT/05.png";
import dollar from "@/assets/images/icon/dollar-phone2.png";
import { images } from "@/assets/images.js";

import MobileDetail from "./MobileDetail.vue";
import DeskTopDetail from "./DeskTopDetail.vue";
import TableComponent from "@/components/TableComponent.vue";
import Pagination from "@/components/Pagination.vue";

import { onMounted, ref, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import modules from "@/services/modules.js";

const {
  game: { getGameRoom },
} = modules;

// 監聽螢幕變化起
const isMobile = ref(window.innerWidth < 575.98);

const handleResize = () => {
  isMobile.value = window.innerWidth < 575.98;
};

// 監聽頁面寬度變化
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

// 组件銷毀時移除監聽
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
// 監聽螢幕變化 始

// 模擬歷史紀錄 功能開始
// 項目總數和每頁項目數
const totalItems = ref(100); // 從後端獲取的總項目數
const itemsPerPage = ref(10);

// 當前頁面的數據
const currentItems = ref([]);

// 模擬從後端獲取數據的函數
// const fetchPageData = (page) => {
//   const startIndex = (page - 1) * itemsPerPage.value;
//   currentItems.value = getItemsFromBackend(startIndex, itemsPerPage.value);
// };

// 模擬 API 返回的數據
// const getItemsFromBackend = (startIndex, itemsPerPage) => {
//   const items = [];
//   for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
//     items.push(`Item ${i + 1}`);
//   }
//   return items;
// };

// 初始化加載第一頁數據
// fetchPageData(1);
const headers = [
  { text: "Round", class: "text-center" },
  { text: "Winner" },
  { text: "Time", class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0" },
  { text: "Verify", class: "text-end pe-3 pe-sm-5" },
];

const historyData = ref([
  [
    { text: "1546", class: "text-center", image: null },
    {
      text: "hehe15235",
      class: "leaderboard-name",
      image: nft01,
    },
    {
      text: "2024/06/13 18:24:53",
      class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
      image: null,
    },
    {
      text: null,
      class: "text-end pe-3 pe-sm-5",
      image: verify,
    },
  ],
  [
    { text: "1545", class: "text-center", image: null },
    {
      text: "1515djijiedd",
      class: "leaderboard-name",
      image: nft02,
    },
    {
      text: "2024/06/12 20:16:03",
      class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
      image: null,
    },
    {
      text: null,
      class: "text-end pe-3 pe-sm-5",
      image: verify,
    },
  ],
  [
    { text: "1544", class: "text-center", image: null },
    {
      text: "ohjiemdl88556",
      class: "leaderboard-name",
      image: nft03,
    },
    {
      text: "2024/06/11 14:08:23",
      class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
      image: null,
    },
    {
      text: null,
      class: "text-end pe-3 pe-sm-5",
      image: verify,
    },
  ],
  [
    { text: "1543", class: "text-center", image: null },
    {
      text: "12345678",
      class: "leaderboard-name",
      image: nft04,
    },
    {
      text: "2024/06/10 09:30:15",
      class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
      image: null,
    },
    {
      text: null,
      class: "text-end pe-3 pe-sm-5",
      image: verify,
    },
  ],
  [
    { text: "1542", class: "text-center", image: null },
    {
      text: "abcdefg",
      class: "leaderboard-name",
      image: nft05,
    },
    {
      text: "2024/06/09 16:45:50",
      class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
      image: null,
    },
    {
      text: null,
      class: "text-end pe-3 pe-sm-5",
      image: verify,
    },
  ],
  // 你的歷史數據
]);
// 模擬歷史紀錄 功能結束

const gameDetails = ref({}); // 初始化遊戲資料
const route = useRoute(); // 獲取路由對象

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
    dollarIcon: dollar,
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
    dollarIcon: dollar,
  },
  // 添加更多游戏数据...
};

onMounted(async () => {
  const gameId = route.params.gameId; // 獲取路由參數中的 gameId
  try {
    // 調用 API 獲取遊戲資料
    const response = await getGameRoom(gameId);
    console.log(response, "s遊戲資料");
    if (response && response.data.data) {
      gameDetails.value = response.data.data; // 將 API 返回的資料賦值給 gameDetails
    } else {
      console.error("未獲取到有效的遊戲資料");
    }
  } catch (error) {
    console.error("獲取遊戲資料時發生錯誤：", error);
  }
  // gameDetails.value = games[gameId]; // 加载对应的游戏数据
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
