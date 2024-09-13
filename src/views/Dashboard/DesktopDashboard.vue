<template>
  <div>
    <!-- screen-size-web -->
    <div class="winnie-account-web container d-none d-sm-block">
      <div class="personal-info d-flex flex-wrap">
        <div class="col-12 col-lg-8 col-xl-7 d-flex">
          <div
            class="col-4 col-md-2 avatar-container text-end text-lg-start pe-3 pe-lg-0"
          >
            <img
              class="avatar-photo"
              :src="userInfo.avatarUrl"
              alt="avatar"
              @click="openChangePicModal"
            />
          </div>

          <ChangePicModal
            :isOpen="showChangePicModal"
            @closeModal="showChangePicModal = false"
            @avatarChanged="onAvatarChanged"
          />

          <div class="col-4 d-flex flex-column">
            <div class="d-flex mb-1">
              <p>{{ userInfo.name }}</p>
              <a href="#" @click="openNicknameReviseModal">
                <img
                  class="ms-2"
                  src="@/assets/images/icon/iconPark-edit-two 1.svg"
                  alt=""
              /></a>
              <router-link to="/manage-password"
                ><img
                  class="ms-2"
                  src="@/assets/images/icon/antFill-lock 1.svg"
                  alt=""
              /></router-link>
            </div>
            <div class="personal-email">
              <p class="winnie-color-gray" style="font-size: 14px">Email</p>
              <p>{{ userInfo.email }}</p>
            </div>
          </div>
          <div class="col-4 ps-3 ps-md-2 col-md-6 d-flex flex-column ms-5">
            <div class="mb-1">
              <button
                class="d-flex align-items-center btn-get-rewards"
                @click="openGetRewardsModal"
              >
                <img
                  class="me-2"
                  src="@/assets/images/icon/antFill-gift 1 (yellow).svg"
                  alt=""
                />Get Rewards!
              </button>
            </div>

            <GetRewardsModal
              :isOpen="showGetRewardsModal"
              @closeModal="showGetRewardsModal = false"
              :userId="userInfo.userId"
            />

            <NicknameReviseModal
              :isOpen="showNicknameReviseModal"
              @closeModal="showNicknameReviseModal = false"
              :userName="userInfo.name"
              @upDataNickname="onNicknameChanged"
            />

            <div class="personal-id">
              <p class="winnie-color-gray" style="font-size: 14px">
                User ID
                <img
                  src="@/assets/images/icon/md-content_copy 1.svg"
                  alt="userId"
                  @click="copyUserId"
                />
              </p>
              <p>{{ userInfo.userId }}</p>
            </div>
          </div>
        </div>
        <div
          class="col-12 col-lg-4 col-xl-5 d-flex flex-column align-items-center align-items-lg-end mt-5 mt-lg-0"
        >
          <div class="personal-balance d-flex align-items-center mb-2 mb-lg-0">
            <img src="@/assets/images/icon/balance-icon.png" alt="" />
            <span class="fs-2 fw-bold ms-2">{{ balance }}</span>
          </div>
          <div class="d-flex">
            <div class="col">
              <button
                class="btn-dashboard bck-yellow fw-bold f-color-dark py-0"
                @click="goToDepositPage"
              >
                Buy Now
              </button>
            </div>
            <div class="col ms-2">
              <div class="dropdown rewards-list-dropdown">
                <button
                  class="d-flex flex-row btn-dashboard justify-content-center align-items-center bck-dark"
                  type="button"
                  id="dropdownMenuRewardsList"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    class="me-2"
                    src="@/assets/images/icon/fab fa-btc.svg"
                    alt=""
                  />
                  <span class="f-color-white fw-bold">Rewards</span>
                </button>
                <!-- rewards-list-start -->
                <ul
                  class="dropdown-menu"
                  aria-labelledby="dropdownMenuRewardsList"
                >
                  <TableComponent
                    Title=""
                    :headers="rewardHeaders"
                    :data="rewardsData"
                    customClass="transparent-bg-table"
                    :imageFirst="true"
                  />
                </ul>
                <!-- rewards-list-end -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="account-form mt-5">
        <TableComponent
          Title=""
          :headers="headers"
          :data="tableData"
          :imageFirst="false"
        />
      </div>

      <Pagination
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
        @page-changed="fetchPageData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

import ChangePicModal from "./component/ChangePicModal.vue";
import GetRewardsModal from "./component/GetRewardsModal.vue";
import NicknameReviseModal from "./component/NicknameReviseModal.vue";
import TableComponent from "@/components/TableComponent.vue";
import Pagination from "@/components/Pagination.vue";

import VerifyIcon from "@/assets/images/icon/arcoDesign-launch 1.svg";
import UploadIcon from "@/assets/images/icon/md-file_upload Copy 2.svg";

import { useUserStore } from "@/stores/user";
import modules from "@/services/modules";
import { getCurrencyIcon } from "@/assets/images.js";

const {
  userInfo: { getGameRewardHistory },
  auth: { getTransactionLog },
} = modules;

const router = useRouter();

const userStore = useUserStore();
const showChangePicModal = ref(false);
const showGetRewardsModal = ref(false);
const showNicknameReviseModal = ref(false);
const userInfo = ref({});
const balance = ref(null); // 改為響應式變量
const tableData = ref([]);
const rewardsData = ref([]);
const totalItems = ref(0); // 總項目數
const itemsPerPage = ref(5); // 每頁顯示 5 筆
const transactionType = "All";

const headers = [
  { text: "Timestamp", class: "ps-5" },
  { text: "Type" },
  { text: "Value", class: "text-end pe-4" },
  { text: "Verify", class: "text-center" },
];

