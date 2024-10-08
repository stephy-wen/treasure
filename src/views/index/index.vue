<template>
  <div>
    <h1>Welcome, {{ userStore.userInfo?.name }}</h1>
  </div>
  <div class="mx-lg-5">
    <!-- banner 輪播 -->
    <div class="swiper-banner justify-content-center mx-auto mt-0 mt-lg-5">
      <Swiper
        :swiperClass="'mySwiper'"
        :swiperData="banner"
        :pagination="false"
        :scrollbar="false"
      />
    </div>

    <!-- card 輪播 -->
    <div>
      <div class="text-center">
        <p class="game-title fw-bolder d-sm-none mt-5" style="font-size: 3rem">
          <span style="color: #fcd535">T</span>HE GAME
        </p>
      </div>
      <div class="game-card mt-5">
        <div class="card-intro text-center mx-2">
          <h1 class="fw-bolder">
            DIVE INTO THE MOST THRILLING TREASURE HUNT OF YOUR LIFE!
          </h1>
          <p class="mt-3 fs-5 d-none d-lg-block">
            Let’s explore the mysteries of the crypto world together and achieve
            your wealth dreams!
          </p>
        </div>
        <Swiper
          :swiperClass="'myCardSwiper mt-5'"
          :swiperData="gameRoomList"
          :pagination="false"
          :scrollbar="false"
          effect="coverflow"
          :coverflow-effect="coverflowEffect"
          :breakpoints="breakpoints"
        >
        </Swiper>
        <div class="text-center mt-5">
          <button
            class="more-btn px-5 py-2 fs-5"
            onclick="window.location.href='game/game-list';"
          >
            START GAME
          </button>
        </div>
      </div>
    </div>

    <!-- game-intro -->
    <div class="game-intro mx-auto mt-5">
      <div class="row">
        <div class="col-12 col-xl-8 my-auto text-center text-xl-start">
          <h1 class="fw-bolder">LOST TREASURE</h1>
          <p class="mt-3 fs-5 d-block d-sm-none">
            It's teeming with stories of sudden wealth in various forms.
          </p>
          <p class="mt-5 fs-5 d-none d-sm-block">
            The only venue for serious degens seeking serious rewards.
            <br />
            Built by a veteran team with a track record of delivering provably
            fair,
            <br />
            fun on-chain games and innovative reward systems.
          </p>
        </div>
        <div class="col-12 col-xl-4 text-center">
          <img
            class="img-fluid w-100 mt-5"
            style="max-width: 400px"
            :src="diamondSM"
            alt="diamond"
          />
        </div>
      </div>
    </div>

    <!-- PLATFORM stats -->
    <div class="stats mx-auto mt-5">
      <div class="stats-intro text-center text-lg-start">
        <h1 class="fw-bolder mt-5">
          <img class="me-1 img-fluid" :src="equalizer" alt="" />PLATFORM STATS
        </h1>
      </div>
      <div class="row justify-content-center mt-5 w-100">
        <template v-for="(item, index) in statsData" :key="index">
          <div class="col-7 col-lg-3 mt-3 mt-lg-0">
            <!-- 迭代統計數據數組，渲染 StatsCard 組件 -->
            <StatsCard :title="item.title" :number="item.number" />
          </div>
          <hr
            class="vertical-divider d-none d-lg-block"
            v-if="index < statsData.length - 1"
          />
        </template>
      </div>
    </div>

    <!-- Partnerships -->
    <div class="partnerships mx-auto">
      <div class="partnerships-intro text-center text-lg-start">
        <h1 class="fw-bolder my-5">OUR FRIENDS</h1>
      </div>
      <div class="row text-center align-items-center">
        <div
          class="col-6 col-lg-3 mt-3"
          v-for="(logo, index) in logos"
          :key="index"
        >
          <a href="#">
            <img
              class="partner-logo hover-logo"
              :src="hoverIndex === index ? logo.colorSrc : logo.whiteSrc"
              alt="logo.alt"
              @mouseover="hoverIndex = index"
              @mouseout="hoverIndex = null"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

import { onMounted, ref } from "vue";
import Swiper from "@/components/Swiper.vue"; // 引入輪播組件
import StatsCard from "./StatsCard.vue"; // 引入 StatsCard 組件

import banner01 from "@/assets/images/common/banner01.png";
import banner02 from "@/assets/images/common/banner02.png";
import bannerSM01 from "@/assets/images/common/banner-sm01.png";
import bannerSM02 from "@/assets/images/common/banner-sm02.png";

import diamondSM from "@/assets/images/common/diamond-sm.png";

import XRP from "@/assets/images/common/card-xrp.png";
import ETH from "@/assets/images/common/card-eth.png";
import BNB from "@/assets/images/common/card-bnb.png";
import TRX from "@/assets/images/common/card-trx.png";
import SOL from "@/assets/images/common/card-sol.png";
import DOGE from "@/assets/images/common/card-doge.png";
import BTC from "@/assets/images/common/card-btc.png";

import binanceWhite from "@/assets/images/common/binance-white.png";
import tronWhite from "@/assets/images/common/tron-white.png";
import chainLink from "@/assets/images/common/chainlink-logo-white.png";
import monoWhite from "@/assets/images/common/mono-white.png";

