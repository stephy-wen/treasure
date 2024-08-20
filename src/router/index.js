import { createRouter, createWebHistory } from "vue-router";

import About from "../views/About.vue";
import Index from "../views/index/index.vue";

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/game/game-list",
    name: "Game",
    component: () => import("../views/game/index.vue"), // 动态导入
  },
  {
    path: "/game/:gameId", // 动态路由，使用游戏的 ID 作为参数
    name: "GameDetail",
    component: () => import("../views/game/GameDetailPage.vue"), // 动态导入
    props: true, // 传递路由参数作为组件的 props
  },
  {
    path: "/leaderboard",
    name: "Leaderboard",
    component: () => import("../views/Leaderboard/index.vue"), // 动态导入
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
