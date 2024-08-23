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

        <!-- 桌面版 -->
        <template v-if="!isMobile">
          <DesktopHeader
            :navLinks="navLinks"
            :loggedIn="loggedIn"
            :userAvatar="userAvatar"
            :userId="userId"
            :balance="balance"
            @recharge="handleRecharge"
            @logout="handleLogout"
            @switchLanguage="switchLanguage"
            @navigateTo="navigateTo"
          />
        </template>

        <!-- 以下為手機版 漢堡排展開的modal-start -->
        <MobileHeader
          :navPhoneLinks="navPhoneLinks"
          :loggedIn="loggedIn"
          :userAvatar="userAvatar"
          :userId="userId"
          :balance="balance"
          @logout="handleLogout"
        />
      </div>
    </nav>
  </header>
</template>

<script setup>
import DesktopHeader from "@/components/Header/DesktopHeader.vue";
import MobileHeader from "@/components/Header/MobileHeader.vue";
import UserAvat from "@/assets/images/icon/NFT/09.png";

import { ref, computed } from "vue";
import { logout } from "../services/auth"; // 引入登出函數
import { useRouter } from "vue-router";

const router = useRouter();

const isMobile = ref(window.innerWidth < 575.98);

window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth < 575.98;
});

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

const navPhoneItems = ref([
  {
    id: 1,
    label: "Hunt",
    icon: "fa-solid fa-rocket",
    url: "/game/game-list",
    dropdown: false,
    display: "all",
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
    display: "authorized",
  },
  {
    id: 3,
    label: "Leaderboard",
    icon: "fa-solid fa-chart-simple",
    url: "/leaderboard",
    dropdown: false,
    display: "all",
  },
  // {
  //   id: 4,
  //   label: "Learn",
  //   icon: "fa-solid fa-circle-info",
  //   url: "/about",
  //   dropdown: false,
  //   display: "all",
  // },
]);

const navPhoneLinks = computed(() =>
  navPhoneItems.value.filter(
    (item) => item.display === displayStatus.value || item.display === "all"
  )
);

const switchLanguage = (item) => {
  // 根據選擇的語言進行切換
  console.log("切換語言:", item.code);
};

const navigateTo = (item) => {
  // 導向相應的頁面
  window.location.href = item.href;
};
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
</style>
