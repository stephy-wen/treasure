<template>
  <Header v-if="showHeader" />
  <router-view />
  <Footer />
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watchEffect } from "vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

// get current route
const route = useRoute();
const showHeader = ref(true);

watchEffect(() => {
  const pathsToHideHeader = [
    "/manage-password",
    "/forgot-password",
    "/register",
    "/login",
  ];
  showHeader.value = !pathsToHideHeader.includes(route.path); // false 的時候才顯示header
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
