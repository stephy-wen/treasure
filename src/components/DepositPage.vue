<template>
  <div class="deposit-page px-3 px-sm-0 mt-5">
    <!-- Slot for additional content at the top -->
    <slot name="extra-content"></slot>
    <!-- Step 1 -->
    <div class="step-container">
      <div>
        <div class="step-title">
          <div class="circle-number active me-4">1</div>
          <h5>Select Coin</h5>
        </div>
        <div class="d-flex justify-content-center">
          <div class="vertical-line active d-none d-sm-block me-5"></div>
          <!-- Element Plus 下拉选择框 -->
          <el-select
            v-model="params.supportCoin"
            size="large"
            placeholder="Select Coin"
            v-if="selectShow"
            class="d-flex align-items-center my-4 my-sm-0"
          >
            <template #prefix>
              <el-image
                v-if="params.supportCoinImagePath"
                :src="params.supportCoinImagePath"
                style="width: 20px; height: 20px; margin-right: 5px"
              ></el-image>
            </template>
            <el-option
              v-for="item in options.supportCoins"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            >
              <template #default>
                <div class="option-content">
                  <el-image
                    :src="item.ImagePath"
                    style="width: 20px; height: 20px; margin-right: 10px"
                  ></el-image>
                  {{ item.label }}
                </div>
              </template>
            </el-option>
          </el-select>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div class="step-container">
      <div>
        <div class="step-title">
          <div
            class="circle-number me-4"
            :class="{ active: params.supportCoin }"
          >
            2
          </div>
          <h5>Select Network</h5>
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <div
            class="vertical-line me-5 d-none d-sm-block"
            :class="{ active: params.supportCoin }"
          ></div>
          <div
            class="dropdown dropdown-coin d-flex align-items-center my-2 my-sm-0"
            :style="{ visibility: params.supportCoin ? 'visible' : 'hidden' }"
          >
            <el-select
              v-model="params.selectNetwork"
              size="large"
              placeholder="Select Network"
              v-if="selectShow"
            >
              <el-option
                v-for="network in filteredNetworks"
                :key="network.network"
                :value="network.network"
                :label="`${network.network} (${network.protocol})`"
                style="height: 60px"
              >
                <template #default>
                  <div class="info">
                    <div class="d-flex justify-content-between">
                      <span class="winnie-text-white" style="color: black">{{
                        network.network
                      }}</span>
                      <span class="winnie-text-white" style="color: black"
                        >&#8776; {{ network.confirmMins }} 分鐘</span
                      >
                    </div>
                    <div class="d-flex justify-content-between">
                      <span class="winnie-text-gray winnie-fs-small"
                        >{{ network.fullName }} ({{ network.protocol }})</span
                      >
                      <span class="winnie-text-gray winnie-fs-small"
                        >{{ network.confirmMins }} 確認/s</span
                      >
                    </div>
                  </div>
                </template>
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div class="step-container">
      <div>
        <div class="step-title">
          <div
            class="circle-number me-4"
            :class="{ active: params.selectNetwork }"
          >
            3
          </div>
          <h5>Deposit Address</h5>
        </div>
        <div
          v-if="params.selectNetwork"
          class="d-flex align-items-center flex-column flex-md-row"
        >
          <div
            class="vertical-line me-5 d-none d-md-block"
            style="background-color: transparent"
          ></div>
          <div class="mt-3">
            <!-- <img v-if="!apiIsLoading" class="qrcode-pic" src="@/assets/images/common/qrcode-test.png" alt=""> -->
            <vue-qr
              v-if="!apiIsLoading"
              class="qrcode-pic"
              :text="params.address"
              :size="200"
            ></vue-qr>
            <div v-else>123</div>
          </div>
          <div class="mt-3 ms-3">
            <p class="my-2">Address</p>
            <div class="company-address mb-4" style="width: fit-content">
              <p class="my-2 py-1 px-3">
                {{ params.address }}
                <font-awesome-icon
                  icon="fa-solid fa-copy"
                  class="d-inline ms-2"
                  @click="copyAddress"
                />
              </p>
            </div>
            <p class="my-2">Minimum deposit 10 USD</p>
            <p class="my-2 winnie-text-gray">1 USD = 1 OCT</p>
            <p
              class="text-start deposit-notice-color d-md-none"
              style="font-size: 12px"
            >
              <i
                class="fa-solid fa-circle-exclamation me-2 winnie-text-white"
              ></i
              >Please note that only supported networks on Binance platform are
              shown, if you deposit via another network your assets may be lost.
            </p>
          </div>
        </div>
        <div
          v-if="params.selectNetwork"
          class="d-none d-md-flex align-items-center"
        >
          <div
            class="vertical-line me-5"
            style="background-color: transparent"
          ></div>
          <div
            class="deposit-notice-bk-color p-2 d-md-flex justify-content-between deposit-notice-bottom d-none"
          >
            <p>
              <i
                class="fa-solid fa-circle-exclamation me-2 winnie-text-white"
              ></i>
            </p>
            <p class="text-start deposit-notice-color" style="font-size: 12px">
              Please note that only supported networks on Binance platform are
              shown, if you deposit via another network your assets may be lost.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/services/modules"; // 引入 API 模組