const rewardHeaders = [
  { text: "Round", class: "ps-5" },
  { text: "Time" },
  { text: "Type", class: "text-end pe-4" },
  { text: "Value", class: "text-end" },
  { text: "Withdraw", class: "text-center" },
];

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

const formatDate = (isoDateString) =>
  dayjs(isoDateString).format("YYYY/MM/DD HH:mm:ss");

const formatRewardsData = (data) => {
  return data.map((reward) => {
    return [
      { text: reward.round, class: "ps-5" }, // rewardId
      { text: formatDate(reward.time) }, // 格式化的日期
      {
        text: reward.rewardSymbol + " " + reward.rewardSymbol + " 123456789",
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

const openChangePicModal = () => {
  showChangePicModal.value = true;
};

const openGetRewardsModal = () => {
  showGetRewardsModal.value = true;
};

const openNicknameReviseModal = () => {
  showNicknameReviseModal.value = true;
};

const goToDepositPage = () => {
  router.push("/account/deposit");
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

// 被子組件通知更換新名稱
const onNicknameChanged = (newNickname) => {
  userStore.updateNickname(newNickname);
};

// 被子組件通知更換新頭像
const onAvatarChanged = (newAvatarUrl) => {
  userStore.updateAvatar(newAvatarUrl);
};

// 加載用戶信息的函數
const loadUserInfo = async () => {
  userInfo.value = await userStore.fetchUserInfo(); // 調用 API 更新 userInfo
  balance.value = userInfo.value.balanceData.balance.toLocaleString("en-US");
};

onMounted(async () => {
  await Promise.all([loadUserInfo(), getRewards(), fetchPageData(1)]);
});
</script>

<style scoped>
/* web */
.container {
  max-width: 1200px;
}

.winnie-account-web {
  min-height: 65vh;
  margin-top: 5rem;
}

.winnie-account-web .personal-info .avatar-photo {
  width: 72px;
}

.btn-get-rewards {
  border: none;
  background-color: #2b3139;
  color: #fcd535;
  padding: 3px 10px;
  font-size: 12px;
  border-radius: 50px;
}

.btn-dashboard {
  border: none;
  border-radius: 50px;
  width: 150px;
  height: 35px;
}

.bck-yellow {
  background-color: #fcd535;
}

.bck-dark {
  background-color: #2b3139;
}

.winnie-account-web .f-color-white {
  color: #f8f8f8;
}

.winnie-account-web .f-color-dark {
  color: #1e2329;
}

.account-form .table {
  --bs-table-bg: #1e2329;
  color: #f8f8f8;
  --bs-table-color: none;
  width: 100%;
  margin: 0;
}

.account-form .table th,
.account-form .table td {
  vertical-align: middle;
}

.account-form thead {
  color: #bbb;
}

.account-form .table tbody tr th {
  color: #bbb;
  text-align: start;
  padding-left: 5rem;
}

.account-form .table tbody tr:hover {
  --bs-table-hover-bg: #414d5a !important;
}

.account-form .table img {
  max-width: 35px;
}

.custom-rounded {
  border-radius: 15px;
  overflow: hidden;
}

@media (max-width: 767.98px) {
  .account-form .table {
    --bs-table-bg: none;
  }
  .account-form .table img {
    max-width: 24px;
  }
}

.dashboard-page-nav .pagination {
  --bs-pagination-bg: transparent;
  --bs-pagination-border-color: none;
  --bs-pagination-focus-color: #fcd535;
  --bs-pagination-hover-bg: transparent;
  --bs-pagination-focus-bg: transparent;
  --bs-pagination-hover-color: #fcd535;
  --bs-pagination-color: #415058;
  --bs-pagination-focus-box-shadow: none;
}

.account-form .table th {
  min-width: 120px;
}

#changeAvatarModal .modal-header {
  border-bottom: none;
}

#changeAvatarModal .modal-footer {
  border-top: none;
}

.rewards-list-dropdown table th,
.rewards-list-dropdown table td {
  vertical-align: middle;
}

.rewards-list-dropdown .dropdown-menu,
.rewards-list-dropdown .dropdown-menu table th,
.rewards-list-dropdown .dropdown-menu table td {
  background-color: #2b3139;
  color: #f8f8f8;
}

.rewards-list-dropdown .dropdown-menu {
  width: 500px;
}

@media (min-width: 991.98px) {
  .rewards-list-dropdown .dropdown-menu {
    width: 660px;
  }
}

/* setting */

.winnie-dialog-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  transition: transform 0.4s ease-in-out;
}

.modal.fade .winnie-dialog-bottom {
  transform: translateY(100%);
}

.modal.show .winnie-dialog-bottom {
  transform: translateY(0);
}

.winnie-dialog-right {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  transition: transform 0.4s ease-in-out;
}

.modal.fade .winnie-dialog-right {
  transform: translateX(-100%);
}

.modal.show .winnie-dialog-right {
  transform: translateX(0);
}

#changeAvatarModal .modal-dialog,
#changeAvatarModal .modal-content {
  background-color: #2b3139;
  color: #f8f8f8;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

#changeAvatarModal button.save-btn {
  background-color: #414d5a;
  color: #f8f8f8;
  width: 280px;
  border: none;
  border-radius: 10px;
  height: 47px;
}

#nicknameRevisePhoneModal .modal-dialog .modal-content {
  background-color: #181a20;
}

.rewards-list-dropdown .dropdown-menu .leaderboard-container .table {
  --bs-table-bg: transparent;
}
</style>
