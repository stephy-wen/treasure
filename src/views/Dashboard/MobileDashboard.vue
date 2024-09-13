<template>
  <div>
    <div class="winnie-account">
      <div class="personal-info text-center">
        <div class="avatar-photo">
          <img
            class="my-3"
            style="width: 60px"
            src="@/assets/images/icon/NFT/09.png"
            alt=""
          />
          <p class="fs-4 fw-bold">{{ userInfo.name }}</p>
          <p class="fs-6 fw-bold winnie-color-gray">
            {{ userInfo.userId }}
            <img
              class="ms-2"
              src="@/assets/images/icon/md-content_copy 1.svg"
              alt=""
              @click="copyUserId"
            />
          </p>
        </div>
      </div>

      <div class="d-flex justify-content-center">
        <div class="winnie-account-detail">
          <div class="container tabs my-3 px-3">
            <div class="d-flex justify-content-center align-items-center">
              <!-- redirect deposit -->
              <div class="p-2 text-center">
                <a href="account/deposit">
                  <button class="mb-2">
                    <img
                      class="p-1"
                      src="@/assets/images/icon/semiDesign-semi-icons-plus 1.svg"
                      alt=""
                    />
                  </button>
                  <p class="fs-6 fw-bold">Deposit</p>
                </a>
              </div>

              <!-- open Rewards -->
              <div class="p-2 text-center">
                <a href="#">
                  <button class="d-md-none mb-2" @click="openGetRewardsModal">
                    <img
                      class="p-1"
                      src="@/assets/images/icon/antFill-gift 1.svg"
                      alt=""
                    />
                  </button>
                  <p class="fs-6 fw-bold">Share</p>
                </a>
              </div>
              <GetRewardsModal
                :isOpen="showGetRewardsModal"
                @closeModal="showGetRewardsModal = false"
                :userId="userInfo.userId"
              />
              <!-- redirect setting -->
              <div class="p-2 text-center">
                <a href="#">
                  <button
                    class="d-md-none mb-2"
                    onclick="window.location.href='setting';"
                  >
                    <img
                      class="p-1"
                      src="@/assets/images/icon/antOutline-setting 1.svg"
                      alt=""
                    />
                  </button>
                  <p class="fs-6 fw-bold">Setting</p>
                </a>
              </div>
            </div>
          </div>

          <div
            class="d-flex justify-content-between align-items-center px-4 my-4"
          >
            <img src="@/assets/images/icon/balance-icon.png" alt="" />
            <span class="fw-bold" style="font-size: 32px">{{ balance }}</span>
          </div>

          <div class="container px-3 px-sm-0 mt-3">
            <div class="rewards-detail">
              <div class="d-flex justify-content-center">
                <div
                  class="accordion accordion-flush"
                  id="accordionRewardsItem"
                >
                  <div class="accordion-item">
                    <h2 class="accordion-header" id="accordionRewardsHeading">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#accordionRewardsDetail"
                        aria-expanded="false"
                        aria-controls="accordionRewardsDetail"
                      >
                        <img
                          class="me-2"
                          src="@/assets/images/icon/fab fa-btc.svg"
                          alt=""
                        />
                        <span class="fs-5 fw-bold">Rewards</span>
                      </button>
                    </h2>
                  </div>
                  <div
                    id="accordionRewardsDetail"
                    class="accordion-collapse collapse"
                    aria-labelledby="accordionRewardsHeading"
                    data-bs-parent="#accordionRewardsItem"
                  >
                    <div class="accordion-body p-0">
                      <a href="#">
                        <div class="accordion-li p-4 mt-2">
                          <div class="d-flex justify-content-between">
                            <div class="crypto-type d-flex">
                              <img
                                class="me-2"
                                style="width: 36px"
                                src="@/assets/images/icon/BNB.svg"
                                alt=""
                              />
                              <div
                                class="crypto-name d-flex flex-column justify-content-center"
                              >
                                <p class="">BNB</p>
                                <p class="winnie-color-gray">Binance</p>
                              </div>
                            </div>
                            <p class="rewards-amount fw-bold">0.576</p>
                          </div>
                          <div
                            class="d-flex justify-content-between time-stamp mt-3 winnie-color-gray"
                          >
                            <p>Timestamp</p>
                            <p>2024/06/13 18:24:53</p>
                          </div>
                          <div
                            class="d-flex justify-content-between round mt-2"
                          >
                            <p class="winnie-color-gray">Round 1768</p>
                            <img
                              src="@/assets/images/icon/md-file_upload Copy 2.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                      <a href="#">
                        <div class="accordion-li p-4 mt-2">
                          <div class="d-flex justify-content-between">
                            <div class="crypto-type d-flex">
                              <img
                                class="me-2"
                                style="width: 36px"
                                src="@/assets/images/icon/BNB.svg"
                                alt=""
                              />
                              <div
                                class="crypto-name d-flex flex-column justify-content-center"
                              >
                                <p>BNB</p>
                                <p class="winnie-color-gray">Binance</p>
                              </div>
                            </div>
                            <p class="rewards-amount fw-bold">0.576</p>
                          </div>
                          <div
                            class="d-flex justify-content-between time-stamp mt-3 winnie-color-gray"
                          >
                            <p>Timestamp</p>
                            <p>2024/06/13 18:24:53</p>
                          </div>
                          <div
                            class="d-flex justify-content-between round mt-2"
                          >
                            <p class="winnie-color-gray">Round 1768</p>
                            <img
                              src="@/assets/images/icon/md-file_upload Copy 2.svg"
                              alt=""
                            />
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TransactionDetail month="June, 2024" :transactions="transaction" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

