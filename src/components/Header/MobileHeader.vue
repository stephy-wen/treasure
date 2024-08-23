<template>
  <!-- 以下為手機版 漢堡排展開的modal-start -->
  <div class="modal winnie-modal" tabindex="-1" id="navbarModal">
    <div class="modal-dialog modal-md-half modal-fullscreen-lg-down">
      <div class="modal-content">
        <div class="modal-header">
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- 以下為登入後出現 -->
          <template v-if="loggedIn">
            <!-- 個人資料-照片 & id -->
            <div class="personal-info">
              <div class="personal-photo text-center">
                <img src="@/assets/images/icon/NFT/09.png" alt="" />
              </div>
              <p class="personal-id text-center fs-5 fw-bold">
                <font-awesome-icon
                  icon="fa-solid fa-circle-user"
                  class="mt-3 me-2"
                />{{ userId }}
              </p>
            </div>
            <!-- 目前餘額 -->
            <div class="personal-balance-info mt-5">
              <div
                class="d-flex justify-content-between align-items-center mx-3"
              >
                <p class="personal-balance-title fs-5 fw-bold mb-0">
                  Total Balance
                </p>
                <img src="@/assets/images/icon/antOutline-eye.svg" alt="" />
              </div>
              <div
                class="d-flex justify-content-start align-items-center mt-3 mx-3"
              >
                <p class="personal-balance fw-bold mb-0">
                  <img
                    class="me-2"
                    src="@/assets/images/icon/balance-icon.png"
                    alt=""
                  />{{ balance }}
                </p>
              </div>
            </div>
            <!-- deposit & dashboard btn -->
            <div class="personal-function mt-4">
              <div class="row justify-content-center">
                <div class="col-5 text-center personal-function-deposit mx-2">
                  <a
                    href="account/deposit"
                    class="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                    style="color: #f8f8f8; height: 100px"
                  >
                    <img
                      src="@/assets/images/icon/semiDesign-semi-icons-plus.svg"
                      alt=""
                    />
                    <p class="mt-2 mb-0 fs-5 fw-bold">Deposit</p>
                  </a>
                </div>
                <div class="col-5 text-center personal-function-dashboard mx-2">
                  <a
                    href="dashboard"
                    class="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                    style="color: #f8f8f8; height: 100px"
                  >
                    <img src="@/assets/images/icon/md-dashboard.svg" alt="" />
                    <p class="mt-2 mb-0 fs-5 fw-bold">Dashboard</p>
                  </a>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <!-- 未登入時，要出現log in & sign up btn -->
            <div class="row">
              <LoginButtons
                loginButtonClass="fs-5 fw-bold w-100"
                signupButtonClass="fs-5 fw-bold w-100 mt-4"
              />
            </div>
          </template>

          <div class="accordion mt-4" id="accordionNav">
            <!-- 每個選項都是一個item, 分別是Hunt/treasure spot/leaderboard -->
            <div
              class="accordion-item"
              v-for="(item, index) in navPhoneLinks"
              :key="item.id"
            >
              <div class="accordion-header" :id="`heading${index}`">
                <!-- 判斷是否為 dropdown -->
                <template v-if="item.dropdown">
                  <button
                    class="accordion-button collapsed fs-5 fw-bold"
                    type="button"
                    :data-bs-toggle="'collapse'"
                    :data-bs-target="`#collapse${index}`"
                    aria-expanded="false"
                    :aria-controls="`collapse${index}`"
                  >
                    <font-awesome-icon :icon="item.icon" class="me-3" />{{
                      item.label
                    }}
                  </button>
                </template>

                <template v-else>
                  <a class="accordion-button fs-5 fw-bold" :href="item.url">
                    <font-awesome-icon :icon="item.icon" class="me-3" />{{
                      item.label
                    }}
                  </a>
                </template>
              </div>

              <!-- 動態生成 accordion body，僅當 item.dropdown 為 true 時顯示 -->
              <!-- treasure spot下拉式內容 -->
              <div
                v-if="item.dropdown"
                :id="`collapse${index}`"
                class="accordion-collapse collapse"
                :aria-labelledby="`heading${index}`"
                data-bs-parent="#accordionNav"
              >
                <div class="accordion-body pt-0">
                  <ul class="px-4 py-0">
                    <div
                      v-for="section in item.dropdownSections"
                      :key="section.title"
                    >
                      <div class="dropdown-subtitle text-start mt-1">
                        <div :class="section.circleClass"></div>
                        <span class="dropdown-title fs-5 fw-regular ms-1">{{
                          section.title
                        }}</span>
                      </div>
                      <li
                        v-for="game in section.games"
                        :key="game.gid"
                        class="mx-0"
                      >
                        <a
                          class="dropdown-item winnie-dropdown-item my-2 px-2 py-1"
                          :href="game.link"
                        >
                          <span class="me-5 room-number fs-5 fw-regular">{{
                            game.gid
                          }}</span>
                          <span class="game-type-name fs-5 fw-regular">{{
                            game.type
                          }}</span>
                        </a>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <!-- FAQ以及他的下拉式選項 -->
            <div class="accordion-item">
              <div class="accordion-header" id="headingFour">
                <button
                  class="accordion-button collapsed fs-5 fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFour"
                  aria-expanded="false"
                  aria-controls="collapseFour"
                >
                  <font-awesome-icon
                    icon="fa-solid fa-circle-question"
                    class="me-3"
                  />FAQ
                </button>
              </div>
              <div
                id="collapseFour"
                class="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionNav"
              >
                <div class="accordion-body pt-0">
                  <ul class="ps-0">
                    <li class="my-2 py-2 text-start">
                      <a class="fs-5" href="about">
                        <img
                          style="width: 24px"
                          src="../assets/images/icon/md-info.svg"
                          alt=""
                        />
                        About OneChance
                      </a>
                    </li>
                    <li class="my-2 py-2 text-start">
                      <a class="fs-5" href="terms-of-service">
                        <img
                          style="width: 24px"
                          src="../assets/images/icon/ze-label-o 1.svg"
                          alt=""
                        />
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- 語言下拉式 -->
            <div class="accordion-item mt-3">
              <div class="accordion-header" id="headingFive">
                <select
                  class="form-select ms-3 w-auto"
                  aria-label="Default select example"
                >
                  <option selected>English</option>
                  <option value="1">繁體中文</option>
                </select>
              </div>
            </div>
            <!-- 登出按鈕 -->
            <div class="accordion-item mt-3" v-if="loggedIn">
              <div class="accordion-header" id="headingSeven">
                <a class="accordion-button fs-5 fw-bold" @click="handleLogout"
                  ><font-awesome-icon
                    icon="fa-solid fa-power-off"
                    class="me-3"
                  />Log Out</a
                >
              </div>
            </div>
            <!-- 更換主題色的選項 -->
            <div class="accordion-item mt-3">
              <div class="form-check form-switch me-auto ms-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  checked
                />
                <label class="form-check-label" for="flexSwitchCheckChecked">
                  <img src="@/assets/images/icon/md-wb_sunny.svg" alt="" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- modal-end -->

  <!-- 漢堡排btn start -->
  <button
    class="custom-navbar-toggler d-lg-none"
    type="button"
    data-bs-toggle="modal"
    data-bs-target="#navbarModal"
  >
    <span class="custom-navbar-toggler-icon"></span>
    <span class="custom-navbar-toggler-icon"></span>
    <span class="custom-navbar-toggler-icon"></span>
  </button>
  <!-- 漢堡排btn end -->
