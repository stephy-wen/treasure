<template>
  <div class="swiper-banner justify-content-center mx-auto mt-0 mt-lg-5">
    <Swiper
      class="mySwiper"
      :autoplay="{ delay: autoplayDelay }"
      loop
      :pagination="{ clickable: true }"
      :scrollbar="{ draggable: true }"
      :modules="[Autoplay, Pagination, Navigation]"
    >
      <SwiperSlide
        v-for="(banner, index) in banners"
        :key="index"
        class="index-banner"
      >
        <a :href="banner.link">
          <img class="img-fluid" :src="banner.image" :alt="banner.alt" />
        </a>
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue"; // Import Swiper Vue.js components
import "swiper/css"; // Import Swiper styles
import "swiper/css/pagination"; // Import Swiper pagination styles
import "swiper/css/scrollbar"; // Import Swiper scrollbar styles
import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
// loop: 啟用幻燈片循環播放。
// :pagination="{ clickable: true }": 顯示可點擊的分頁點。
// :scrollbar="{ draggable: true }": 顯示可拖動的滾動條。
// :modules="[Autoplay, Pagination, Navigation]": 指定 Swiper 使用的功能模組

// Props definition
const props = defineProps({
  banners: {
    type: Array,
    required: true,
  },
  autoplayDelay: {
    type: Number,
    default: 3000,
  },
});
</script>

<style scoped></style>
