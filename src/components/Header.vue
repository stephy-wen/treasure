<!-- NavBar.vue -->
<template>
  <header>
    <nav style="height: 30px" class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <!-- header 圖檔 start -->
        <div class="logo ps-3 ps-md-4 pe-lg-5">
          <router-link :to="{ name: 'Index' }" class="text-white">
            <img
              style="height: 25px"
              src="@/assets/images/icon/logo name.svg"
              alt="Logo"
            />
          </router-link>
        </div>
        <!-- header 圖檔 end -->

        <!-- 電腦版nav 從hunting game到月亮icon -->
        <div class="collapse navbar-collapse">
          <!-- hunting game 到 leaderboard -->
          <NavMenu :links="navLinks" />

          <!-- 右側區塊 使用者個人資訊 -->
          <div class="d-flex align-items-center">
            <!-- 根據是否登入顯示不同內容 -->
            <!-- 使用 UserDropdown 組件 -->
            <template v-if="loggedIn">
              <UserDropdown
                :userId="userId"
                :balance="balance"
                :userAvatar="userAvatar"
                @recharge="handleRecharge"
                @logout="handleLogout"
              />
            </template>

            <template v-else>
              <!-- 未登入時顯示登入和註冊按鈕 -->
              <LoginButtons
                @login="redirectTo('account/login')"
                @signup="redirectTo('account/register')"
              />
            </template>

            <!-- 語系及導覽 -->
            <div class="d-flex">
              <!-- 語系下拉式 -->
              <DropdownMenu
                menuId="dropdownMenuLanguage"
                :iconSrc="mdLanguage"
                iconAlt="Language Icon"
                :items="languageOptions"
                @select="switchLanguage"
                dropdownClass="dropdown-language"
              />
              <!-- 導覽下拉式 -->
              <DropdownMenu
                menuId="dropdownMenuFaq"
                :iconSrc="faqImage"
                iconAlt="FAQ Icon"
                :items="faqOptions"
                @select="navigateTo"
                dropdownClass="dropdown-faq"
              />
              <!-- 切換主題顏色 月亮icon -->
              <a href="#">
                <img src="../assets/images/icon/arcoDesign-moon.svg" alt="" />
              </a>
            </div>
          </div>
        </div>

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
                      <img src="../assets/images/icon/NFT/09.png" alt="" />
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
                      <img
                        src="../assets/images/icon/antOutline-eye.svg"
                        alt=""
                      />
                    </div>
                    <div
                      class="d-flex justify-content-start align-items-center mt-3 mx-3"
                    >
                      <p class="personal-balance fw-bold mb-0">
                        <img
                          class="me-2"
                          src="../assets/images/icon/balance-icon.png"
                          alt=""
                        />{{ balance }}
                      </p>
                    </div>
                  </div>
                  <!-- deposit & dashboard btn -->
                  <div class="personal-function mt-4">
                    <div class="row justify-content-center">
                      <div
                        class="col-5 text-center personal-function-deposit mx-2"
                      >
                        <a
                          href="account/deposit"
                          class="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                          style="color: #f8f8f8; height: 100px"
                        >
                          <img
                            src="../assets/images/icon/semiDesign-semi-icons-plus.svg"
                            alt=""
                          />
                          <p class="mt-2 mb-0 fs-5 fw-bold">Deposit</p>
                        </a>
                      </div>
                      <div
                        class="col-5 text-center personal-function-dashboard mx-2"
                      >
                        <a
                          href="dashboard"
                          class="d-flex flex-column align-items-center justify-content-center text-decoration-none"
                          style="color: #f8f8f8; height: 100px"
                        >
                          <img
                            src="../assets/images/icon/md-dashboard.svg"
                            alt=""
                          />
                          <p class="mt-2 mb-0 fs-5 fw-bold">Dashboard</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <!-- 未登入時，要出現log in & sign up btn -->
                  <div class="row">
                    <div class="col">
                      <button
                        class="btn btn-outline-primary me-1 me-xl-2 fs-5 fw-bold w-100"
                        type="button"
                        @click="redirectTo('account/login')"
                      >
                        Log In
                      </button>
                    </div>
                    <div class="col">
                      <button
                        class="btn btn-primary me-lg-2 me-x l-5 ms-lg-2 fs-5 fw-bold w-100"
                        type="button"
                        @click="redirectTo('account/register')"
                      >
                        Sign Up
                      </button>
                    </div>
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
                        <a
                          class="accordion-button fs-5 fw-bold"
                          :href="item.url"
                        >
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
                              <span
                                class="dropdown-title fs-5 fw-regular ms-1"
                                >{{ section.title }}</span
                              >
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
                                <span
                                  class="me-5 room-number fs-5 fw-regular"
                                  >{{ game.gid }}</span
                                >
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
                      <a
                        class="accordion-button fs-5 fw-bold"
                        href="account/login"
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
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckChecked"
                      >
                        <img
                          src="../assets/images/icon/md-wb_sunny.svg"
                          alt=""
                        />
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
      </div>
    </nav>
  </header>
