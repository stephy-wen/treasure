import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
