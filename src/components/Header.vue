<!-- NavBar.vue -->
<template>
  <header>
    <nav style="height: 60px" class="navbar navbar-expand-lg">
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
            :loggedIn="isLoggedIn"
            :userAvatar="userAvatar"
            :userId="userId"
            :balance="balance"
            @logout="handleLogout"
            @switchLanguage="switchLanguage"
          />
        </template>

        <!-- 以下為手機版 漢堡排展開的modal-start -->
        <MobileHeader
          :navPhoneLinks="navPhoneLinks"
          :loggedIn="isLoggedIn"
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

import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import modules from "../services/modules"; // 引入 API 模組

const {
  game: { getGameRoom },
} = modules;

const router = useRouter();
const userStore = useUserStore();

const isMobile = ref(window.innerWidth < 575.98);

window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth < 575.98;
});

// 定義這些變量，並根據 API 的返回數據更新它們
const userId = ref("");
const balance = ref(0);
const userAvatar = ref("");

let isLoggedIn = computed(() => userStore.isLoggedIn);

/*
display: 'all' 表示无论用户是否登录都显示该链接（如 Home）。
display: 'anonym' 表示只有在用户未登录时显示该链接（如 Sign in 和 Sign up）。
display: 'authorized' 表示只有在用户登录后显示该链接（如 New Post, Settings, Profile）。
*/

let gameData = ref(userStore.userInfo);

const token = localStorage.getItem("token");
// 如果pinia被清空 在組件加載時再打一次api
onMounted(async () => {
  // 1. 獲取 userInfo 資料
  if (token && (!gameData.value || Object.keys(gameData.value).length === 0)) {
    const fetchedData = await userStore.fetchUserInfo();
    gameData.value = fetchedData; // 保存 API 返回的數據

    // 從 API 返回的數據中提取需要的信息
    userId.value = gameData.value.name; // 更新用戶ID
    balance.value = gameData.value.balanceData.balance; // 更新餘額
    userAvatar.value = gameData.value.avatarUrl; // 更新用戶頭像
  }
});

// 為了避免 資料還沒取回 先顯示改由動態計算
const playHistoryData = computed(() => gameData.value?.playHistoryData || []);

// 使用 computed 來動態計算進行中的遊戲
const inProgressGameLinks = computed(() => {
  const inProgressGames = playHistoryData.value.filter(
    (game) => !game.gameEnded
  );
  return transformGameData(inProgressGames);
});

// 使用 computed 來動態計算已結束的遊戲
const drawnGameLinks = computed(() => {
  const drawnGames = playHistoryData.value.filter((game) => game.gameEnded);
  return transformGameData(drawnGames);
});

// 將遊戲歷史數據轉換成 `links` 所需的格式
const transformGameData = (games) => {
  return games.map((game) => ({
    url: `/game/${game.gameRoomId}`, // 使用 gameRoomId 作為路由參數
    gameRoom: game.gameRoomName,
  }));
};

// 大致流程
// 1.拿到使用者參加的所有遊戲
// 2.用狀態去分類 遊戲群
// 3.拿到遊戲群組 去跑url (把下面的links取代掉)

// 根據登入狀態判斷選單讀取權限
const displayStatus = computed(() =>
  isLoggedIn.value ? "authorized" : "anonym"
);

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
        games: inProgressGameLinks,
      },
      {
        circleClass: "green-circle",
        title: "In Progress",
        games: drawnGameLinks,
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
]);

const navLinks = computed(() =>
  navItems.value.filter(
    (item) => item.display === displayStatus.value || item.display === "all"
  )
);

const navPhoneItems = ref([
  {
    id: 0,
    label: "Setting",
    icon: "fa-solid fa-cog",
    url: "/account/setting",
    dropdown: false,
    display: "authorized",
  },
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
        games: inProgressGameLinks,
      },
      {
        title: "In Progress",
        circleClass: "green-circle",
        games: drawnGameLinks,
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

const handleLogout = async () => {
  try {
    // 調用登出函數
    await userStore.logoutUser();
    // 跳轉到登入頁面
    router.push("/");
  } catch (error) {
    console.error("Logout failed", error);
  }
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
