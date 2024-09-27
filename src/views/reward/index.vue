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
                    @change="
                      () => {
                        handleStepOneComplete();
                        updateRewardDetailsForStepThree();
                      }
                    "
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
                  <div class="form-group">
                    <el-input
                      v-model="rewardAddress"
                      class="form-control mb-2"
                      id="exampleFormControlInput1"
                      placeholder="Enter your address"
                      size="large"
                      clearable
                      @input="handleStepTwoComplete"
                      @blur="validateAddress"
                    />
                    <!-- 如果地址驗證失敗，顯示紅字錯誤訊息 -->
                    <p v-if="addressError" class="text-danger">
                      {{ addressErrorMessage }}
                    </p>
                  </div>
                  <!-- 選擇網路 -->
                  <div
                    class="dropdown dropdown-coin d-flex align-items-center my-2 my-sm-0"
                  >
                    <el-select
                      v-model="selectedNetwork"
                      size="large"
                      placeholder="Network"
                      readonly
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

          <!-- Step 3 -->
          <div v-if="stepTwoComplete" class="step-container step-three">
            <div>
              <div class="step-title">
                <div class="circle-number me-4">3</div>
                <h5>Withdrawl Amount</h5>
              </div>
              <div class="d-flex align-items-center flex-column flex-md-row">
                <div
                  class="vertical-line me-5 d-none d-md-block"
                  style="background-color: transparent; height: 100px"
                ></div>
                <div class="input-group my-3 col-12 col-sm-7">
                  <el-input
                    type="number"
                    class="form-control amount-input"
                    v-model="amount"
                    :disabled="true"
                  />
                  <span class="input-group-text" id="withdrawUnit">{{
                    serviceFeeSymbol
                  }}</span>
                </div>
              </div>
              <div class="d-flex">
                <div
                  class="vertical-line me-5 d-none d-md-block"
                  style="background-color: transparent"
                ></div>
                <div class="info-section">
                  <div class="info-row mb-1 mb-md-2">
                    <span>Available Withdrawal Balance</span>
                    <span class="d-none d-md-inline"
                      >{{ amount }} {{ serviceFeeSymbol }}</span
                    >
                  </div>
                  <!-- withdrawModal -->
                  <div
                    class="info-row justify-content-center justify-content-sm-end mt-4 winnie-width-xs-100"
                  >
                    <button
                      class="withdraw-btn"
                      @click="openWithdrawModal(); checkFormDataAndSendEmail()"
                    >
                      Withdraw
                    </button>
                  </div>
                  <div
                    class="modal fade"
                    id="withdrawModal"
                    tabindex="-1"
                    aria-labelledby="withdrawModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <div
                          class="modal-header d-flex justify-content-between"
                        >
                          <h5 class="modal-title" id="withdrawModalLabel"></h5>
                          <button
                            type="button"
                            class="btn winnie-btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          >
                            <font-awesome-icon icon="fa-solid fa-xmark" />
                          </button>
                        </div>
                        <div class="modal-body px-5">
                          <p class="fs-2 fw-bold">Email Verification</p>
                          <br />
                          <p class="winnie-text-gray">
                            We've sent a code to your email. Please enter it
                            within 30 minutes.
                          </p>
                          <br />
                          <div class="d-flex justify-content-center">
                            <input
                              v-for="(code, index) in codes"
                              :key="index"
                              ref="inputRefs"
                              type="text"
                              class="form-control text-center mx-1 code-input"
                              maxlength="1"
                              v-model="codes[index]"
                              @input="handleInput(index)"
                              @keydown.backspace="handleBackspace(index)"
                              autofocus
                            />
                          </div>
                          <!-- 錯誤訊息開始 -->
                          <p v-if="errorMessage" class="error-message d-flex">
                            <img src="@/assets/images/icon/antOutline-close 1.svg" class="me-2" style="width: 14px;" alt="">
                            <pre>{{ errorMessage }}</pre>
                          </p>
                          <!-- 錯誤訊息結束 -->
                        </div>
                        <div class="modal-footer px-5">
                          <button
                            id="withdrawConfirmButton"
                            type="button"
                            class="btn btn-primary w-100 mb-3 mt-3"
                            @click="WithdrawReward"
                            :disabled="!formValid && !emailVerify"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Result Modal (新的 Modal) -->
                  <ResultModal
                    :isSuccess="isWithdrawSuccess"
                    successMessage="Withdrawal Successful!"
                    errorMessage="Withdrawal Failed. Please try again."
                    @close="closeResultModal"
                  />
                  <!-- 新的modal -->
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
import dayjs from "dayjs";
import ResultModal from '@/components/ResultModal.vue';
import { ref, onMounted, reactive, watch, computed } from "vue";
import { useUserStore } from "@/stores/user";
import { getCurrencyIcon } from "@/assets/images.js";
import { useRoute } from "vue-router";
import { handleApiError } from "@/utils/errorHandler.js";

const route = useRoute();

const userStore = useUserStore();

// 定義是否成功的標誌
const isWithdrawSuccess = ref(false);