import { ref, onMounted, reactive, watch } from "vue";
import { ElMessage } from "element-plus";
import USDCicon from "@/assets/images/icon/USDC-account.svg";
import USDTicon from "@/assets/images/icon/USDT-account.svg";
import VueQr from "vue-qr/src/packages/vue-qr.vue";

// 輸入內容
const params = reactive({
  supportCoin: "",
  supportCoinImagePath: "",
  selectNetwork: "",
  address: "",
});

const apiIsLoading = ref(false);

// 根據選擇的幣種過濾網路
const filteredNetworks = ref([]);

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(params.address);
    ElMessage({
      message: "address 已成功複製！",
      type: "success",
    });
  } catch (error) {
    ElMessage.error({
      message: "複製失敗，請重試！",
      duration: 3000,
    });
  }
};

watch(
  [() => params.supportCoin, () => params.selectNetwork],
  async ([newSupportCoin, newSelectNetwork]) => {
    console.log(newSupportCoin, "選擇的貨幣");
    console.log(newSelectNetwork, "選擇的網路");
    if (newSupportCoin && newSelectNetwork) {
      apiIsLoading.value = true;

      const formData = {
        network: newSelectNetwork,
        symbol: newSupportCoin,
      };
      const response = await getAddress(formData);
      console.log(response, "地址");
      if (response?.data?.address) {
        params.address = response.data.address;
      }

      apiIsLoading.value = false;
    }
  }
);

// api - 取得地址
const getAddress = async (formData) => {
  try {
    // const formData = {
    //   network: params.selectNetwork,
    //   symbol: params.supportCoin,
    // };
    console.log("formData", formData);
    const response = await api.asset.getAddress(formData);

    console.log("CryptocurrencySetting get successfully:", response);

    return response.data;
  } catch (error) {
    console.error("Failed to get CryptocurrencySetting:", error);
  }
};

const supportNetworks = ref([]);

// 監聽異動&圖片更換及網路更新
watch(
  () => params.supportCoin,
  async (newValue) => {
    console.log(params.supportCoin);
    console.log(newValue, "newValue");
    if (newValue) {
      // 更新加密貨幣圖片
      const findSupportCoin = options.supportCoins.find(
        (supportCoin) => supportCoin.value === newValue
      );
      if (findSupportCoin) {
        params.supportCoinImagePath = findSupportCoin.ImagePath;
      }

      // 取得網路
      try {
        const networkSetting = await getCryptocurrencySetting(newValue);
        supportNetworks.value = networkSetting.data.deposit.supportNetworks; // 取得網路資料
        console.log(supportNetworks.value, "api 資料");
        // 根據所選幣種過濾網路
        filteredNetworks.value = supportNetworks.value.filter((network) =>
          network.supportSymbols.some(
            (symbol) => symbol.symbol === params.supportCoin
          )
        );

        console.log(filteredNetworks.value, " 該幣種的所有網路");

        // 检查 networkSetting.data 是否存在，并从 withdraw 部分获取数据
        // if (networkSetting) {
        //   // 更新網路選擇框的選項
        //   options.supportNetworks =
        //     networkSetting.data.deposit.supportNetworks.map((network) => ({
        //       label: network.networkFullName,
        //       value: network.network,
        //       protocol: network.protocol,
        //       confirmMins: network.confirmMins,
        //       fullName: network.networkFullName,
        //     }));
        // } else {
        //   console.error(
        //     "NetworkSetting data is not in expected format:",
        //     networkSetting.data
        //   );
        // }
      } catch (error) {
        console.error("Failed to get NetworkSetting:", error);
      }
    }
  }
);

// api - 取得出入金網路，幣種以及金額設定
const getCryptocurrencySetting = async () => {
  try {
    const response = await api.asset.getCryptocurrencySetting();
    console.log("CryptocurrencySetting get successfully:", response);

    return response.data;
  } catch (error) {
    console.error("Failed to get CryptocurrencySetting:", error);
  }
};

const options = reactive({
  supportCoins: [],
  supportNetworks: [],
});

const iconMap = {
  USDT: USDTicon,
  USDC: USDCicon,
};

onMounted(async () => {
  const cryptocurrencySetting = await getCryptocurrencySetting();

  if (cryptocurrencySetting) {
    cryptocurrencySetting.data.deposit.supportCoins.forEach((supportCoin) => {
      options.supportCoins.push({
        ImagePath: iconMap[supportCoin.symbol] || "",
        label: supportCoin.fullName,
        value: supportCoin.symbol,
        symbol: supportCoin.symbol,
      });
    });
  }
});

const selectShow = ref(true);
</script>

<style scoped>
/* deposit */

@media (min-width: 575.98px) and (max-width: 767.98px) {
  .container {
    width: 75%;
  }
}

a p {
  color: #f8f8f8;
}

a button {
  color: #f8f8f8;
  background-color: #2b3139;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

a button:hover,
a button:focus {
  color: #f8f8f8;
  background-color: #414d5a;
}

.dropdown-item:focus,
.dropdown-item:hover {
  color: #f8f8f8;
  background-color: #414d5a;
}

.vertical-line {
  width: 1px;
  background-color: #414d5a;
  height: 100px;
  margin: 0 20px;
}

.vertical-line.active {
  background-color: #f8f8f8;
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
  width: 100%;
}

.step-three .info-section {
  margin-top: 20px;
}

.step-three .info-section .info-row {
  display: flex;
  justify-content: space-between;
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

.dropdown-toggle::after {
  display: none;
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
</style>
