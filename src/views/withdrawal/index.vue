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
                  <img src="@/assets/images/icon/semiDesign-semi-icons-plus 1.svg" alt="">
                </button>
                <p class="fw-bold">Deposit</p>
              </router-link>
            </div>
            <div class="divider align-items-center d-none d-md-inline"></div>
            <div class="p-2 text-center">
              <router-link to="/account/withdrawal">
                <button class="d-md-none mb-2">
                  <img src="@/assets/images/icon/iconPark-arrow-down 1.svg" alt="">
                </button>
                <p class="fw-bold">Withdraw</p>
              </router-link>
            </div>
            <div class="divider align-items-center d-none d-md-inline"></div>
            <div class="p-2 text-center">
              <router-link to="/dashboard">
                <button class="d-md-none mb-2">
                  <img src="@/assets/images/icon/antOutline-history 1.svg" alt="">
                </button>
                <p class="fw-bold">History</p>
              </router-link>
            </div>
          </div>
        </div>

        <div class="container px-3 px-sm-0 mt-5">
          <!-- Step 1 -->
          <div class="step-container step-one">
            <div>
              <div class="step-title">
                <div class="circle-number active me-4">1</div>
                <h5>Select Coin</h5>
              </div>
              <div class="d-flex justify-content-center">
                <div class="vertical-line active d-none d-md-block me-5" style="height: 180px;"></div>
                <div class="winnie-withdraw-bk container p-3 my-4">
                  <div class="row">
                  <div class="col-8 col-sm-5">
                    <div class="dropdown dropdown-coin d-flex align-items-center my-4 my-sm-0">
                      <button class="btn btn-secondary dropdown-toggle text-start d-flex justify-content-between" type="button"
                        id="dropdownMenuForCoin" data-bs-toggle="dropdown" aria-expanded="false">
                        <div><i class="fa-solid fa-magnifying-glass me-2"></i><span>Select Coin</span></div>
                        <div><i class="fa-solid fa-angle-down"></i></div>
                      </button>
                      <ul class="dropdown-menu" style="background-color: #414D5A ;" aria-labelledby="dropdownMenuForCoin">
                        <li class="d-flex align-items-center">
                          <a class="dropdown-item py-2" href="#">
                            <div class="info">
                              <img class="me-1" src="@/assets/images/icon/balance-icon.png" alt="balance-icon">
                              <span class="abbr me-1">OCT / USDT</span>
                            </div>
                          </a>
                        </li>
                        <li class="d-flex align-items-center">
                          <a class="dropdown-item py-2" href="#">
                            <div class="info">
                              <img class="me-1" src="@/assets/images/icon/balance-icon.png" alt="balance-icon">
                              <span class="abbr me-1">OCT / USDC</span>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-12 col-sm-7">
                    <input type="number" placeholder="Minium 20 USD" class="form-control amount-input" id="inputWithdrawAmount" aria-describedby="amount">
                  </div>
                  <div class="col-7 col-sm-5 mt-3 ps-4" style="font-size: 14px;">
                      <p>1 USD = 1 OCT</p>
                      <span>Balance : </span><span class="d-inline">354,321</span>
                  </div>
                  <div class="col-5 col-sm-7 text-end my-auto">
                      <button class="max-btn">MAX</button>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 2 -->
          <div class="step-container step-two">
            <div>
              <div class="step-title">
                <div class="circle-number me-4">2</div>
                <h5>Withdraw to</h5>
              </div>
              <div class="d-flex align-items-center justify-content-center mb-3 mb-md-0">
                <div class="vertical-line me-5 d-none d-md-block"></div>
                <div class="mt-3 mt-md-0 winnie-width-xs-100">
                <input type="email" class="form-control mb-2" id="exampleFormControlInput1" placeholder="Enter your address">
                <div class="dropdown dropdown-coin d-flex align-items-center my-2 my-sm-0">
                  <button class="btn btn-secondary dropdown-toggle text-start d-flex justify-content-between winnie-width-xs-100"
                    type="button" id="dropdownMenuForNetwork" data-bs-toggle="dropdown" aria-expanded="false">
                    <div><i class="fa-solid fa-magnifying-glass me-2"></i><span>Select Network</span></div>
                    <div><i class="fa-solid fa-angle-down"></i></div>
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenuForNetwork">
                    <div class="deposit-notice-bk-color m-2 p-2 d-flex justify-content-between">
                      <p><i class="fa-solid fa-circle-exclamation me-2 winnie-text-white"></i></p>
                      <p class="text-start deposit-notice-color" style="font-size: 12px;">
                        Please note that only supported networks on Binance platform are shown, if you deposit via another
                        network your assets may be lost.
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
          </div>

          <!-- Step 3 -->
          <div class="step-container step-three">
            <div>
              <div class="step-title">
                <div class="circle-number me-4">3</div>
                <h5>Withdrawl Amount</h5>
              </div>
              <div class="d-flex align-items-center flex-column flex-md-row">
                <div class="vertical-line me-5 d-none d-md-block" style="background-color: transparent; height: 100px;"></div>
                <div class="input-group my-3">
                  <input type="text" class="form-control" placeholder="" value="31,678" aria-label="withdraw amount" aria-describedby="basic-addon2">
                  <span class="input-group-text" id="withdrawUnit">USDT</span>
                </div>
              </div>
              <div class="d-flex">
                  <div class="vertical-line me-5 d-none d-md-block" style="background-color: transparent;"></div>
                  <div class="info-section">
                      <div class="info-row mb-1 mb-md-2">
                          <span>Available Withdrawal Balance</span>
                          <span class="d-none d-md-inline">354,221 USDT</span>
                      </div>
                      <span class="mb-3 d-inline-block d-md-none">354,221 USDT</span>
                      <div class="info-row mb-1 mb-md-2">
                          <span>Service fee</span>
                          <span class="d-none d-md-inline">0.001 USDT</span>
                      </div>
                      <span class="d-inline d-md-none">0.001 USDT</span>
                      <!-- withdrawModal -->
                      <div class="info-row justify-content-center justify-content-sm-end mt-4 winnie-width-xs-100">
                          <button class="withdraw-btn" data-bs-toggle="modal" data-bs-target="#withdrawModal">Withdraw</button>
                      </div>
                      <div class="modal fade" id="withdrawModal" tabindex="-1" aria-labelledby="withdrawModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header d-flex justify-content-between">
                              <h5 class="modal-title" id="withdrawModalLabel"></h5>
                              <button type="button" class="btn winnie-btn-close" data-bs-dismiss="modal" aria-label="Close">
                                <i class="fa-solid fa-xmark"></i>
                              </button>
                            </div>
                            <div class="modal-body px-5">
                              <p class="fs-2 fw-bold">Email Verification</p>
                              <br>
                              <p class="winnie-text-gray">We've sent a code to your email. Please enter it within 30 minutes.</p>
                              <br>
                              <div class="d-flex">
                              <input type="text" class="form-control text-center mx-1" maxlength="1">
                              <input type="text" class="form-control text-center mx-1" maxlength="1">
                              <input type="text" class="form-control text-center mx-1" maxlength="1">
                              <input type="text" class="form-control text-center mx-1" maxlength="1">
                              <input type="text" class="form-control text-center mx-1" maxlength="1">
                              <input type="text" class="form-control text-center mx-1" maxlength="1">
                              </div>
                            </div>
                            <div class="modal-footer px-5">
                              <button id="withdrawConfirmButton" type="button" class="btn btn-primary w-100 mb-3 mt-3">Confirm</button>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

