<template>
  <div class="swiper-banner justify-content-center mx-auto mt-0 mt-lg-5">
    <Swiper
      :class="swiperClass"
      :autoplay="{ delay: autoplayDelay }"
      loop
      :pagination="pagination ? { clickable: true } : false"
      :scrollbar="scrollbar ? { draggable: true } : false"
      :modules="modules"
      :effect="effect"
      :coverflow-effect="coverflowEffect"
      :breakpoints="breakpoints"
    >
      <SwiperSlide
        v-for="(item, index) in swiperData"
        :key="index"
        class="index-banner"
      >
        <!-- 圖片有手機板 區分時 -->
        <!-- 如果有區分手機和桌面圖片 -->
        <a :href="item.link" v-if="item.mobileImage && item.image">
          <img
            class="img-fluid d-md-none rounded-0"
            :src="item.mobileImage"
            :alt="item.alt"
          />
          <img
            class="img-fluid d-none d-md-block"
            :src="item.image"
            :alt="item.alt"
          />
        </a>

        <!-- 如果沒有區分，只有一個通用圖片 -->
        <a :href="item.link" v-else>
          <img class="img-fluid" :src="item.image" :alt="item.alt" />
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
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  EffectCoverflow,
} from "swiper/modules";
// loop: 啟用幻燈片循環播放。
// :pagination="{ clickable: true }": 顯示可點擊的分頁點。
// :scrollbar="{ draggable: true }": 顯示可拖動的滾動條。
// :modules="[Autoplay, Pagination, Navigation]": 指定 Swiper 使用的功能模組

// Props definition 未傳遞部分使用預設值
const props = defineProps({
  swiperData: {
    type: Array,
    required: true,
  },
  autoplayDelay: {
    type: Number,
    default: 3000,
  },
  pagination: {
    type: Boolean,
    default: false,
  },
  scrollbar: {
    type: Boolean,
    default: false,
  },
  effect: {
    type: String,
    default: "slide",
  },
  coverflowEffect: {
    type: Object,
    default: () => ({}),
  },
  breakpoints: {
    type: Object,
    default: () => ({}),
  },
  modules: {
    type: Array,
    default: () => [Autoplay, Pagination, Scrollbar, EffectCoverflow],
  },
  swiperClass: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
.index-banner img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}

.game-card .index-banner img {
  border-radius: 10px;
}

@media (min-width: 991.98px) {
  .index-banner img {
    border-radius: 30px;
  }
}
</style>