// 控制 Withdraw modal 的開關
const openWithdrawModal = () => {
  const withdrawModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('withdrawModal'));
  withdrawModal.show(); // 顯示 Withdraw Modal
};

// 控制 Withdraw modal 和 Result modal
const closeWithdrawModal = () => {
  const withdrawModal = bootstrap.Modal.getInstance(document.getElementById('withdrawModal'));
  withdrawModal.hide(); // 關閉 Withdraw modal
};

const openResultModal = () => {
  const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
  resultModal.show(); // 打開 Result modal
};

const closeResultModal = () => {
  const resultModal = bootstrap.Modal.getInstance(document.getElementById('resultModal'));
  resultModal.hide(); // 關閉 Result modal
};


// 儲存選擇的幣種與對應圖片
const selectedCoin = ref(null);
const selectedCoinImagePath = ref("");
const selectedRewardInfo = ref(null);
const selectedNetwork = ref(null); // 選中的網路

const gameRewardHistoryData = ref([]);
const stepOneComplete = ref(false); // 控制 Step 2 顯示
const stepTwoComplete = ref(false); // 控制 Step 3 顯示
const rewardAddress = ref(""); // 用來提款地址
const addressError = ref(false); // 地址驗證錯誤標誌
const addressErrorMessage = ref(""); // 錯誤訊息
const errorMessage = ref("");
const email = ref("");

// 定義是否可以提交表單
const formValid = computed(() => {
  return (
    rewardAddress.value !== "" &&
    !addressError.value &&
    codes.value.every((code) => code !== "")
  ); // 地址有效且驗證碼已填
});

const amount = ref(200);
const serviceFeeSymbol = ref(0); // 貨幣單位
const serviceFee = ref(-1);

// 取得個人得獎紀錄
const getUserInfo = async () => {
  try {
    const res = await api.userInfo.getAccountInfo();
    gameRewardHistoryData.value = res.data.data.gameRewardHistoryData;
    email.value = res.data.data.email;
    console.log(gameRewardHistoryData.value, "data");
  } catch (error) {
    console.error("獲取歷史時發生錯誤：", error);
  }
};

// 當選擇幣種改變時 變更圖片
const handleCoinChange = (coin) => {
  selectedCoin.value = coin; // 更新coin value
  selectedCoinImagePath.value = getCurrencyIcon(coin); // 更新圖片

  // 找到選中的貨幣資料
  const selectedCoinData = gameRewardHistoryData.value.find(
    (reward) => reward.rewardSymbol === coin
  );

  // 第三步驟 更新貨幣單位 (serviceFeeSymbol)
  if (selectedCoinData) {
    serviceFeeSymbol.value = selectedCoinData.rewardSymbol; // 更新貨幣單位
  }
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
  // 第二步驟 網路
  selectedNetwork.value = selectedCoinData?.rewardNetwork;

  return selectedCoinData ? [selectedCoinData.rewardNetwork] : []; // 返回該幣種的網路
});

// 第三步驟 獎勵金額
const updateRewardDetailsForStepThree = () => {
  const selectedReward = gameRewardHistoryData.value.find(
    (reward) => reward.rewardId === selectedRewardInfo.value
  );

  if (selectedReward) {
    amount.value = selectedReward.rewardAmount; // 更新獎勵金額
  }

  getFee(selectedReward);
};

// get fee
const getFee = async (selectedReward) => {
  // 調用 API 獲取提現手續費
  try {
    const res = await api.asset.getCryptocurrencySetting();
    const rewardSettings = res.data.data.reward.supportNetworks;

    // 在 reward.supportNetworks 中查找匹配的 network
    // 從api裡面找 已選中的網路
    const selectedNetworkData = rewardSettings.find(
      (network) => network.network === selectedNetwork.value
    );

    if (selectedNetworkData) {
      // 查找匹配的幣種，並更新手續費
      const symbolData = selectedNetworkData.supportSymbols.find(
        (symbol) => symbol.symbol === selectedReward.rewardSymbol
      );

      if (symbolData) {
        serviceFee.value = symbolData.withdrawalFee; // 更新手續費
      }
    }
  } catch (error) {
    console.error("獲取手續費時發生錯誤：", error);
  }
};

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
  if (!stepTwoComplete.value && rewardAddress.value) {
    stepTwoComplete.value = true; // 一旦設置為 true，保持顯示 Step 3
  }
};

// 當輸入提款地址時，進行正則驗證
const validateAddress = () => {
  const selectedReward = gameRewardHistoryData.value.find(
    (reward) => reward.rewardId === selectedRewardInfo.value
  );

  if (selectedReward) {
    const addressRegex = new RegExp(selectedReward.addressRegex); // 取得該獎勵的 addressRegex
    if (!addressRegex.test(rewardAddress.value)) {
      addressError.value = true;
      addressErrorMessage.value = `Invalid address format. Please use a valid address for ${selectedReward.rewardFullName}.`;
    } else {
      addressError.value = false;
      addressErrorMessage.value = ""; // 清空錯誤訊息
    }
  }
};