</template>

<script setup>
import LoginButtons from "@/components/Header/LoginButtons.vue";

const props = defineProps({
  loggedIn: Boolean,
  userId: String,
  balance: Number,
  userAvatar: String,
  navPhoneLinks: Array,
});

const emit = defineEmits([
  // "recharge",
  "logout",
  // "switchLanguage",
  // "navigateTo",
]);

const handleLogout = () => {
  console.log(1);
  emit("logout");
};

console.log(props.loggedIn, "loggedIn");
</script>

<style scoped>
.modal-header,
.modal-body {
  background: black;
}

.winnie-modal .accordion-item {
  background-color: transparent;
  border: none;
}

.winnie-modal .accordion-button {
  background-color: transparent;
  color: #f8f8f8;
}

.winnie-modal .accordion-button:focus {
  outline: none;
  box-shadow: none;
}

.winnie-modal .accordion {
  --bs-accordion-border-color: transparent;
}

.accordion-button:not([data-bs-toggle])::after {
  display: none;
}

.accordion-button.collapsed::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.winnie-modal .accordion .form-select:focus {
  border-color: transparent;
  box-shadow: none;
}

/* 漢堡選單 */
.custom-navbar-toggler {
  display: inline-block;
  cursor: pointer;
  border: none;
  background: transparent;
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
}

.custom-navbar-toggler-icon {
  width: 20px;
  height: 1px;
  background-color: #f8f8f8;
  display: block;
  margin: 5px auto;
  transition: background-color 0.2s;
}

.custom-navbar-toggler:focus {
  outline: none;
}

/* 存取款邊框 */
.personal-function-deposit {
  border-radius: 10px;
  background-color: #2b3139;
}

.personal-function-dashboard {
  border-radius: 10px;
  background-color: #2b3139;
}

/* Treasure Spot 展開樣式 */
.winnie-dropdown-item {
  color: #f8f8f8;
  font-size: 1rem;
  font-weight: 600;
  background-color: #2b3139;
  border-radius: 10px;
}

.winnie-dropdown-item:hover {
  background-color: #414d5a;
}
.winnie-dropdown-item:hover .game-type-name {
  color: #f8f8f8 !important;
}
.winnie-dropdown-item:hover .room-number {
  color: #bbb !important;
}
</style>
