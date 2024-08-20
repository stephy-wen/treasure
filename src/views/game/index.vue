<template>
  <div class="container mt-5">
    <div class="game-title mb-5">
      <p class="fw-bold fs-1">HUNTING GAME</p>
    </div>
    <div class="search-bar mb-5" style="width: 18rem">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search"
          aria-label="game name"
          aria-describedby="button-addon2"
        />
        <button
          class="btn btn-outline-secondary search-game-btn"
          type="button"
          id="button-addon2"
        >
        <font-awesome-icon
          icon="fa-solid fa-magnifying-glass"
        />
        </button>
      </div>
    </div>
    <div class="game-container">
      <div class="row game-list gy-4">
        <GameCard
          v-for="(game, index) in games"
          :key="index"
          :imageSrc="game.imageSrc"
          :gid="game.gid"
          :gameName="game.gameName"
          :gameType="game.gameType"
          :phoneIconSrc="game.phoneIconSrc"
          :feeIconSrc="game.feeIconSrc"
          :fee="game.fee"
          :peopleIconSrc="game.peopleIconSrc"
          :participants="game.participants"
          :totalParticipants="game.totalParticipants"
          :gameId="game.gameId"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import GameCard from "./GameCard.vue"; // 引入 GameCard 组件
import { images } from "@/assets/images.js";

// 資料要改從第三張開始要置換成正確資料
const games = [
  {
    gameId: "eth123", // 作为唯一标识
    imageSrc: images.ethCard,
    gid: "GID 1225",
    gameName: "ETH",
    gameType: "ETHEREUM",
    phoneIconSrc: images.dollarPhoneIcon /*固定 */,
    feeIconSrc: images.ethAccountIcon,
    fee: 1,
    peopleIconSrc: images.peopleIcon /*固定 */,
    participants: 312,
    totalParticipants: 568,
  },
  {
    gameId: "bnb456",
    imageSrc: images.bnbCard,
    gid: "GID 1300",
    gameName: "BNB",
    gameType: "BNB",
    phoneIconSrc: images.dollarPhoneIcon,
    feeIconSrc: images.bnbAccountIcon,
    fee: 1,
    peopleIconSrc: images.peopleIcon,
    participants: 150,
    totalParticipants: 300,
  },
  {
    gameId: "eth123", // 作为唯一标识
    imageSrc: images.ethCard,
    gid: "GID 1225",
    gameName: "ETH",
    gameType: "ETHEREUM",
    phoneIconSrc: images.dollarPhoneIcon /*固定 */,
    feeIconSrc: images.ethAccountIcon,
    fee: 1,
    peopleIconSrc: images.peopleIcon /*固定 */,
    participants: 312,
    totalParticipants: 568,
  },
  {
    gameId: "bnb456",
    imageSrc: images.bnbCard,
    gid: "GID 1300",
    gameName: "BNB",
    gameType: "BNB",
    phoneIconSrc: images.dollarPhoneIcon,
    feeIconSrc: images.bnbAccountIcon,
    fee: 1,
    peopleIconSrc: images.peopleIcon,
    participants: 150,
    totalParticipants: 300,
  },
  {
    gameId: "bnb456",
    imageSrc: images.bnbCard,
    gid: "GID 1300",
    gameName: "BNB",
    gameType: "BNB",
    phoneIconSrc: images.dollarPhoneIcon,
    feeIconSrc: images.bnbAccountIcon,
    fee: 1,
    peopleIconSrc: images.peopleIcon,
    participants: 150,
    totalParticipants: 300,
  },
  {
    gameId: "bnb456",
    imageSrc: images.bnbCard,
    gid: "GID 1300",
    gameName: "BNB",
    gameType: "BNB",
    phoneIconSrc: images.dollarPhoneIcon,
    feeIconSrc: images.bnbAccountIcon,
    fee: 1,
    peopleIconSrc: images.peopleIcon,
    participants: 150,
    totalParticipants: 300,
  },
  {
    gameId: "eth123", // 作为唯一标识
    imageSrc: images.ethCard,
    gid: "GID 1225",
    gameName: "ETH",
    gameType: "ETHEREUM",
    phoneIconSrc: images.dollarPhoneIcon /*固定 */,
    feeIconSrc: images.ethAccountIcon,
    fee: 1,
    peopleIconSrc: images.peopleIcon /*固定 */,
    participants: 312,
    totalParticipants: 568,
  },
  {
    gameId: "bnb456",
    imageSrc: images.bnbCard,
    gid: "GID 1300",
    gameName: "BNB",
    gameType: "BNB",
    phoneIconSrc: images.dollarPhoneIcon,
    feeIconSrc: images.bnbAccountIcon,
    fee: 1,
    peopleIconSrc: images.peopleIcon,
    participants: 150,
    totalParticipants: 300,
  },
];
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.container .search-bar .form-control {
    background-color: transparent;
    color: #F8F8F8;
    border-color: #BBB;
    border-radius: 0px;
    box-shadow: none;
}

.container .search-bar button{
    border-color: #BBB;
}

.container .search-bar button{
    color: #BBB;
}

.container .search-bar button:hover{
    color: #F8F8F8;
}

.container .search-bar .form-control::placeholder {
    color: #BBB;
}
</style>