// 點擊 Confirm 按鈕後提交表單
const WithdrawReward = async () => {
  console.log("1");

  // 如果地址驗證有誤，不允許提交
  // if (addressError.value) return;
  console.log("地址錯誤被中斷");
  try {
    const selectedReward = gameRewardHistoryData.value.find(
      (reward) => reward.rewardId === selectedRewardInfo.value
    );

    // 確認選中的獎勵存在
    if (selectedReward) {
      const payload = {
        rewardId: selectedReward.rewardId,
        gameRoomId: selectedReward.gameRoomId,
        toAddress: rewardAddress.value, // 提款地址
        code: codes.value.join(""), // 六位驗證碼
      };

      // 調用 WithdrawReward API
      const response = await api.asset.withdrawReward(payload);
      console.log("Withdraw success:", response);

      // 如果成功，設置成功標誌為 true
      isWithdrawSuccess.value = true;
    }
  } catch (error) {
    // 如果失敗，設置成功標誌為 false
    isWithdrawSuccess.value = false;
    console.error("Withdraw API call failed:", error);
  } finally {
    // 關閉 Withdraw Modal，打開 Result Modal
    closeWithdrawModal();
    openResultModal();
  }
};

onMounted(async () => {
  await getUserInfo();

  const param = route.params.rewardId; // 獲取網址上的參數

  if (param) {
    if (isNaN(param)) {
      // 如果參數不是數字，則認為是幣種symbol
      const coinSymbol = param.toUpperCase(); // 將參數轉成大寫
      handleCoinChange(coinSymbol); // 自動選擇幣種
    } else {
      // 如果參數是數字，則認為是rewardId
      const rewardId = parseInt(param, 10); // 轉換成數字類型
      handleRewardIdFromRoute(rewardId); // 自動處理rewardId邏輯
    }
  }
});

// 當rewardId在網址中出現時
const handleRewardIdFromRoute = (rewardId) => {
  const selectedReward = gameRewardHistoryData.value.find(
    (reward) => reward.rewardId === rewardId
  );

  if (selectedReward) {
    // Step 1: 選中對應的幣種
    handleCoinChange(selectedReward.rewardSymbol);

    // Step 2: 填充reward資訊
    selectedRewardInfo.value = selectedReward.rewardId;
    handleStepOneComplete(); // 顯示第二步

    // Step 3: 更新金額和費用
    updateRewardDetailsForStepThree();
    handleStepTwoComplete(); // 顯示第三步
  }
};

// 下拉式測試 end
// Email驗證切分格子測試
const codes = ref(["", "", "", "", "", ""]);
const inputRefs = ref([]); // 這將儲存所有 input 的引用

// 當用戶在一格中輸入後，自動跳到下一格
const handleInput = (index) => {
  if (codes.value[index].length === 1 && index < codes.value.length - 1) {
    inputRefs.value[index + 1].focus();
  }

  // 檢查是否所有欄位都已輸入完畢，然後調用 verifyCode
  if (index === codes.value.length - 1) {
    const allFilled = codes.value.every((code) => code.length === 1);
    if (allFilled) {
      verifyCode(); // 當輸入到最後一格，並且所有格子都有輸入時調用驗證函數
    }
  }
};

// 當用戶按下 backspace 鍵時，自動退回到前一格
const handleBackspace = (index) => {
  if (codes.value[index] === "" && index > 0) {
    inputRefs.value[index - 1].focus();
  }
};

// 拼接六個輸入的值，並驗證
const verifyCode = () => {
  const fullCode = codes.value.join("");
  console.log("Full code:", fullCode);

  // API 驗證請求
  verifyCodeWithAPI(fullCode);
};

// 寄驗證信
const checkFormDataAndSendEmail = async () => {
  const type = "WithdrawReward";
  await postSendAuthCode(type);
};

// api - 發送驗證碼
const postSendAuthCode = async (type) => {
  try {
    const response = await api.account.sendAuthCode(type);
    console.log("驗證信", response);

    return response.data;
  } catch (error) {
    console.error("Failed to get CryptocurrencySetting:", error);
  }
};
const emailVerify = ref(false);

const verifyCodeWithAPI = async (code) => {
  const type = "WithdrawReward";
  try {
    const response = await api.account.checkVerificationCode(
      type,
      email.value,
      code
    );
    if (response.data.data) {
      emailVerify.value = true;
      errorMessage.value = "";
    }
    console.log(response, "驗證成功");
  } catch (error) {
    console.log(error);
    emailVerify.value = false;
    errorMessage.value = handleApiError(error);
  }
};
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

#withdrawModal .modal-content,
#resultModal .modal-content {
  background-color: #181a20;
  border: 1px solid #414d5a;
}

#resultModal .modal-header {
  border-bottom: none;
  display: flex;
  justify-content: space-between;
}

#resultModal .modal-header h5 {
  font-size: 32px;
  padding: 10px;
}

#resultModal .modal-body {
  font-size: 20px;
  padding: 16px 28px;
}

#resultModal .modal-footer {
  border-top: none;
  padding: 10px;
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
