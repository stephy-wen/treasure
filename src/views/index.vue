<template>
  <div>
    <div class="swiper-banner justify-content-center mx-auto mt-0 mt-lg-5">
      <SwiperBanner :banners="bannerData" />
    </div>
  </div>
</template>

<script setup>
import SwiperBanner from "@/components/SwiperBanner.vue"; // 引入輪播組件
import banner01 from "@/assets/images/common/banner01.png"; // 引入圖片
import banner02 from "@/assets/images/common/banner02.png"; // 引入圖片

// 輪播圖片數據
const bannerData = [
  { image: banner01, link: "#", alt: "Banner 1" },
  { image: banner02, link: "#", alt: "Banner 2" },
];
</script>

<style scoped></style>
