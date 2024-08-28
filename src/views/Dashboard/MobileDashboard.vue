<template>
  <div>
    <div class="winnie-account">
      <div class="personal-info text-center">
        <div class="avatar-photo">
          <img class="my-3" style="width: 60px;" src="@/assets/images/icon/NFT/09.png" alt="">
          <p class="fs-4 fw-bold">winnie32145985</p>
          <p class="fs-6 fw-bold winnie-color-gray">UID 32123 <img class="ms-2" src="@/assets/images/icon/md-content_copy 1.svg" alt=""></p>
        </div>
      </div>
    <div class="d-flex justify-content-center">
      <div class="winnie-account-detail">
        <div class="container tabs my-3 px-3">
          <div class="d-flex justify-content-center align-items-center">
            <div class="p-2 text-center">
              <a href="account/deposit">
                <button class="mb-2">
                  <img class="p-1" src="@/assets/images/icon/semiDesign-semi-icons-plus 1.svg" alt="">
                </button>
                <p class="fs-6 fw-bold">Deposit</p>
              </a>
            </div>
            <div class="p-2 text-center">
              <a href="#">
                <button 
                class="d-md-none mb-2" 
                @click="openGetRewardsModal"
                >
                  <img class="p-1" src="@/assets/images/icon/antFill-gift 1.svg" alt="">
                </button>
                <p class="fs-6 fw-bold">Share</p>
              </a>
            </div>
            <GetRewardsModal
            :isOpen="showGetRewardsModal"
            @closeModal="showGetRewardsModal = false"
            />

            <div class="p-2 text-center">
              <a href="#">
                <button class="d-md-none mb-2" onclick="window.location.href='setting';">
                  <img class="p-1" src="@/assets/images/icon/antOutline-setting 1.svg" alt="">
                </button>
                <p class="fs-6 fw-bold">Setting</p>
              </a>
            </div>
          </div>
        </div> 

    <div class="d-flex justify-content-between align-items-center px-4 my-4">
      <img src="@/assets/images/icon/balance-icon.png" alt="">
      <span class="fw-bold" style="font-size: 32px;">3,969,443</span>
    </div>

    <div class="container px-3 px-sm-0 mt-3">
      <div class="rewards-detail">
        <div class="d-flex justify-content-center">
          <div class="accordion accordion-flush" id="accordionRewardsItem">
            <div class="accordion-item">
              <h2 class="accordion-header" id="accordionRewardsHeading">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionRewardsDetail" aria-expanded="false" aria-controls="accordionRewardsDetail">
                  <img class="me-2" src="@/assets/images/icon/fab fa-btc.svg" alt="">
                  <span class="fs-5 fw-bold">Rewards</span>
                </button>
              </h2>
            </div>
            <div id="accordionRewardsDetail" class="accordion-collapse collapse" aria-labelledby="accordionRewardsHeading" data-bs-parent="#accordionRewardsItem">
              <div class="accordion-body p-0">
                <a href="#">
                <div class="accordion-li p-4 mt-2">
                  <div class="d-flex justify-content-between">
                    <div class="crypto-type d-flex">
                      <img  class="me-2" style="width: 36px;" src="@/assets/images/icon/BNB.svg" alt="">
                      <div class="crypto-name d-flex flex-column justify-content-center">
                        <p class="">BNB</p>
                        <p class="winnie-color-gray">Binance</p>
                      </div>
                    </div>
                    <p class="rewards-amount fw-bold">
                      0.576
                    </p>
                  </div>
                  <div class="d-flex justify-content-between time-stamp mt-3 winnie-color-gray">
                      <p>Timestamp</p>
                      <p>2024/06/13 18:24:53</p>
                  </div>
                  <div class="d-flex justify-content-between round mt-2">
                    <p class="winnie-color-gray">Round 1768</p>
                    <img src="@/assets/images/icon/md-file_upload Copy 2.svg" alt="">
                </div>
                </div>
              </a>
              <a href="#">
                <div class="accordion-li p-4 mt-2">
                  <div class="d-flex justify-content-between">
                    <div class="crypto-type d-flex">
                      <img  class="me-2" style="width: 36px;" src="@/assets/images/icon/BNB.svg" alt="">
                      <div class="crypto-name d-flex flex-column justify-content-center">
                        <p>BNB</p>
                        <p class="winnie-color-gray">Binance</p>
                      </div>
                    </div>
                    <p class="rewards-amount fw-bold">
                      0.576
                    </p>
                  </div>
                  <div class="d-flex justify-content-between time-stamp mt-3 winnie-color-gray">
                      <p>Timestamp</p>
                      <p>2024/06/13 18:24:53</p>
                  </div>
                  <div class="d-flex justify-content-between round mt-2">
                    <p class="winnie-color-gray">Round 1768</p>
                    <img src="@/assets/images/icon/md-file_upload Copy 2.svg" alt="">
                </div>
                </div>
              </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <div class="container px-3 px-sm-0 mt-5">
        <div class="transaction-detail">
          <div class="transaction-month mb-3">
            <p>June, 2024</p>
          </div>
          <div class="d-flex justify-content-center">
            <div class="accordion accordion-flush" id="accordionTransactionDetail">
              <div class="accordion-item mb-2">
                <h2  class="accordion-header" id="flush-headingOne">
                  <button class="accordion-button collapsed d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    <div class="d-flex justify-content-between align-items-center w-100">
                      <span class="fs-5 winnie-color-gray">Deposit</span>
                      <span class="fs-5 me-2 fw-bold">+4,000</span>
                    </div>
                  </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionTransactionDetail">
                  <div class="accordion-body p-0">
                    <a href="#">
                    <div class="accordion-li pt-2 pb-4 px-4">
                      <div class="d-flex justify-content-between time-stamp mt-3 winnie-color-gray">
                          <p>Timestamp</p>
                          <p class="text-end">2024/06/13 18:24:53</p>
                      </div>
                      <div class="d-flex justify-content-between round mt-2">
                        <p class="winnie-color-gray">Verify</p>
                        <img src="@/assets/images/icon/arcoDesign-launch 1.svg" alt="">
                    </div>
                    </div>
                  </a>
                  </div>
                </div>
              </div>

              <div class="accordion-item mb-2">
                <h2  class="accordion-header" id="flush-headingTwo">
                  <button class="accordion-button collapsed d-flex justify-content-between align-items-center" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    <div class="d-flex justify-content-between align-items-center w-100">
                      <span class="fs-5 winnie-color-gray">Deposit</span>
                      <span class="fs-5 me-2 fw-bold">+4,000</span>
                    </div>
                  </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionTransactionDetail">
                  <div class="accordion-body p-0">
                    <a href="#">
                    <div class="accordion-li pt-2 pb-4 px-4">
                      <div class="d-flex justify-content-between time-stamp mt-3 winnie-color-gray">
                          <p>Timestamp</p>
                          <p class="text-end">2024/06/13 18:24:53</p>
                      </div>
                      <div class="d-flex justify-content-between round mt-2">
                        <p class="winnie-color-gray">Verify</p>
                        <img src="@/assets/images/icon/arcoDesign-launch 1.svg" alt="">
                    </div>
                    </div>
                  </a>
                  </div>
                </div>
              </div>
              <div class="more-btn mt-5">
                <button class="text-center py-3">
                  <span>More</span>
                </button>
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
  import { ref } from "vue";
  import GetRewardsModal from "./component/GetRewardsModal.vue";

  const showGetRewardsModal = ref(false);

  const openGetRewardsModal = () => {
    console.log("OpenGetRewardsModal function called in Mobile.vue")
    showGetRewardsModal.value = true;
    console.log("showGetRewardsModal value after openModal:", showGetRewardsModal.value);
  }

