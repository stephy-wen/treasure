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
          <div class="dropdown dropdown-coin d-flex align-items-center my-4 my-sm-0">
            <button class="btn btn-secondary dropdown-toggle text-start d-flex justify-content-between" type="button" id="dropdownMenuForCoin" data-bs-toggle="dropdown" aria-expanded="false">
              <div><font-awesome-icon
              icon="fa-solid fa-magnifying-glass" class="me-2"/><span>Select Coin</span></div>
              <div><font-awesome-icon
              icon="fa-solid fa-angle-down"
              /></div>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuForCoin">
              <li class="d-flex align-items-center">
                <a class="dropdown-item py-2" href="#">
                <div class="info">
                  <img class="me-1" src="@/assets/images/icon/BUSD.svg" alt="BUSD">
                  <span class="abbr me-1">BUSD</span>
                  <span class="full-name">Binance USD</span>
                </div>
                </a>
              </li>
              <li class="d-flex align-items-center">
                <a class="dropdown-item py-2" href="#">
                <div class="info">
                  <img class="me-1" src="@/assets/images/icon/USDC.svg" alt="BUSD">
                  <span class="abbr me-1">USDC</span>
                  <span class="full-name">USD Coin</span>
                </div>
                </a>
              </li>
              <li class="d-flex align-items-center">
                <a class="dropdown-item py-2" href="#">
                <div class="info">
                  <img class="me-1" src="@/assets/images/icon/USDT.svg" alt="BUSD">
                  <span class="abbr me-1">USDT</span>
                  <span class="full-name">TetherUS</span>
                </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div class="step-container">
      <div>
        <div class="step-title">
          <div class="circle-number me-4">2</div>
          <h5>Select Network</h5>
        </div>
        <div class="d-flex align-items-center justify-content-center">
          <div class="vertical-line me-5 d-none d-sm-block"></div>
          <div class="dropdown dropdown-coin d-flex align-items-center my-4 my-sm-0">
            <button class="btn btn-secondary dropdown-toggle text-start d-flex justify-content-between" type="button" id="dropdownMenuForNetwork" data-bs-toggle="dropdown" aria-expanded="false">
              <div><font-awesome-icon
                icon="fa-solid fa-magnifying-glass" class="me-2"/><span>Select Network</span></div>
              <div><font-awesome-icon
              icon="fa-solid fa-angle-down"
              /></div>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuForNetwork">
              <div class="deposit-notice-bk-color m-2 p-2 d-flex justify-content-between">
              <p><i class="fa-solid fa-circle-exclamation me-2 winnie-text-white"></i></p>
              <p class="text-start deposit-notice-color" style="font-size: 12px;">
                Please note that only supported networks on Binance platform are shown, if you deposit via another network your assets may be lost.
              </p>
              </div>
              <li class="d-flex align-items-center">
                <a class="dropdown-item py-2" href="#">
                <div class="info">
                  <div class="d-flex justify-content-between">
                    <span class="winnie-text-white">BSC</span>
                    <span class="winnie-text-white">&#8776; 3 分鐘</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="winnie-text-gray winnie-fs-small">BNB Smart Chain (BEP20)</span>
                    <span class="winnie-text-gray winnie-fs-small">15 確認/s</span>
                  </div>
                </div>
                </a>
              </li>
              <li class="d-flex align-items-center">
                <a class="dropdown-item py-2" href="#">
                <div class="info">
                  <div class="d-flex justify-content-between">
                    <span class="winnie-text-white">ETH</span>
                    <span class="winnie-text-white">&#8776; 3 分鐘</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="winnie-text-gray winnie-fs-small">Ethereum (ERC20)</span>
                    <span class="winnie-text-gray winnie-fs-small">6 確認/s</span>
                  </div>
                </div>
                </a>
              </li>
              <li class="d-flex align-items-center">
                <a class="dropdown-item py-2" href="#">
                <div class="info">
                  <div class="d-flex justify-content-between">
                    <span class="winnie-text-white">TRX</span>
                    <span class="winnie-text-white">&#8776; 2 分鐘</span>
                  </div>
                  <div class="d-flex justify-content-between">
                    <span class="winnie-text-gray winnie-fs-small">Tron (TRC20)</span>
                    <span class="winnie-text-gray winnie-fs-small">1 確認/s</span>
                  </div>
                </div>
                </a>
              </li>
            </ul>
            </div>
        </div>
      </div>
    </div>

    <!-- Step 3 -->
    <div class="step-container">
      <div>
        <div class="step-title">
          <div class="circle-number me-4">3</div>
          <h5>Deposit Address</h5>
        </div>
        <div class="d-flex align-items-center flex-column flex-md-row">
          <div class="vertical-line me-5 d-none d-md-block" style="background-color: transparent;"></div>
          <div class="mt-3">
            <img class="qrcode-pic" src="@/assets/images/common/qrcode-test.png" alt="">
          </div>
          <div class="mt-3 ms-3">
            <p class="my-2">Address</p>
            <div class="company-address mb-4" style="width: fit-content;">
            <p class="my-2 py-1 px-3">0xEf817557258ba1EB5E79772e9dCFa9B101F04eE9
              <font-awesome-icon
              icon="fa-solid fa-copy" class="d-inline ms-2"
              />
            </p>
            </div>
            <p class="my-2">Minimum deposit   10 USD</p>
            <p class="my-2 winnie-text-gray">1 USD = 1 OCT</p>
            <p class="text-start deposit-notice-color d-md-none" style="font-size: 12px;">
              <i class="fa-solid fa-circle-exclamation me-2 winnie-text-white"></i>Please note that only supported networks on Binance platform are shown, if you deposit via another network your assets may be lost.
            </p>
          </div>
        </div>
        <div class="d-none d-md-flex align-items-center">
          <div class="vertical-line me-5" style="background-color: transparent;"></div>
          <div class="deposit-notice-bk-color p-2 d-md-flex justify-content-between deposit-notice-bottom d-none">
            <p><i class="fa-solid fa-circle-exclamation me-2 winnie-text-white"></i></p>
            <p class="text-start deposit-notice-color" style="font-size: 12px;">
              Please note that only supported networks on Binance platform are shown, if you deposit via another network your assets may be lost.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 你的組件邏輯可以在這裡處理
