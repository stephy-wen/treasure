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
import dayjs from "dayjs";
import { onMounted, ref, onBeforeUnmount, provide, watch } from "vue";
import { useRoute } from "vue-router";
import modules from "@/services/modules.js";
import verify from "@/assets/images/icon/arcoDesign-launch 1.svg";

import MobileDetail from "./MobileDetail.vue";
import DeskTopDetail from "./DeskTopDetail.vue";
import TableComponent from "@/components/TableComponent.vue";
import Pagination from "@/components/Pagination.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

// 引入 API 模組
const {
  game: { getGameRoom, getGameWinnerHistory },
  userInfo: { getAccountInfo },
} = modules;

const withGamePlayData = true;
const withRewardData = false;
const withRewardBalanceData = true;

const isMobile = ref(window.innerWidth < 575.98);
const gameDetails = ref({}); // 初始化遊戲資料
const votes = ref(null); // 使用 ref 來讓 votes 成為響應式變量
const maxVotes = ref(null);
const route = useRoute(); // 獲取路由對象

// 項目總數和每頁項目數
const gid = ref(null); // 用來保存遊戲資料中的 gid
const currentItems = ref([]); // 當前頁面的數據
const totalItems = ref(0); // 總項目數
const itemsPerPage = ref(5); // 每頁顯示 5 筆
const pageCache = ref({}); // 緩存每一頁的資料

// 處理視窗大小變化
const handleResize = () => {
  isMobile.value = window.innerWidth < 575.98;
};

// 定義重新獲取遊戲資料的函數
const loadGameDetails = async () => {
  const gameId = route.params.gameId; // 獲取路由參數中的 gameId
  try {
    // 取得 token
    const token = localStorage.getItem("token");

    // 構建 Promise 列表，先將不需要 token 的 API 放進去
    const promises = [getGameRoom(gameId)];

    // 如果 token 存在，將需要 token 的 API 加入 Promise 列表
    if (token) {
      promises.push(
        getAccountInfo(withGamePlayData, withRewardData, withRewardBalanceData)
      );
    }

    // 使用 Promise.all 來執行所有的 Promise
    const [gameResponse, accountInfo] = await Promise.all(promises);

    // 確保 API 返回了有效的遊戲數據
    if (gameResponse && gameResponse.data.data) {
      const gameData = gameResponse.data.data;
      votes.value = gameData.betQuantityTotal;
      maxVotes.value = gameData.maxQuantity;
      gid.value = gameData.gId;
      gameDetails.value = gameData; // 更新遊戲資料
    } else {
      console.error("未獲取到有效的遊戲資料");
    }

    // 處理 accountInfo 資料，更新寶藏點與餘額
    if (accountInfo && accountInfo.data.data) {
      const accountData = accountInfo.data.data;

      // 確保 playHistoryData 是數組，並更新 store
      const treasureSpot = Array.isArray(accountData.playHistoryData)
        ? accountData.playHistoryData
        : [];
      userStore.updateTreasureSpot(treasureSpot);

      // 確保 balanceData 存在並更新 store
      const balance = accountData.balanceData?.balance || 0;
      userStore.updateBalance(balance);
    } else {
      console.error("No valid account information was obtained.");
    }
  } catch (error) {
    console.error("獲取資料時發生錯誤：", error);
  }
};

// 歷史資料
const fetchPageData = async (pageIndex) => {
  try {
    if (!gid.value) {
      console.error("gid 尚未獲取到，無法加載歷史資料");
      return;
    }

    // 檢查是否有緩存
    if (pageCache.value[pageIndex]) {
      currentItems.value = pageCache.value[pageIndex];
      return;
    }

    // 調用 API 獲取歷史資料
    const response = await getGameWinnerHistory(
      gid.value,
      itemsPerPage.value,
      pageIndex
    );

    if (response && response.data.data) {
      currentItems.value = formatHistoryData(response.data.data.items); // 該頁資料的整理
      totalItems.value = response.data.data.total; // 總筆數
    } else {
      console.error("未獲取到有效的歷史資料");
    }
  } catch (error) {
    console.error("獲取歷史時發生錯誤：", error);
  }
};

const formatHistoryData = (data) => {
  return data.map((winner) => [
    {
      text: winner.round,
      class: "text-center",
      image: null,
    },
    {
      text: winner.winner,
      class: "leaderboard-name",
      image: winner.winnerIconUrl,
    },
    {
      text: formatDate(winner.transactionDateTime),
      class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0",
      image: null,
    },
    {
      text: null,
      class: "text-end pe-3 pe-sm-5",
      image: verify,
      link: winner.transactionUrl,
      target: "_blank",
    },
  ]);
};

// ------------ 歷史資料顯示用的header配置 ------------
const headers = [
  { text: "Round", class: "text-center" },
  { text: "Winner" },
  { text: "Time", class: "d-none d-sm-table-cell text-end pe-3 pe-sm-0" },
  { text: "Verify", class: "text-end pe-3 pe-sm-5" },
];

const formatDate = (isoDateString) =>
  dayjs(isoDateString).format("YYYY/MM/DD HH:mm:ss");

onMounted(async () => {
  window.addEventListener("resize", handleResize); // 綁定螢幕大小監聽事件
  await loadGameDetails(); // 先加載遊戲詳情
  await fetchPageData(1); // 再加載歷史紀錄第一頁
});

// 監聽路由參數變化，當 gameId 改變時重新加載數據
watch(
  () => route.params.gameId,
  (newGameId) => {
    loadGameDetails(newGameId); // 當參數變化時重新加載數據
    fetchPageData(1); // 當前id改變撈取新資料
  }
);

onBeforeUnmount(() => {
  // 組件銷毀時移除螢幕大小監聽
  window.removeEventListener("resize", handleResize);
});

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
