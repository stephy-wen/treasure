import { createRouter, createWebHistory } from "vue-router";

import About from "../views/About.vue";
import Index from "../views/index/index.vue";
import Login from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  { path: "/test-login", name: "testLogin", component: Login },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/register/index.vue"),
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/forgotPassword/index.vue"),
  },
  {
    path: "/manage-password",
    name: "managePassword",
    component: () => import("../views/managePassword/index.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/game/game-list",
    name: "Game",
    component: () => import("../views/game/index.vue"), // 動態導入
  },
  {
    path: "/game/:gameId", // 動態路由，使用遊戲的 ID 作為參數
    name: "GameDetail",
    component: () => import("../views/gameDetail/GameDetailPage.vue"), // 動態導入
    props: true, // 傳遞路由參數作為組件的 props
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: () => import("../views/Leaderboard/index.vue"), // 動態導入
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard/index.vue"), // 動態導入
  },
  {
    path: "/account/deposit",
    name: "Deposit",
    component: () => import("../views/Deposit/index.vue"), // 動態導入
  },
  {
    path: "/account/withdrawal",
    name: "Withdrawal",
    component: () => import("../views/Withdrawal/index.vue"), // 動態導入
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