<!-- email驗證 test -->
    <!-- <div class="verification-container">
    <div class="form-group">
      <div class="d-flex justify-content-between">
        <input v-for="(code, index) in codes" 
          :key="index" 
          ref="inputRefs"
          type="text" 
          class="form-control text-center mx-1 code-input"
          maxlength="1" 
          v-model="codes[index]" 
          @input="handleInput(index)"
          @keydown.backspace="handleBackspace(index)" 
          autofocus />
      </div>
    </div>
    <button class="btn btn-primary mt-3" @click="verifyCode">Verify</button>
  </div> -->

  </div>
</template>

<script setup>

// Email驗證切分格子測試
import { ref } from 'vue';

const codes = ref(['', '', '', '', '', '']);
const inputRefs = ref([]); // 這將儲存所有 input 的引用

// 當用戶在一格中輸入後，自動跳到下一格
function handleInput(index) {
  if (codes.value[index].length === 1 && index < codes.value.length - 1) {
    inputRefs.value[index + 1].focus();
  }
}

// 當用戶按下 backspace 鍵時，自動退回到前一格
function handleBackspace(index) {
  if (codes.value[index] === '' && index > 0) {
    inputRefs.value[index - 1].focus();
  }
}

// 拼接六個輸入的值，並驗證
function verifyCode() {
  const fullCode = codes.value.join('');
  console.log('Full code:', fullCode);

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
/* .verification-container {
  max-width: 300px;
  margin: 0 auto;
}

.code-input {
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
} */

.container { 
  width: 100%;
}

@media (max-width: 420px) {
    .winnie-width-xs-100 {
        width: 100% !important;
    }
}

.winnie-withdraw a p {
    color: #F8F8F8;
}

.winnie-withdraw a button {
    color: #F8F8F8;
    background-color: #2B3139;
    border-radius: 4px;
    padding: 10px;
    border: none;
}

.winnie-withdraw a button:hover,
.winnie-withdraw a button:focus {
    color: #F8F8F8;
    background-color: #414D5A;
}

.winnie-withdraw-bk {
    background-color: #2B3139;
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

.max-btn {
    border: 1px solid #F8F8F8;
    background-color: transparent;
    border-radius: 0px;
    color: #F8F8F8;
    padding: 1px 6px;
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

.step-three #withdrawUnit {
    background-color: transparent;
    border: 1px solid #6c757d;
    color: #F8F8F8;
    border-left: none;
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

.winnie-withdraw .withdraw-btn {
border: none;
border-radius: 50px;
background-color: #FCD535;
padding: 8px 30px;
color: #2B3139;
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
background-color: #414D5A;
height: 130px;
margin: 0 20px;
}

.winnie-withdraw .vertical-line.active {
    background-color: #F8F8F8;
}

#withdrawModal, #withdrawRemindModal, #depositRemindModal {
    background-color: rgba(0, 0, 0, 0.50);
}

#withdrawModal .form-control {
    border: none;
    border-bottom: 1px solid #BBBBBB; 
    background-color: transparent !important;
    border-radius: 0;
    box-shadow: none;
    transition: border-color 0.3s ease;
}

#withdrawModal .form-control:focus {
    border-color: #F8F8F8;
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
    background-color: #181A20;
    border: 1px solid #414D5A;
}

#withdrawModal .modal-footer button  {
    background-color: #2B3139;
    border: none;
    color: #F8F8F8;
}

#withdrawModal button#withdrawConfirmButton:hover {
    background-color: #414D5A;
}

#withdrawRemindModal button,
#depositRemindModal button{
    background-color: #FCD535;
    color: #181A20;
}

#withdrawRemindModal .modal-content,
#depositRemindModal .modal-content{
    border: 1px solid #414D5A;
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

</style>
