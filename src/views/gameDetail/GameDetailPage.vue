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
        <DeskTopDetail
          v-else
          :gameDetails="gameDetails"
          @refreshGameDetails="loadGameDetails"
        />
      </template>
      <hr class="my-5" />

      <!-- 歷史得獎紀錄 -->
      <div class="history">
        <TableComponent
          Title="History"
          :headers="headers"
          :data="currentItems"
          :imageFirst="true"
        />
      </div>
    </div>
    <!-- 分頁組件 -->
    <Pagination
      :totalItems="totalItems"
      :itemsPerPage="itemsPerPage"
      @page-changed="fetchPageData"
    />
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
import dayjs from "dayjs";

// 格式化日期函數
const formatDate = (isoDateString) => {
  return dayjs(isoDateString).format("YYYY/MM/DD HH:mm:ss");
};

import MobileDetail from "./MobileDetail.vue";
import DeskTopDetail from "./DeskTopDetail.vue";
import TableComponent from "@/components/TableComponent.vue";
import Pagination from "@/components/Pagination.vue";

import { onMounted, ref, onBeforeUnmount, provide, watch } from "vue";
import { useRoute } from "vue-router";
import modules from "@/services/modules.js";

const {
  game: { getGameRoom, getGameWinnerHistory },
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
const currentItems = ref([]); // 當前頁面的數據
const totalItems = ref(0); // 從後端獲取的總項目數
const itemsPerPage = ref(5); // 每頁顯示 5 筆
const gid = ref(null); // 用來保存遊戲資料中的 gid

const pageCache = ref({}); // 用來存儲每一頁的數據

// 模擬從後端獲取數據的函數
const fetchPageData = async (pageIndex) => {
  try {
    if (!gid.value) {
      console.error("gid 尚未獲取到，無法加載贏家歷史");
      return;
    }
    // 檢查是否有緩存
    if (pageCache.value[pageIndex]) {
      currentItems.value = pageCache.value[pageIndex];
      return;
    }
    // 調用 API 獲取贏家歷史資料
    const response = await getGameWinnerHistory(
      gid.value,
      itemsPerPage.value,
      pageIndex
    );

    if (response && response.data.data) {
      currentItems.value = formatHistoryData(response.data.data.items); // 更新當前頁的贏家歷史數據
      totalItems.value = response.data.data.total; // 更新總贏家數，用來計算總頁數
      console.log("response.data", response.data);
      console.log("總共幾筆", totalItems.value);
      console.log(response.data.data, "response.data.data");
    } else {
      console.error("未獲取到有效的贏家歷史資料");
    }
  } catch (error) {
    console.error("獲取贏家歷史時發生錯誤：", error);
  }
};

// 定義資料格式化函數
const formatHistoryData = (data) => {
  return data.map((winner) => [
    {
      text: winner.round, // 回合
      class: "text-center",
      image: null,
    },
    {
      text: winner.winner, // 贏家名字
      class: "leaderboard-name",
      image: winner.winnerIconUrl, // 贏家頭像 URL
    },
    {
      text: formatDate(winner.transactionDateTime), // 比賽時間
      class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
      image: null,
    },
    {
      text: null, // 驗證圖片
      class: "text-end pe-3 pe-sm-5",
      image: verify, // 使用 API 返回的驗證圖片 URL 或默認圖片
      link: winner.transactionUrl, // API 返回的交易鏈接
      target: "_blank", // 新窗口打開
    },
  ]);
};

const headers = [
  { text: "Round", class: "text-center" },
  { text: "Winner" },
  { text: "Time", class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0" },
  { text: "Verify", class: "text-end pe-3 pe-sm-5" },
];

// const historyData = ref([
//   [
//     { text: "1546", class: "text-center", image: null },
//     {
//       text: "hehe15235",
//       class: "leaderboard-name",
//       image: nft01,
//     },
//     {
//       text: "2024/06/13 18:24:53",
//       class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
//       image: null,
//     },
//     {
//       text: null,
//       class: "text-end pe-3 pe-sm-5",
//       image: verify,
//     },
//   ],
//   [
//     { text: "1545", class: "text-center", image: null },
//     {
//       text: "1515djijiedd",
//       class: "leaderboard-name",
//       image: nft02,
//     },
//     {
//       text: "2024/06/12 20:16:03",
//       class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
//       image: null,
//     },
//     {
//       text: null,
//       class: "text-end pe-3 pe-sm-5",
//       image: verify,
//     },
//   ],
//   [
//     { text: "1544", class: "text-center", image: null },
//     {
//       text: "ohjiemdl88556",
//       class: "leaderboard-name",
//       image: nft03,
//     },
//     {
//       text: "2024/06/11 14:08:23",
//       class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
//       image: null,
//     },
//     {
//       text: null,
//       class: "text-end pe-3 pe-sm-5",
//       image: verify,
//     },
//   ],
//   [
//     { text: "1543", class: "text-center", image: null },
//     {
//       text: "12345678",
//       class: "leaderboard-name",
//       image: nft04,
//     },
//     {
//       text: "2024/06/10 09:30:15",
//       class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
//       image: null,
//     },
//     {
//       text: null,
//       class: "text-end pe-3 pe-sm-5",
//       image: verify,
//     },
//   ],
//   [
//     { text: "1542", class: "text-center", image: null },
//     {
//       text: "abcdefg",
//       class: "leaderboard-name",
//       image: nft05,
//     },
//     {
//       text: "2024/06/09 16:45:50",
//       class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
//       image: null,
//     },
//     {
//       text: null,
//       class: "text-end pe-3 pe-sm-5",
//       image: verify,
//     },
//   ],
// ]);
// 模擬歷史紀錄 功能結束

const votes = ref(null); // 使用 ref 來讓 votes 成為響應式變量
const maxVotes = ref(null);

const gameDetails = ref({}); // 初始化遊戲資料
const route = useRoute(); // 獲取路由對象

// 定義重新獲取遊戲資料的函數
const loadGameDetails = async () => {
  const gameId = route.params.gameId; // 獲取路由參數中的 gameId
  try {
    // 調用 API 獲取遊戲資料
    const response = await getGameRoom(gameId);
    if (response && response.data.data) {
      votes.value = response.data.data.betQuantityTotal;
      maxVotes.value = response.data.data.maxQuantity;
      gid.value = response.data.data.gId;
      gameDetails.value = response.data.data; // 更新遊戲資料
      console.log("loadGameDetails 中的 gid:", gid.value); // 確認 gid 已正確賦值
    } else {
      console.error("未獲取到有效的遊戲資料");
    }
  } catch (error) {
    console.error("獲取遊戲資料時發生錯誤：", error);
  }
};

// 初始化時調用一次，獲取遊戲資料
onMounted(async () => {
  await loadGameDetails(); // 等待 API 請求完成後再做其他操作
  // 初始化加載第一頁數據
  await fetchPageData(1);
});

// 監聽路由參數變化，當 gameId 改變時重新加載數據
watch(
  () => route.params.gameId, // 假設路由參數是 gameId
  (newGameId) => {
    loadGameDetails(newGameId); // 當參數變化時重新加載數據
  }
);

// 正確地使用 provide 傳遞響應式對象本身，而不是它的值
provide("gameDetails", gameDetails); // 傳遞 ref 對象，而不是 .value
provide("votes", votes); // 傳遞 ref 對象
provide("maxVotes", maxVotes); // 傳遞 ref 對象
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
