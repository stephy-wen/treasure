<template>
  <div>
    <!-- main -->
    <div class="d-flex justify-content-center">
      <div class="winnie-withdraw">
        <div class="container tabs mt-5 px-3 px-lg-0">
          <div class="d-flex justify-content-center align-items-center">
            <div class="p-2 text-center">
              <router-link to="/account/deposit">
                <button class="d-md-none mb-2">
                  <img
                    src="@/assets/images/icon/semiDesign-semi-icons-plus 1.svg"
                    alt=""
                  />
                </button>
                <p class="fw-bold">Deposit</p>
              </router-link>
            </div>
            <div class="divider align-items-center d-none d-md-inline"></div>
            <div class="p-2 text-center">
              <router-link to="/account/withdrawal">
                <button class="d-md-none mb-2">
                  <img
                    src="@/assets/images/icon/iconPark-arrow-down 1.svg"
                    alt=""
                  />
                </button>
                <p class="fw-bold">Withdraw</p>
              </router-link>
            </div>
            <div class="divider align-items-center d-none d-md-inline"></div>
            <div class="p-2 text-center">
              <router-link to="/account/reward">
                <button class="d-md-none mb-2">
                  <img
                    src="@/assets/images/icon/semiDesign-semi-icons-plus 1.svg"
                    alt=""
                  />
                </button>
                <p class="fw-bold">Reward</p>
              </router-link>
            </div>
            <div class="divider align-items-center d-none d-md-inline"></div>
            <div class="p-2 text-center">
              <router-link to="/dashboard">
                <button class="d-md-none mb-2">
                  <img
                    src="@/assets/images/icon/antOutline-history 1.svg"
                    alt=""
                  />
                </button>
                <p class="fw-bold">History</p>
              </router-link>
            </div>
          </div>
        </div>
        <div class="container px-3 px-sm-0 mt-5">
          <div class="step-container step-one">
            <div>
              <div class="step-title">
                <div class="circle-number active me-4">1</div>
                <h5>Select Coin</h5>
              </div>
              <div class="d-flex justify-content-center align-items-center">
                <div class="vertical-line active d-none d-md-block me-5"></div>
                <div>
                  <!-- 第一個選單 帶roomId -->
                  <el-select
                    v-model="selectedCoin"
                    size="large"
                    placeholder="Select Coin"
                    class="d-flex align-items-center my-4 my-sm-0 py-2"
                    @change="handleCoinChange"
                  >
                    <template #prefix>
                      <el-image
                        v-if="selectedCoinImagePath"
                        :src="selectedCoinImagePath"
                        style="width: 20px; height: 20px; margin-right: 5px"
                      ></el-image>
                    </template>
                    <el-option
                      v-for="item in coinOptions"
                      :key="item.rewardSymbol"
                      :value="item.rewardSymbol"
                      :label="item.rewardFullName"
                    >
                      <template #default>
                        <div class="option-content">
                          <el-image
                            :src="getCurrencyIcon(item.rewardSymbol)"
                            style="
                              width: 20px;
                              height: 20px;
                              margin-right: 10px;
                            "
                          ></el-image>
                          {{ item.rewardFullName }}
                        </div>
                      </template>
                    </el-option>
                  </el-select>
                  <!-- 第二個選單 帶rewardId-->
                  <el-select
                    v-model="selectedRewardInfo"
                    size="large"
                    placeholder="Select Reward Info"
                    class="d-flex align-items-center my-4 my-sm-0"
                    @change="handleStepOneComplete"
                  >
                    <el-option
                      v-for="reward in filteredRewards"
                      :key="reward.rewardId"
                      :value="reward.rewardId"
                      :label="`Round: ${reward.round} Reward: ${
                        reward.rewardAmount
                      } Time: ${formatDate(reward.time)}`"
                    >
                      <template #default>
                        <div class="option-content">
                          <span>
                            Round: {{ reward.round }} - Reward:
                            {{ reward.rewardAmount }} - Time:
                            {{ formatDate(reward.time) }}
                          </span>
                        </div>
                      </template>
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <!-- 插入剪下的內容 -->
          <!-- Step 2 -->
          <div v-if="stepOneComplete" class="step-container step-two">
            <div>
              <div class="step-title">
                <div class="circle-number me-4">2</div>
                <h5>Withdraw to</h5>
              </div>
              <div
                class="d-flex align-items-center justify-content-center mb-3 mb-md-0"
              >
                <div class="vertical-line me-5 d-none d-md-block"></div>
                <div class="mt-3 mt-md-0 winnie-width-xs-100">
                  <!-- 提款地址輸入 -->
                  <el-input
                    v-model="rewardAddress"
                    class="form-control mb-2"
                    id="exampleFormControlInput1"
                    placeholder="Enter your address"
                    size="large"
                    clearable
                  />
                  <!-- 選擇網路 -->
                  <div
                    class="dropdown dropdown-coin d-flex align-items-center my-2 my-sm-0"
                  >
                    <el-select
                      v-model="selectedNetwork"
                      size="large"
                      placeholder="Network"
                      :disabled="true"
                    >
                      <!-- 提醒 -->
                      <div
                        class="deposit-notice-bk-color m-2 p-2 d-flex justify-content-between"
                      >
                        <p>
                          <i
                            class="fa-solid fa-circle-exclamation me-2 winnie-text-white"
                          ></i>
                        </p>
                        <p
                          class="text-start deposit-notice-color"
                          style="font-size: 12px"
                        >
                          Please note that only supported networks on Binance
                          platform are shown, if you deposit via another network
                          your assets may be lost.
                        </p>
                      </div>
                      <el-option
                        v-for="network in selectedCoinNetworks"
                        :key="network"
                        :value="network"
                        :label="network"
                        style="height: 60px"
                      >
                        <template #default>
                          <div class="info">
                            <div
                              class="d-flex justify-content-between align-items-center"
                            >
                              <span
                                class="winnie-text-white"
                                style="color: black"
                              >
                                {{ network }}
                              </span>
                            </div>
                          </div>
                        </template>
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/services/modules";
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useUserStore } from "@/stores/user";
import dayjs from "dayjs";
import { getCurrencyIcon } from "@/assets/images.js";

const userStore = useUserStore();

// 儲存選擇的幣種與對應圖片
const selectedCoin = ref(null);
const selectedCoinImagePath = ref("");
const selectedRewardInfo = ref(null);
const selectedNetwork = ref(null); // 選中的網路

const gameRewardHistoryData = ref([]);
const stepOneComplete = ref(false); // 控制 Step 2 顯示
const stepTwoComplete = ref(false); // 控制 Step 3 顯示
const rewardAddress = ref(""); // 用來提款地址

// 取得個人得獎紀錄
const getUserInfo = async () => {
  try {
    const res = await api.userInfo.getAccountInfo();
    gameRewardHistoryData.value = res.data.data.gameRewardHistoryData;
  } catch (error) {
    console.error("獲取歷史時發生錯誤：", error);
  }
};

// 當選擇幣種改變時
const handleCoinChange = (coin) => {
  selectedCoinImagePath.value = getCurrencyIcon(coin);
};

// 幣種選單
const coinOptions = computed(() => {
  const uniqueCoins = new Set(); // uniqueCoins 用途是幫助 filter() 過濾掉重複的幣種。
  return gameRewardHistoryData.value.filter((item) => {
    if (!uniqueCoins.has(item.rewardSymbol)) {
      uniqueCoins.add(item.rewardSymbol);
      return true; // 保留這個 item
    }
    return false; // gameRewardHistoryData filter 的結果會返回 coinOptions // 如果幣種已經存在，過濾掉這個 item
  });
});

// 選中的幣種對應的獎勵資訊
const filteredRewards = computed(() => {
  return gameRewardHistoryData.value.filter(
    (reward) => reward.rewardSymbol === selectedCoin.value
  );
});

// 根據選擇的幣種篩選出對應的網路 (rewardNetwork)
const selectedCoinNetworks = computed(() => {
  const selectedCoinData = gameRewardHistoryData.value.find(
    (reward) => reward.rewardSymbol === selectedCoin.value
  );
  selectedNetwork.value = selectedCoinData?.rewardNetwork;
  return selectedCoinData ? [selectedCoinData.rewardNetwork] : []; // 返回該幣種的網路
});

// 日期格式化
const formatDate = (isoDateString) => dayjs(isoDateString).format("YYYY/MM/DD");

// Step 1 完成：當獎勵資訊選擇完後顯示 Step 2
const handleStepOneComplete = () => {
  if (selectedRewardInfo.value) {
    stepOneComplete.value = true; // 顯示第二步
  }
};

// Step 2 完成：當填寫提款地址時顯示 Step 3
const handleStepTwoComplete = () => {
  if (!stepTwoComplete.value && params.value.withdrawAddress) {
    stepTwoComplete.value = true; // 一旦設置為 true，保持顯示 Step 3
  }
};

onMounted(async () => {
  await getUserInfo();
});

// 下拉式測試 end
// Email驗證切分格子測試
const codes = ref(["", "", "", "", "", ""]);
const inputRefs = ref([]); // 這將儲存所有 input 的引用

// 當用戶在一格中輸入後，自動跳到下一格
function handleInput(index) {
  if (codes.value[index].length === 1 && index < codes.value.length - 1) {
    inputRefs.value[index + 1].focus();
  }
}

// 當用戶按下 backspace 鍵時，自動退回到前一格
function handleBackspace(index) {
  if (codes.value[index] === "" && index > 0) {
    inputRefs.value[index - 1].focus();
  }
}

// 拼接六個輸入的值，並驗證
function verifyCode() {
  const fullCode = codes.value.join("");
  console.log("Full code:", fullCode);

  // 模擬 API 驗證請求
  verifyCodeWithAPI(fullCode);
}

function verifyCodeWithAPI(code) {
  console.log(`正在驗證 ${code}`);
  // 這裡進行 API 請求來驗證驗證碼是否正確
}
</script>

<style scoped>
/* email test */
.verification-container {
  max-width: 300px;
  margin: 0 auto;
}

.code-input {
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
}

.container {
  width: 100%;
}

@media (max-width: 420px) {
  .winnie-width-xs-100 {
    width: 100% !important;
  }
}

.winnie-withdraw a p {
  color: #f8f8f8;
}

.winnie-withdraw a button {
  color: #f8f8f8;
  background-color: #2b3139;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

.winnie-withdraw a button:hover,
.winnie-withdraw a button:focus {
  color: #f8f8f8;
  background-color: #414d5a;
}

.winnie-withdraw-bk {
  background-color: #2b3139;
  width: 100%;
  border-radius: 8px;
}

.winnie-withdraw .amount-input::placeholder {
  color: #6c757d;
}

@media (min-width: 420px) and (max-width: 575.98px) {
  .winnie-withdraw-bk {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .winnie-withdraw-bk {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .winnie-withdraw-bk {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .winnie-withdraw-bk {
    width: 600px;
  }
}

@media (max-width: 420px) {
  .winnie-withdraw {
    width: 100%;
  }
}

.winnie-withdraw input[type="number"]::-webkit-outer-spin-button,
.winnie-withdraw input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.winnie-withdraw input[type="number"] {
  -moz-appearance: textfield;
}

.step-one .form-control {
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #bbb;
  padding: 8px;
  outline: none;
  border-radius: 0px;
  color: #f8f8f8;
  text-align: end;
}

.step-one .form-control:focus {
  border-bottom: 1px solid #f8f8f8;
  background-color: transparent;
}

.btn {
  --bs-btn-border-color: none;
}

.max-btn {
  border-top: 1px solid #6c757d;
  border-bottom: 1px solid #6c757d;
  background-color: transparent;
  border-radius: 0px;
  color: #f8f8f8;
  padding: 1px 6px;
}

.max-btn:hover,
.max-btn:focus,
.max-btn:active {
  color: #fcd535;
  outline: none;
  box-shadow: none;
  border: none;
  border-top: 1px solid #6c757d;
  border-bottom: 1px solid #6c757d;
}

.max-btn:focus {
  color: #f8f8f8;
}

.step-two .form-control {
  background-color: transparent;
  color: #f8f8f8;
  border: 1px solid #6c757d;
}

.step-two .form-control::placeholder {
  color: #6c757d;
}

.step-three .form-control {
  background-color: transparent;
  border: 1px solid #6c757d;
  color: #f8f8f8;
  border-right: none;
}

.step-three .input-group {
  width: 90%;
}

.step-three .info-section {
  margin-top: 20px;
}

.step-three .info-section .info-row {
  display: flex;
  justify-content: space-between;
}

.step-three #withdrawUnit {
  background-color: transparent;
  border: 1px solid #6c757d;
  color: #f8f8f8;
  border-left: none;
}

.step-three .input-group input {
  color: #f8f8f8;
}

.step-container .step-three .input-group {
  width: 280px;
  background-color: transparent;
}

.step-three .info-section {
  width: 100%;
}

@media (min-width: 420px) and (max-width: 575.98px) {
  .step-container .step-three .input-group,
  .step-three .info-section {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .step-container .step-three .input-group,
  .step-three .info-section {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container .step-three .input-group,
  .step-three .info-section {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container .step-three .input-group,
  .step-three .info-section {
    width: 600px;
  }
}

.winnie-withdraw .withdraw-btn {
  border: none;
  border-radius: 50px;
  background-color: #fcd535;
  padding: 8px 30px;
  color: #2b3139;
}

@media (max-width: 575.98px) {
  .winnie-withdraw .withdraw-btn {
    width: 100%;
    border-radius: 8px;
    padding: 12px;
    margin-top: 10px;
  }
}

.winnie-withdraw .vertical-line {
  width: 1px;
  background-color: #414d5a;
  height: 130px;
  margin: 0 20px;
}

.winnie-withdraw .vertical-line.active {
  background-color: #f8f8f8;
}

#withdrawModal,
#withdrawRemindModal,
#depositRemindModal {
  background-color: rgba(0, 0, 0, 0.5);
}

#withdrawModal .form-control {
  border: none;
  border-bottom: 1px solid #bbbbbb;
  background-color: transparent !important;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.3s ease;
}

#withdrawModal .form-control:focus {
  border-color: #f8f8f8;
  outline: none;
}

#withdrawModal .modal-header,
#withdrawRemindModal .modal-header,
#depositRemindModal .modal-header {
  border-bottom: none;
}

#withdrawModal .modal-footer,
#withdrawRemindModal .modal-footer,
#depositRemindModal .modal-footer {
  border-top: none;
}

#withdrawModal .modal-dialog {
  display: flex;
  align-items: center;
}

#withdrawModal .modal-content {
  background-color: #181a20;
  border: 1px solid #414d5a;
}

#withdrawModal .modal-footer button {
  background-color: #2b3139;
  border: none;
  color: #f8f8f8;
}

#withdrawModal button#withdrawConfirmButton:hover {
  background-color: #414d5a;
}

#withdrawRemindModal button,
#depositRemindModal button {
  background-color: #fcd535;
  color: #181a20;
}

#withdrawRemindModal .modal-content,
#depositRemindModal .modal-content {
  border: 1px solid #414d5a;
}

/* 共用 */

.divider {
  width: 1px;
  height: 30px;
  background-color: #bbb;
  margin: 0px 30px;
}

@media (min-width: 575.98px) {
  .step-container {
    display: flex;
    align-items: flex-start;
    /* margin-bottom: 30px; */
  }
}

.circle-number {
  width: 40px;
  height: 40px;
  background-color: #2b3139;
  color: #3d3d3d;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}

.circle-number.active {
  background-color: #414d5a;
  color: #f8f8f8;
}

.step-title {
  display: flex;
  align-items: center;
  /* margin-bottom: 10px; */
}

.dropdown-menu {
  background-color: #2b3139;
  --bs-dropdown-link-hover-bg: #414d5a;
}

ul li a img {
  max-width: 24px;
}

ul li a .abbr {
  font-weight: bold;
  color: #f8f8f8;
}
ul li a .full-name {
  color: #bbb;
}

.step-container .dropdown-toggle {
  width: 280px;
  background-color: transparent;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  .step-container .dropdown-toggle {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .step-container .dropdown-toggle {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container .dropdown-toggle {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container .dropdown-toggle {
    width: 600px;
  }
}

.step-container ul.dropdown-menu {
  width: 280px;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  .step-container ul.dropdown-menu {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .step-container ul.dropdown-menu {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container ul.dropdown-menu {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container ul.dropdown-menu {
    width: 600px;
  }
}

.winnie-text-white {
  color: #f8f8f8;
}

.winnie-text-gray {
  color: #bbb;
}

.deposit-notice-color {
  color: #f8f8f8;
}

.deposit-notice-bk-color {
  background-color: #414d5a;
  border-radius: 8px;
}

.winnie-fs-small {
  font-size: 12px;
}

.company-address {
  border: 1px solid #565e64;
  color: #f8f8f8;
  border-radius: 8px;
}

.deposit-notice-bottom {
  width: 280px;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  .deposit-notice-bottom {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .deposit-notice-bottom {
    width: 400px;
  }
}

@media (min-width: 767.98px) {
  .deposit-notice-bottom {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .deposit-notice-bottom {
    width: 600px;
  }
}

.company-address p {
  font-size: 16px;
}
@media (min-width: 767.98px) {
  .company-address p {
    font-size: 14px;
  }
}

.qrcode-pic {
  width: 160px;
}

@media (min-width: 767.98px) {
  .qrcode-pic {
    width: 120px;
  }
}
@media (min-width: 991.98px) {
  .qrcode-pic {
    width: 170px;
  }
}

@media (max-width: 768px) {
  .company-address p {
    word-wrap: break-word;
    word-break: break-all;
  }
}

.form-control {
  box-shadow: none;
}

.form-control:focus {
  box-shadow: none;
}

.winnie-btn-close {
  background-color: #2b3139;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

.winnie-btn-close:hover {
  background-color: #414d5a;
}
</style>
<style>
.step-container .el-select__wrapper {
  width: 280px;
  background-color: transparent;
}
@media (min-width: 420px) and (max-width: 575.98px) {
  .step-container .el-select__wrapper {
    width: 380px;
  }
}
@media (min-width: 575.98px) {
  .step-container .el-select__wrapper {
    width: 400px;
  }
}
@media (min-width: 767.98px) {
  .step-container .el-select__wrapper {
    width: 534px;
  }
}
@media (min-width: 991.98px) {
  .step-container .el-select__wrapper {
    width: 600px;
  }
}

.option-content {
  display: flex;
  align-items: center;
}

.step-container .el-select__wrapper {
  background-color: transparent;
  border: 1px solid #6c757d;
  box-shadow: none;
}

.step-container .el-select__placeholder {
  color: #f8f8f8;
}

.step-container .form-control {
  border: 1px solid #6c757d;
}

.step-container .el-select__selection {
  background-color: transparent;
}

.step-container .el-input__wrapper {
  display: flex;
  background-color: transparent;
  box-shadow: none;
}

.step-container .el-input.form-control {
  padding: 0px;
}

.el-select-dropdown__item {
  line-height: 30px;
}

.no-spin-button::-webkit-outer-spin-button,
.no-spin-button::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spin-button input[type="number"]::-webkit-outer-spin-button,
.no-spin-button input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-number {
  -webkit-appearance: textfield;
}
.no-number input[type="number"] {
  -webkit-appearance: textfield;
}

.el-input__inner {
  color: #f8f8f8;
}
</style>

<style>
.el-input.is-disabled .el-input__wrapper {
  background-color: transparent;
  box-shadow: none;
}
</style>