</script>

<style scoped>

/* deposit */

@media (min-width: 575.98px) and (max-width: 767.98px) {
  .container {
        width: 75%;
    }
  }

a p {
    color: #F8F8F8;
}

a button {
    color: #F8F8F8;
    background-color: #2B3139;
    border-radius: 4px;
    padding: 10px;
    border: none;
}

a button:hover,
a button:focus {
    color: #F8F8F8;
    background-color: #414D5A;
}

.dropdown-item:focus, .dropdown-item:hover {
  color: #F8F8F8;
  background-color: #414D5A;
}

.vertical-line {
    width: 1px;
    background-color: #414D5A;
    height: 100px;
    margin: 0 20px;
}

.vertical-line.active {
    background-color: #F8F8F8;
}

.step-one .form-control{
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #BBB;
    padding: 8px;
    outline: none;
    border-radius: 0px;
    color: #F8F8F8;
    text-align: end;
}

.step-one .form-control:focus{
    border-bottom: 1px solid #F8F8F8;
    background-color: transparent;
}

.step-two .form-control {
    background-color: transparent;
    color: #F8F8F8;
    border: 1px solid #6c757d;
}

.step-two .form-control::placeholder {
    color: #6c757d;
}

.step-three .form-control {
    background-color: transparent;
    border: 1px solid #6c757d;
    color: #F8F8F8;
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
    color: #F8F8F8;
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
    background-color:#BBB;
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
    background-color: #2B3139;
    color: #3D3D3D;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
}

.circle-number.active{
    background-color: #414D5A;
    color: #F8F8F8;
}

.step-title {
    display: flex;
    align-items: center;
    /* margin-bottom: 10px; */
}



.dropdown-menu{
    background-color: #2B3139;
    --bs-dropdown-link-hover-bg: #414D5A;
}


ul li a img {
    max-width: 24px;
}

ul li a .abbr{
    font-weight: bold;
    color: #F8F8F8;
}
ul li a .full-name{
    color: #BBB;
}

.step-container .dropdown-toggle{
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
.step-container .dropdown-toggle{
    width: 534px;
}
}
@media (min-width: 991.98px) {
.step-container .dropdown-toggle{
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
    color: #F8F8F8;
}

.winnie-text-gray {
    color: #BBB;
}

.deposit-notice-color {
    color: #F8F8F8;
}

.deposit-notice-bk-color {
    background-color: #414D5A;
    border-radius: 8px;
}

.winnie-fs-small {
    font-size: 12px;
}

.company-address {
    border: 1px solid #565e64;
    color: #F8F8F8;
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
    background-color: #2B3139;
    color: #F8F8F8;
    border-radius: 50px;
    border: none;
}

.winnie-btn-close:hover {
    background-color: #414D5A;
}

.dropdown-toggle::after {
  display: none;
}

</style>