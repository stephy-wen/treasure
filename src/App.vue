<template>
  <Header v-if="isMobile || (!isMobile && !isShow)" />
  <router-view />
  <Footer v-if="!isShow" />
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted, watchEffect } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

// get current route
const route = useRoute();
const isShow = ref(true);
const isMobile = ref(false);

watchEffect(() => {
  const pathsToHideHeader = [
    "/manage-password",
    "/forgot-password",
    "/register",
    "/login",
  ];

  isShow.value = pathsToHideHeader.includes(route.path);
});

// 檢測螢幕大小並切換樣式
const checkDevice = () => {
  isMobile.value = window.innerWidth <= 768; // 設定768px為手機和桌面的臨界點
};

onMounted(() => {
  checkDevice(); // 初次挂载时运行一次
  window.addEventListener("resize", checkDevice); // 監聽視窗大小變化
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
