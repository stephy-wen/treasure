<!-- NavBar.vue -->
<template>
  <header>
    <nav style="height: 30px" class="navbar navbar-expand-lg">
      <div class="container-fluid">
        <div class="logo ps-3 ps-md-4 ps-lg-5 pe-lg-5">
          <router-link to="/" class="text-white">
            <img
              style="height: 25px"
              src="@/assets/images/icon/logo name.svg"
              alt="Logo"
            />
          </router-link>
        </div>
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

        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto ms-2 mb-2 mb-lg-0">
            <li
              v-for="item in navLinks"
              :key="item.id"
              class="nav-item"
              :class="{ dropdown: item.dropdown }"
            >
              <template v-if="item.dropdown">
                <router-link
                  :class="
                    'winnie-nav-link fs-6 ' +
                    (item.dropdown ? 'dropdown-toggle' : '')
                  "
                  to="#"
                  :id="item.id"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ item.label + 20 }}
                </router-link>
                <ul class="dropdown-menu px-4 py-3" :aria-labelledby="item.id">
                  <p class="dropdown-title">{{ item.dropdownTitle }}</p>
                  <div
                    v-for="section in item.dropdownSections"
                    :key="section.title"
                  >
                    <div class="dropdown-subtitle mt-3">
                      <div :class="section.circleClass"></div>
                      <span class="dropdown-title">{{ section.title }}</span>
                    </div>
                    <li
                      v-for="link in section.links"
                      :key="link.roomNumber"
                      class="mx-0"
                    >
                      <router-link
                        class="dropdown-item winnie-dropdown-item my-2"
                        :to="link.url"
                      >
                        <span class="me-5 room-number">{{
                          link.roomNumber
                        }}</span>
                        <span class="game-type-name">{{ link.gameType }}</span>
                      </router-link>
                    </li>
                  </div>
                </ul>
              </template>
              <template v-else>
                <router-link class="winnie-nav-link fs-6" :to="item.url">{{
                  item.label
                }}</router-link>
              </template>
            </li>
          </ul>
          <div class="d-flex align-items-center">
            <!-- 根據是否登入顯示不同內容 -->
            <template v-if="loggedIn">
              <!-- 登入後出現 -->
              <div
                class="dropdown dropdown-member-info d-inline-flex align-items-center me-3"
              >
                <a
                  class="d-flex align-items-center dropdown-toggle"
                  style="color: #f8f8f8"
                  href="#"
                  id="dropdownMenuMember"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="fa-solid fa-circle-user me-2"></i>
                  <p class="personal-id text-center fs-6 fw-bold mb-0">
                    {{ userId }}
                  </p>
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-lg-start px-3 py-4 fw-bold"
                  style="width: 250px"
                  aria-labelledby="dropdownMenuMember"
                >
                  <div class="personal-info">
                    <div class="personal-photo text-center mt-1">
                      <img
                        class="img-fluid"
                        style="max-width: 36px"
                        src="../assets/images/icon/NFT/09.png"
                        alt="User Avatar"
                      />
                    </div>
                    <p class="personal-id text-center fs-6">
                      <i class="fa-solid fa-circle-user mt-3 me-2"></i
                      >{{ userId }}
                    </p>
                  </div>
                  <div class="personal-balance-info mt-2 mt-4">
                    <div
                      class="d-flex justify-content-center align-items-center mt-3 mx-3"
                    >
                      <p class="personal-balance fw-bold mb-0">
                        <img
                          class="me-2 img-fluid"
                          style="max-width: 30px; vertical-align: middle"
                          src="../assets/images/icon/balance-icon.png"
                          alt="Balance Icon"
                        />{{ balance }}
                        <a href="#">
                          <img
                            class="img-fluid ms-2 mb-1"
                            style="max-width: 16px; vertical-align: middle"
                            src="../assets/images/icon/antOutline-eye.svg"
                            alt="Eye Icon"
                          />
                        </a>
                      </p>
                    </div>
                    <div class="text-center mt-1">
                      <button
                        class="btn btn-primary fs-6 mt-1 px-4"
                        style="border-radius: 50px"
                        type="button"
                        @click="recharge"
                      >
                        Recharge Now
                      </button>
                    </div>
                  </div>
                  <li class="mt-4">
                    <a
                      class="dropdown-item winnie-member-info fs-6 fw-bold"
                      href="dashboard"
                    >
                      <img
                        class="me-3 mb-1"
                        style="max-width: 16px"
                        src="../assets/images/icon/md-dashboard.svg"
                        alt="Dashboard Icon"
                      />Dashboard
                    </a>
                  </li>
                  <li class="mt-2">
                    <a
                      class="dropdown-item winnie-member-info fs-6 fw-bold"
                      href="account/login"
                    >
                      <i class="fa-solid fa-power-off me-3"></i>Log Out
                    </a>
                  </li>
                </ul>
              </div>
            </template>
            <template v-else>
              <!-- 未登入時顯示登入和註冊按鈕 -->
              <button
                class="btn btn-outline-primary me-1 me-xl-2 fs-6"
                type="button"
                @click="redirectTo('account/login')"
              >
                Log In
              </button>
              <button
                class="btn btn-primary me-lg-2 me-xl-5 ms-lg-2 fs-6"
                type="button"
                @click="redirectTo('account/register')"
              >
                Sign Up
              </button>
            </template>

            <div class="d-flex">
              <div
                class="dropdown dropdown-language"
                style="display: inline-flex"
              >
                <a
                  class="d-flex align-items-center dropdown-toggle"
                  href="#"
                  id="dropdownMenuLanguage"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src="../assets/images/icon/md-language.svg" alt="" />
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-lg-start px-3 py-3 fw-bold"
                  aria-labelledby="dropdownMenuLanguage"
                >
                  <li>
                    <a class="dropdown-item winnie-language fs-6" href="#">
                      English
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item winnie-language fs-6" href="#">
                      繁體中文
                    </a>
                  </li>
                </ul>
              </div>
              <div class="dropdown dropdown-faq" style="display: inline-flex">
                <a
                  class="d-flex align-items-center dropdown-toggle mx-1 mx-xl-3"
                  href="#"
                  id="dropdownMenuFaq"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="../assets/images/icon/antFill-question-circle.svg"
                    alt=""
                  />
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-lg-start px-2 py-3 fw-bold"
                  aria-labelledby="dropdownMenuFaq"
                >
                  <li class="py-1">
                    <a
                      class="dropdown-item winnie-faq fs-6 d-flex align-items-center"
                      href="about"
                    >
                      <img
                        class="me-2"
                        style="width: 24px"
                        src="../assets/images/icon/md-info.svg"
                        alt=""
                      />
                      About OneChance
                    </a>
                  </li>
                  <li class="py-1">
                    <a
                      class="dropdown-item winnie-faq fs-6 d-flex align-items-center"
                      href="terms-of-service"
                    >
                      <img
                        class="me-2"
                        style="width: 24px"
                        src="../assets/images/icon/ze-label-o 1.svg"
                        alt=""
                      />
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>
              <a href="#">
                <img src="../assets/images/icon/arcoDesign-moon.svg" alt="" />
              </a>
            </div>
          </div>
        </div>

        <!-- modal-start -->
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
                <template v-if="loggedIn">
                  <div class="personal-info">
                    <div class="personal-photo text-center">
                      <img src="../assets/images/icon/NFT/09.png" alt="" />
                    </div>
                    <p class="personal-id text-center fs-5 fw-bold">
                      <i class="fa-solid fa-circle-user mt-3 me-2"></i
                      >{{ userId }}
                    </p>
                  </div>
                  <div class="personal-balance-info mt-5">
                    <div
                      class="d-flex justify-content-between align-items-center mx-3"
                    >
                      <p class="personal-balance-title fs-5 fw-bold mb-0">
                        Estimated Balance
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
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingOne">
                      <a
                        class="accordion-button fs-5 fw-bold"
                        href="game/game-list"
                        ><i class="fa-solid fa-rocket me-3"></i>Hunt</a
                      >
                    </div>
                  </div>
                  <div class="accordion-item" v-if="loggedIn">
                    <div class="accordion-header" id="headinSix">
                      <button
                        class="accordion-button collapsed fs-5 fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSix"
                        aria-expanded="false"
                        aria-controls="collapseSix"
                      >
                        <i class="fa-solid fa-crosshairs me-3"></i>Treasure Spot
                      </button>
                    </div>
                    <div
                      id="collapseSix"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingSix"
                      data-bs-parent="#accordionNav"
                    >
                      <div class="accordion-body pt-0">
                        <ul class="px-4 py-0">
                          <div
                            v-for="section in dropdownSections"
                            :key="section.title"
                          >
                            <div class="dropdown-subtitle mt-1">
                              <div :class="section.circleClass"></div>
                              <span class="dropdown-title fs-5 fw-regular">{{
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
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingTwo">
                      <a
                        class="accordion-button fs-5 fw-bold"
                        href="leaderboard"
                        ><i class="fa-solid fa-chart-simple me-3"></i
                        >Leaderboard</a
                      >
                    </div>
                  </div>
                  <div class="accordion-item">
                    <div class="accordion-header" id="headingThree">
                      <a class="accordion-button fs-5 fw-bold" href="about">
                        <i class="fa-solid fa-circle-info me-3"></i>Learn
                      </a>
                    </div>
                  </div>
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
                        <i class="fa-regular fa-circle-question me-3"></i>Docs
                      </button>
                    </div>
                    <div
                      id="collapseFour"
                      class="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionNav"
                    >
                      <div class="accordion-body pt-0">
                        <ul>
                          <li class="my-2 py-2">
                            <a class="fs-5" href="about">
                              <img
                                class="me-1"
                                style="width: 24px"
                                src="../assets/images/icon/md-info.svg"
                                alt=""
                              />
                              About OneChance
                            </a>
                          </li>
                          <li class="my-2 py-2">
                            <a class="fs-5" href="terms-of-service">
                              <img
                                class="me-1"
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
                  <div class="accordion-item mt-3" v-if="loggedIn">
                    <div class="accordion-header" id="headingSeven">
                      <a
                        class="accordion-button fs-5 fw-bold"
                        href="account/login"
                        ><i class="fa-solid fa-power-off me-3"></i>Log Out</a
                      >
                    </div>
                  </div>
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
                          src="../assets/imagesimages/icon/md-wb_sunny.svg"
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
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from "vue";
const userId = ref("winnie33527");
const balance = ref("3,969,443");
const loggedIn = true;

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