import GetRewardsModal from "./component/GetRewardsModal.vue";
import TransactionDetail from "../../components/AccordionComponent.vue";

import { useUserStore } from "@/stores/user";
import modules from "@/services/modules";
import { getCurrencyIcon } from "@/assets/images.js";

import VerifyIcon from "@/assets/images/icon/arcoDesign-launch 1.svg";
import UploadIcon from "@/assets/images/icon/md-file_upload Copy 2.svg";

const {
  userInfo: { getGameRewardHistory },
  auth: { getTransactionLog },
} = modules;

const router = useRouter();
const userStore = useUserStore();

const showGetRewardsModal = ref(false);
const userInfo = ref({});
const balance = ref(null); // 改為響應式變量
const tableData = ref([]);
const rewardsData = ref([]);

// 加載用戶信息的函數
const loadUserInfo = async () => {
  userInfo.value = await userStore.fetchUserInfo(); // 調用 API 更新 userInfo
  balance.value = userInfo.value.balanceData.balance.toLocaleString("en-US");
};

// 調用 API 獲取歷史資料
const fetchPageData = async (pageIndex) => {
  try {
    const response = await getTransactionLog(
      transactionType,
      itemsPerPage.value,
      pageIndex
    );
    console.log(response);
    if (response && response.data.data) {
      tableData.value = formatHistoryData(response.data.data.items); // 該頁資料的整理
      totalItems.value = response.data.data.total; // 總筆數
    } else {
      console.error("未獲取到有效的歷史資料");
    }
  } catch (error) {
    console.error("獲取歷史時發生錯誤：", error);
  }
};

const getRewards = async () => {
  try {
    const res = await getGameRewardHistory();
    if (res && res.data.data) {
      rewardsData.value = formatRewardsData(res.data.data); // 該頁資料的整理
    }
  } catch (error) {
    console.log(error);
  }
};

const formatHistoryData = (data) => {
  return data.map((history) => [
    {
      text: formatDate(history.transactionDateTime),
      class: "ps-5",
      image: null,
    },
    {
      text: history.type,
      image:
        history.type === "Deposit" ? getCurrencyIcon(history.sourceSymbol) : "",
      imageStyle: history.type === "Deposit" ? "max-width: 22px" : "",
      class: "",
    },
    {
      text: history.amount,
      image: getCurrencyIcon(history.symbol),
      class: "text-end",
    },
    {
      image: VerifyIcon,
      class: "text-center",
      link: history.transactionUrl,
      target: "_blank",
    },
  ]);
};

const formatDate = (isoDateString) =>
  dayjs(isoDateString).format("YYYY/MM/DD HH:mm:ss");

const formatRewardsData = (data) => {
  return data.map((reward) => {
    return [
      { text: reward.round, class: "ps-5" }, // rewardId
      { text: formatDate(reward.time) }, // 格式化的日期
      {
        text: reward.rewardSymbol,
        image: getCurrencyIcon(reward.rewardSymbol),
        class: "text-end pe-4",
      }, // 幣種符號及圖標
      { text: reward.rewardAmount, class: "text-end" }, // 獎勵數量
      {
        image: UploadIcon,
        class: "text-center",
        link: `/account/reward/${reward.rewardId}`,
        target: "_self",
      },
    ];
  });
};

// 定義一個方法來複製 userId 到剪貼板
const copyUserId = async () => {
  try {
    await navigator.clipboard.writeText(userInfo.value.userId);
    ElMessage({
      message: "User ID 已成功複製到剪貼板！",
      type: "success",
    });
  } catch (error) {
    ElMessage.error({
      message: "複製失敗，請重試！",
      duration: 3000,
    });
  }
};

const openGetRewardsModal = () => {
  showGetRewardsModal.value = true;
};

const transaction = ref([
  { type: "Deposit", amount: "4,000", timestamp: "2024/06/13 18:24:53" },
  { type: "Withdraw", amount: "2,000", timestamp: "2024/06/13 18:24:53" },
]);

onMounted(async () => {
  await Promise.all([loadUserInfo(), getRewards()]);
});
</script>

<style scoped>
.fw-bold {
  font-weight: 600 !important;
}

.winnie-account-detail a p {
  color: #f8f8f8;
}

.winnie-account-detail a button {
  color: #f8f8f8;
  background-color: #2b3139;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

.winnie-account-detail a button:hover,
.winnie-account-detail a button:focus {
  color: #f8f8f8;
  background-color: #414d5a;
}

.winnie-account .accordion {
  --bs-accordion-border-width: none;
}

.winnie-account .accordion-li {
  background-color: #1e2329;
}

.winnie-account .accordion-item {
  border-radius: 8px !important;
  background-color: #2b3139;
}

.winnie-account .accordion-button {
  background-color: #2b3139;
  color: #f8f8f8;
  border-radius: 8px !important;
}

.rewards-detail .time-stamp,
.rewards-detail .round {
  font-size: 14px;
}

.winnie-account .winnie-color-gray {
  color: #bbb !important;
}

.winnie-account .winnie-color-white {
  color: #f8f8f8;
}

.winnie-account .accordion-button:focus {
  box-shadow: none;
}

.winnie-account .accordion {
  width: 276px;
}

@media (min-width: 412px) and (max-width: 575.98px) {
  .winnie-account .accordion {
    width: 380px;
  }
}

.tabs .p-2 {
  flex: 1;
  max-width: 100px;
}

.tabs .p-2 img {
  width: 36px;
}

.winnie-account .more-btn button {
  width: 100%;
  background-color: #2b3139;
  color: #f8f8f8;
  border: none;
  border-radius: 8px;
}

.winnie-account .more-btn button:active {
  background-color: #414d5a;
}

.accordion-button.collapsed::after,
.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}
</style>