</template>

<script setup>
import UserAvat from "@/assets/images/icon/NFT/09.png";
import mdLanguage from "@/assets/images/icon/md-language.svg";
import faqImage from "../assets/images/icon/antFill-question-circle.svg";
import mdInfo from "../assets/images/icon/md-info.svg";
import zeLabelImage from "../assets/images/icon/ze-label-o 1.svg";
import { ref, computed } from "vue";
import { logout } from "../services/auth"; // 引入登出函數
import { useRouter } from "vue-router";
import UserDropdown from "@/components/Header/UserDropdown.vue";
import NavMenu from "@/components/Header/NavMenu.vue";
import LoginButtons from "@/components/Header/LoginButtons.vue";
import DropdownMenu from "@/components/Header/DropdownMenu.vue";

const languageOptions = [
  { label: "English", code: "en" },
  { label: "繁體中文", code: "zh" },
];

const faqOptions = [
  {
    label: "About OneChance",
    href: "about",
    icon: mdInfo,
  },
  {
    label: "Terms of Service",
    href: "terms-of-service",
    icon: zeLabelImage,
  },
];

const switchLanguage = (item) => {
  // 根據選擇的語言進行切換
  console.log("切換語言:", item.code);
};

const navigateTo = (item) => {
  // 導向相應的頁面
  window.location.href = item.href;
};

const router = useRouter();

const userId = ref("winnie33527");
const balance = ref(3, 969, 443);
const userAvatar = ref(UserAvat);

let loggedIn = ref(true);

// const { user } = storeToRefs(useUserStore());
const user = ref({ username: "authorized" });
// const user = ref({ username: "anonym" });

/*
display: 'all' 表示无论用户是否登录都显示该链接（如 Home）。
display: 'anonym' 表示只有在用户未登录时显示该链接（如 Sign in 和 Sign up）。
display: 'authorized' 表示只有在用户登录后显示该链接（如 New Post, Settings, Profile）。
*/

// 參加的遊戲url處理
// 模拟用户参与的游戏数据
const userGames = ref([
  {
    url: "game/play-bnb.html",
    roomNumber: "GID 1225",
    gameType: "BINANCE",
    status: "drawn",
  },
  {
    url: "game/play-trx.html",
    roomNumber: "GID 1136",
    gameType: "TRON",
    status: "in-progress",
  },
  // 更多游戏数据
]);

// const drawnGames = userGames.value.filter((game) => game.status === "drawn");
// const inProgressGames = userGames.value.filter(
//   (game) => game.status === "in-progress"
// );

// 大致流程
// 1.拿到使用者參加的所有遊戲
// 2.用狀態去分類 遊戲群
// 3.拿到遊戲群組 去跑url (把下面的links取代掉)

const navItems = ref([
  {
    id: "0",
    label: "Hunting Game",
    dropdown: false,
    routeName: "Game", // 使用路由名称
    url: "game/game-list", // 内部导航 URL
    display: "all",
  },
  {
    id: "1",
    label: "Treasure Spot",
    dropdown: true,
    dropdownTitle: "Treasure Spot",
    dropdownSections: [
      {
        circleClass: "red-circle",
        title: "Drawn",
        links: [
          {
            url: "game/play-bnb.html",
            roomNumber: "GID 1225",
            gameType: "BINANCE",
          },
          {
            url: "game/play-trx.html",
            roomNumber: "GID 1136",
            gameType: "TRON",
          },
        ],
        // links: drawnGames.value, // 渲染已结束的游戏 等api
      },
      {
        circleClass: "green-circle",
        title: "In Progress",
        links: [
          {
            url: "game/play-bnb.html",
            roomNumber: "GID 1225",
            gameType: "BINANCE",
          },
          {
            url: "game/play-trx.html",
            roomNumber: "GID 1136",
            gameType: "TRON",
          },
        ],
        // links: inProgressGames.value, // 渲染进行中的游戏 等api
      },
    ],
    display: "authorized",
  },
  {
    id: "2",
    label: "Leaderboard",
    dropdown: false,
    routeName: "Leaderboard", // 使用路由名称
    url: "leaderboard",
    display: "all",
  },
  // { id: "3", label: "Learn", dropdown: false, url: "about", display: "anonym" },
]);

//username.value 有值 displayStatus=>authorized
// const username = computed(() => user.value?.username);

// const displayStatus = computed(() =>
//   username.value ? "authorized" : "anonym"
// );
// const navLinks = computed(() =>
//   navItems.value.filter(
//     (item) => item.display === displayStatus.value || item.display === "all"
//   )
// );

const handleRecharge = () => {
  // 處理充值邏輯
};

const handleLogout = async () => {
  try {
    // 調用登出函數
    await logout();
    // 跳轉到登入頁面
    router.push("/");
    loggedIn.value = false;
  } catch (error) {
    console.error("Logout failed", error);
  }
};