</script>

<style scoped>
.fw-bold {
  font-weight: 600 !important;
}

.winnie-account-detail a p {
  color: #F8F8F8;
}

.winnie-account-detail a button {
  color: #F8F8F8;
  background-color: #2B3139;
  border-radius: 4px;
  padding: 10px;
  border: none;
}

.winnie-account-detail a button:hover,
.winnie-account-detail a button:focus {
  color: #F8F8F8;
  background-color: #414D5A;
}

.winnie-account .accordion {
  --bs-accordion-border-width: none;
}

.winnie-account .accordion-li {
  background-color: #1E2329;
}

.winnie-account .accordion-item {
  border-radius: 8px !important;
  background-color: #2B3139;
}

.winnie-account .accordion-button{
  background-color: #2B3139;
  color: #F8F8F8;
  border-radius: 8px !important;
}

.rewards-detail .time-stamp,
.rewards-detail .round {
  font-size: 14px;
}

.winnie-account .winnie-color-gray {
  color: #BBB !important;
}

.winnie-account .winnie-color-white {
  color: #F8F8F8;
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
  background-color: #2B3139;
  color: #F8F8F8;
  border: none;
  border-radius: 8px;
}

.winnie-account .more-btn button:active {
  background-color: #414D5A;
}

.accordion-button.collapsed::after, .accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

</style>
  