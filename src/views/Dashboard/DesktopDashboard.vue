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
                onclick="window.location.href='account/deposit';"
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
                    :imageFirst="false"
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

      <div class="dashboard-page-nav mt-5 d-flex justify-content-center">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li class="page-item" active>
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import ChangePicModal from "./component/ChangePicModal.vue";
import TableComponent from "@/components/TableComponent.vue";
import USDTIcon from "@/assets/images/icon/USDT.svg";
import USDCIcon from "@/assets/images/icon/USDC.svg";
import BNBIcon from "@/assets/images/icon/BNB-account.svg";
import BTCIcon from "@/assets/images/icon/BTC-account.svg";
import BalanceIcon from "@/assets/images/icon/balance-icon.png";
import VerifyIcon from "@/assets/images/icon/arcoDesign-launch 1.svg";
import GetRewardsModal from "./component/GetRewardsModal.vue";
import NicknameReviseModal from "./component/NicknameReviseModal.vue";
import { useUserStore } from "@/stores/user";
import modules from "@/services/modules";

const userStore = useUserStore();
const showChangePicModal = ref(false);
const showGetRewardsModal = ref(false);
const showNicknameReviseModal = ref(false);
const userName = ref("");
let userInfo = ref([]);
let balance;

const openChangePicModal = () => {
  showChangePicModal.value = true;
};

const openGetRewardsModal = () => {
  showGetRewardsModal.value = true;
};

const openNicknameReviseModal = () => {
  showNicknameReviseModal.value = true;
};

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

const tableData = [
  [
    { text: "2024-08-27 10:00:01", class: "ps-5" },
    { text: "Rewards" },
    { text: "100", image: BNBIcon, class: "text-end" },
    { image: VerifyIcon, class: "text-center" },
  ],
  [
    { text: "2024/06/12 20:16:03", class: "ps-5" },
    { text: "Deposit", image: USDTIcon, imageStyle: "max-width: 22px" },
    { text: "50", image: BalanceIcon, class: "text-end" },
    { image: VerifyIcon, class: "text-center" },
  ],
  [
    { text: "2024-08-27 10:00:01", class: "ps-5" },
    { text: "Rewards" },
    { text: "100", image: BTCIcon, class: "text-end" },
    { image: VerifyIcon, class: "text-center" },
  ],
  [
    { text: "2024/06/12 20:16:03", class: "ps-5" },
    { text: "Deposit", image: USDCIcon, imageStyle: "max-width: 22px" },
    { text: "50", image: BalanceIcon, class: "text-end" },
    { image: VerifyIcon, class: "text-center" },
  ],
];

const avatars = [
  "@/assets/images/icon/NFT/02.png",
  "@/assets/images/icon/NFT/01.png",
  "@/assets/images/icon/NFT/03.png",
  "@/assets/images/icon/NFT/04.png",
  "@/assets/images/icon/NFT/05.png",
  "@/assets/images/icon/NFT/06.png",
  "@/assets/images/icon/NFT/07.png",
  "@/assets/images/icon/NFT/09.png",
];

const rewardsData = [
  [
    { text: "1752", class: "ps-5" },
    { text: "2024/06/12 20:16:03" },
    { text: "BNB", image: BNBIcon, class: "text-end pe-4" },
    { text: "0.576", class: "text-end" },
    { image: VerifyIcon, class: "text-center" },
  ],
  [
    { text: "1752", class: "ps-5" },
    { text: "2024/06/12 20:16:03" },
    { text: "BNB", image: BNBIcon, class: "text-end pe-4" },
    { text: "0.576", class: "text-end" },
    { image: VerifyIcon, class: "text-center" },
  ],
];

// 被子組件通知更換新名稱
const onNicknameChanged = (newNickname) => {
  userStore.updateNickname(newNickname);
};

// 被子組件通知更換新頭像
const onAvatarChanged = (newAvatarUrl) => {
  userStore.updateAvatar(newAvatarUrl);
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

onMounted(() => {
  loadUserInfo(); // 載入用戶信息
});

// 加載用戶信息的函數
const loadUserInfo = async () => {
  console.log("變更暱稱成功");
  userInfo.value = await userStore.fetchUserInfo(); // 調用 API 更新 userInfo
  balance = userInfo.value.balanceData.balance.toLocaleString("en-US");
  userName.value = userInfo.value.name;
};
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