import binanceColor from "@/assets/images/common/binance-color.png";
import tronColor from "@/assets/images/common/tron-color.png";
import chainLinkColor from "@/assets/images/common/chainlink-logo-color.png";
import monoColor from "@/assets/images/common/mono-color.png";

import equalizer from "@/assets/images/icon/md-equalizer 1.svg";
import modules from "@/services/modules";

const {
  home: { home },
} = modules;

const userStore = useUserStore();
console.log(userStore.userInfo?.name, "NAME");

const hoverIndex = ref(null);
const homePageData = ref([]);
const banner = ref([]);
const gameRoomList = ref([]);
const statsData = ref([]);
// 輪播圖片數據

// 配置 coverflow 效果
const coverflowEffect = {
  depth: 250,
  rotate: 0,
  stretch: 80,
  slideShadows: false,
};

// 配置響應式斷點
const breakpoints = {
  320: { slidesPerView: 3, spaceBetween: 2 },
  640: { slidesPerView: 3, spaceBetween: 10 },
  991: { slidesPerView: 5, spaceBetween: 20 },
  1199: { slidesPerView: 5, spaceBetween: 30 },
};

const logos = [
  {
    whiteSrc: binanceWhite,
    colorSrc: binanceColor,
    alt: "binanceWhite",
  },
  {
    whiteSrc: tronWhite,
    colorSrc: tronColor,
    alt: "tronWhite",
  },
  {
    whiteSrc: chainLink,
    colorSrc: chainLinkColor,
    alt: "chainLink",
  },
  {
    whiteSrc: monoWhite,
    colorSrc: monoColor,
    alt: "monoWhite",
  },
];

const getHomeData = async () => {
  try {
    // 進行 API 請求，並取得回傳資料
    const { data } = await home();
    // 解構賦值來取得需要的資料
    const { banner: bannerData, gameRoomList: roomData, statics } = data.data;
    // 更新響應式變數
    homePageData.value = data.data;
    banner.value = handleBannerData(bannerData); // 處理 banner 資料
    gameRoomList.value = handleRoomData(roomData); // 處理遊戲房資料
    statsData.value = handleStatics(statics); // 處理統計數據
  } catch (error) {
    // 錯誤處理：可以顯示錯誤訊息給使用者，或記錄錯誤以便追蹤
    console.error("Failed to fetch home data:", error);
  }
};

const handleRoomData = (obj) => {
  const roomData = obj.map((item) => ({
    mobileImage: item.cardImgUrl,
    image: item.cardImgUrl,
    alt: "Card" + item.rewardSymbol,
    link: `/game/${item.id}`, // 生成每個遊戲房的路由連結
  }));
  return roomData;
};

const handleBannerData = (obj) => {
  const bannerData = obj.map((item) => ({
    mobileImage: item.smallUrl,
    image: item.url,
    alt: "Banner",
    link: "/game/game-list",
  }));
  return bannerData;
};

const handleStatics = (obj) => {
  return [
    { title: "Total Players", number: obj.totalPlayers },
    { title: "Total Game Volume", number: formatCurrency(obj.totalGameVolume) },
    { title: "Total Game Rounds", number: obj.totalGameRounds },
  ];
};

const formatCurrency = (number) => {
  return `$${number.toLocaleString("en-US")}`;
};

onMounted(async () => {
  await getHomeData();
});
</script>

<style scoped>
.swiper-banner {
  max-width: 1280px;
}

.swiper-card-slide img {
  border-radius: 10px;
}

/* card */
.game-intro {
  width: 70%;
  max-width: 1800px;
}

.card-intro p {
  font-size: 3rem;
  letter-spacing: 2px;
  word-spacing: 1px;
}

.game-card .more-btn {
  background-color: #fcd535;
  color: #181a20;
  border-radius: 50px;
  font-weight: 700;
  border: none;
}

.game-card .more-btn:hover {
  background-color: #e5bf30;
}

/* stats */
.stats {
  width: 100%;
  max-width: 1800px;
}

.stats .row {
  --bs-gutter-x: none;
}

@media (min-width: 575.98px) {
  .stats {
    width: 70%;
  }
}

/* state hr */
.vertical-divider {
  width: 30px;
  border-color: #fcd535;
  height: 1px;
  transform: rotate(90deg);
  margin: 0 0.25rem;
  align-self: center;
  border-width: 3px;
  opacity: 1;
}
@media (min-width: 991.98px) {
  .vertical-divider {
    width: 60px;
  }
}
@media (min-width: 1399.98px) {
  .vertical-divider {
    margin: 0 1rem;
  }
}

.stats-intro img {
  width: 24px;
}

@media (min-width: 576.98px) {
  .stats-intro img {
    width: 30px;
  }
}

@media (min-width: 1199.98px) {
  .stats-intro img {
    width: 36px;
  }
}

.partnerships {
  width: 70%;
  margin-top: 80px;
}
@media (min-width: 991.98px) {
  .partnerships {
    margin-top: 120px;
  }
}

.partner-logo {
  max-width: 100%;
  transition: opacity 0.3s ease;
  position: relative;
}

.partner-logo img {
  display: block;
  width: 100%;
  height: auto;
}

.partner-logo:hover img {
  opacity: 0;
}
</style>
