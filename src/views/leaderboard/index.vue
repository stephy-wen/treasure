<template>
  <div class="container mt-5 px-3 px-lg-0">
    <div class="leaderboard-title mb-5">
      <p class="fw-bold fs-1">Leaderboard: Top Points Earners</p>
    </div>
    <div class="d-flex justify-content-between">
      <!-- 動態生成加密貨幣按鈕 -->
      <div class="d-flex flex-wrap col-12 text-end crypto-type-btn">
        <button
          v-for="crypto in cryptos"
          :key="crypto.fullName"
          class="btn-crypto"
          @click="handleCurrencyChange(crypto.symbol)"
        >
          <img :src="getCurrencyIcon(crypto.symbol)" :alt="crypto.symbol" />
          {{ crypto.symbol }}
        </button>
      </div>

      <!-- 固定的週與總數按鈕 -->
      <div class="d-flex col-12 col-sm-auto text-end">
        <button
          class="btn-crypto"
          :class="{ active: selectedTimePeriod === 'week' }"
          @click="handleTimePeriodChange('week')"
        >
          Week
        </button>
        <button
          class="ms-2 btn-crypto"
          :class="{ active: selectedTimePeriod === 'total' }"
          @click="handleTimePeriodChange('total')"
        >
          Total
        </button>
      </div>
    </div>

    <div class="leaderboard-container">
      <table class="table table-borderless fw-bold custom-rounded mt-5">
        <thead>
          <tr>
            <th class="text-center" scope="col">#</th>
            <th scope="col">Profile</th>
            <th class="text-end pe-3 pe-sm-5" scope="col">
              {{ selectedTimePeriod === "week" ? "Week" : "Total" }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in leaderBoardData" :key="item.rank">
            <th scope="row">{{ item.rank }}</th>
            <td class="leaderboard-name">
              <img class="img-fluid" :src="item.playerIconUrl" alt="" />
              {{ item.player }}
            </td>
            <td class="d-none d-sm-table-cell text-end pe-3 pe-sm-5">
              {{ item.volume }}
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        @page-changed="getData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCurrencyIcon } from "@/assets/images.js";
import modules from "@/services/modules";
import Pagination from "@/components/Pagination.vue";
import { ElMessage } from "element-plus";

const {
  game: { getGameLeaderBoard },
  asset: { getCryptocurrencySetting },
} = modules;

const leaderBoardData = ref([]);
const totalItems = ref(0); // 總項目數
const itemsPerPage = ref(5); // 每頁顯示 5 筆

const cryptos = ref([]);
const selectedCurrency = ref("ETH"); // 預設顯示 ETH 排行榜 等api來 改成第一筆
const selectedTimePeriod = ref("total"); // 預設顯示 total 排名
const isLoading = ref(false); // 加載狀態

const getData = async (pageIndex) => {
  isLoading.value = true;
  try {
    const response = await getGameLeaderBoard(
      selectedCurrency.value,
      selectedTimePeriod.value,
      itemsPerPage.value,
      pageIndex
    );
    // 防呆處理：確認數據存在
    if (response && response.data && response.data.data) {
      leaderBoardData.value = response.data.data.items;
      totalItems.value = response.data.data.total;
    }
  } catch (error) {
    ElMessage.error({
      message: "無法取得排行榜，請稍後再試！",
      duration: 3000,
    });
  } finally {
    isLoading.value = false; // 完成後關閉加載狀態
  }
};

// 貨幣切換處理
const handleCurrencyChange = (currency) => {
  selectedCurrency.value = currency;
  getData(1); // 每次切換貨幣時重置為第一頁
};

// 時間範圍切換處理
const handleTimePeriodChange = (timePeriod) => {
  selectedTimePeriod.value = timePeriod;
  getData(1); // 每次切換時間範圍時重置為第一頁
};

const getCurrencyData = async () => {
  isLoading.value = true; // 設置為加載狀態
  try {
    const res = await getCryptocurrencySetting();

    // 防呆處理：確認數據存在
    if (res && res.data && res.data.data && res.data.data.reward) {
      cryptos.value = res.data.data.reward.supportCoins; // 拿貨幣資料
      if (cryptos.value.length > 0) {
        selectedCurrency.value = cryptos.value[0].symbol; // 拿第一筆當預設
      }
    }
  } catch (error) {
    console.error("getCryptocurrencySetting error:", error);
    ElMessage.error({
      message: "get Cryptocurrency Setting error.Please try again later!",
      duration: 3000,
    });
  } finally {
    isLoading.value = false; // 完成後關閉加載狀態
  }
};

onMounted(() => {
  getData(1);
  getCurrencyData();
});
</script>

<style scoped>
.btn-crypto {
  padding: 3px 5px;
  background-color: #1e2329;
  color: floralwhite;
  margin-right: 10px;
}

/* 增加一些簡單的樣式來顯示選中的按鈕 */
button.active {
  background-color: black;
  color: white;
}

.leaderboard-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  height: auto;
  margin-bottom: 20px;
}

.leaderboard-btn button {
  flex: 1;
  padding: 5px 30px;
  border-radius: 4px;
  border: none;
  background-color: #2b3139;
  color: #f8f8f8;
}

.leaderboard-btn button:hover {
  background-color: #414d5a;
}

.leaderboard-container .table {
  --bs-table-bg: #1e2329;
  color: #f8f8f8;
  --bs-table-color: none;
  width: 100%;
  margin: 0;
}

.leaderboard-container .table th,
.leaderboard-container .table td {
  vertical-align: middle;
}

.leaderboard-container thead {
  color: #bbb;
}

.leaderboard-container .table tbody tr th {
  color: #bbb;
  text-align: center;
}

.leaderboard-container .table tbody tr:hover {
  background-color: #414d5a;
}

.leaderboard-container .table img {
  max-width: 35px;
  margin-right: 10px;
}

.custom-rounded {
  border-radius: 15px;
  overflow: hidden;
}

@media (max-width: 767.98px) {
  .leaderboard-container .table {
    --bs-table-bg: none;
  }
  .leaderboard-container .table img {
    max-width: 24px;
  }
  .leaderboard-name {
    font-size: 0.75rem;
  }
  .leaderboard-container .table img {
    margin-right: 5px;
  }
}

.leaderboard-page-nav .pagination {
  --bs-pagination-bg: transparent;
  --bs-pagination-border-color: none;
  --bs-pagination-focus-color: #fcd535;
  --bs-pagination-hover-bg: transparent;
  --bs-pagination-focus-bg: transparent;
  --bs-pagination-hover-color: #fcd535;
  --bs-pagination-color: #415058;
  --bs-pagination-focus-box-shadow: none;
}

.leaderboard-btn .crypto-type-btn button {
  display: flex;
  align-items: center;
  padding: 3px 5px;
  background-color: #1e2329;
  margin-right: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  width: fit-content !important;
  max-width: max-content;
}

.leaderboard-btn .crypto-type-btn button:hover {
  background-color: #414d5a;
}

@media (max-width: 575.98px) {
  .leaderboard-btn .crypto-type-btn button {
    margin-bottom: 8px;
  }
}
</style>