// 根据用户名判断用户状态 暫時替代
const displayStatus = computed(() =>
  user.value.username === "authorized" ? "authorized" : "anonym"
);

const navLinks = computed(() =>
  navItems.value.filter(
    (item) => item.display === displayStatus.value || item.display === "all"
  )
);

console.log(displayStatus.value);

const navPhoneLinks = ref([
  {
    id: 1,
    label: "Hunt",
    icon: "fa-solid fa-rocket",
    url: "/game/game-list",
    dropdown: false,
  },
  {
    id: 2,
    label: "Treasure Spot",
    icon: "fa-solid fa-crosshairs",
    dropdown: true,
    dropdownSections: [
      {
        title: "Drawn",
        circleClass: "red-circle",
        games: [
          { gid: "GID 1225", type: "BINANCE", link: "/game/play-bnb" },
          { gid: "GID 1136", type: "TRON", link: "/game/play-trx" },
        ],
      },
      {
        title: "In Progress",
        circleClass: "green-circle",
        games: [
          { gid: "GID 1234", type: "ETH", link: "/game/play-eth" },
          { gid: "GID 5678", type: "BTC", link: "/game/play-btc" },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Leaderboard",
    icon: "fa-solid fa-chart-simple",
    url: "/leaderboard",
    dropdown: false,
  },
  {
    id: 4,
    label: "Learn",
    icon: "fa-solid fa-circle-info",
    url: "/about",
    dropdown: false,
  },
]);
</script>

<style scoped>
/* 添加你的 CSS 樣式 */

/* header */
header {
  background-color: #181a20;
  color: #fff;
}

header nav ul li {
  margin: 0 1rem;
}

header nav ul li a {
  color: #f8f8f8;
  text-decoration: none;
  padding: 10px 5px;
  font-weight: 600;
}
@media (min-width: 1199.98px) {
  header nav ul li a {
    padding: 10px 15px;
  }
}

header nav ul li a:hover {
  color: #fcd535;
}

.navbar .navbar-toggler {
  border: none;
}

.navbar .navbar-toggler .navbar-toggler-icon {
  color: #f8f8f8;
}

.navbar .btn-outline-primary {
  border-color: #fcd535;
  color: #f8f8f8;
  font-weight: 600;
  border-radius: 10px;
}

.navbar .btn-primary {
  background-color: #fcd535;
  border-color: #fcd535;
  color: #181a20;
  font-weight: 600;
  border-radius: 10px;
}

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

.winnie-nav-link {
  color: #f8f8f8;
  display: flex;
  align-items: center;
  height: 100%;
}

.dropdown-menu {
  background-color: #1e2329;
}

.dropdown-title {
  font-size: 1rem;
  color: #f8f8f8;
  font-weight: 600;
}

.red-circle {
  width: 10px;
  height: 10px;
  background-color: #f63e3d;
  border: 1px solid #35485d;
  border-radius: 50%;
  display: inline-block;
}

.green-circle {
  width: 10px;
  height: 10px;
  background-color: #71f63d;
  border: 1px solid #35485d;
  border-radius: 50%;
  display: inline-block;
}

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

.collapse .dropdown-member-info p {
  color: #f8f8f8;
}

.collapse .dropdown-member-info .personal-balance {
  font-size: 1.25rem;
}

.collapse .dropdown-member-info .winnie-member-info {
  background-color: transparent;
  color: #f8f8f8;
}

.dropdown-toggle::after {
  display: none;
}
@media (min-width: 991.98px) {
  .dropdown-menu-lg-start[data-bs-popper] {
    right: 0;
    left: auto;
    top: 2.5em;
  }
}

.dropdown-language ul li .winnie-language {
  color: #f8f8f8;
}

.dropdown-language ul li .dropdown-item:hover {
  color: #f8f8f8;
  background-color: #35485d;
}

.dropdown-faq ul li .winnie-faq {
  color: #f8f8f8;
}

.dropdown-faq ul li .dropdown-item:hover {
  color: #f8f8f8;
  background-color: #35485d;
}

.modal-content {
  background-color: #181a20;
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .modal-md-half {
    max-width: 50%;
    margin-left: auto;
    margin-right: 0;
  }
}
@media (max-width: 767.98px) {
  .modal-fullscreen-md-down {
    max-width: 100%;
  }
}

.winnie-modal .modal-header {
  border-bottom: none;
}

.winnie-modal .modal-footer {
  border-top: none;
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

.form-check {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-check-input:checked {
  background-color: grey;
  border-color: grey;
}

.form-check-input:not(:checked) {
  background-color: white;
  border-color: white;
}

.form-check-input {
  cursor: pointer;
}

.form-check-label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-check-input:focus {
  box-shadow: none;
}

.personal-balance-info .personal-balance {
  font-size: 2.2rem;
}

.personal-function-deposit {
  border-radius: 10px;
  background-color: #2b3139;
}

.personal-function-dashboard {
  border-radius: 10px;
  background-color: #2b3139;
}
</style>
