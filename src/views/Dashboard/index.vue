<template>
  <div>
    <h1>Dashboard</h1>
    <MobileDashboard v-if="isMobile"/>
    <DesktopDashboard/>

  </div>
</template>

<script setup>
import MobileDashboard from "./MobileDashboard.vue"
import DesktopDashboard from "./DesktopDashboard.vue"

// 監聽螢幕變化起
const isMobile = ref(window.innerWidth < 575.98);

const handleResize = () => {
  isMobile.value = window.innerWidth < 575.98;
};

// 監聽頁面寬度變化
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

// 组件銷毀時移除監聽
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
// 監聽螢幕變化 始

</script>

<style scoped>
h1 {
  width: 200px;
  margin: 0 auto;
  margin-top: 30px;
}
</style>
