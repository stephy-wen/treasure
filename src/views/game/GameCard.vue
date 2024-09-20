<template>
  <div class="col-6 col-sm-4 col-lg-3 winnie-xs-style px-1 px-md-2">
    <router-link :to="{ name: 'GameDetail', params: { gameId: gameId } }">
      <div class="card winnie-p-xs-2 p-3">
        <div class="game-card-img position-relative">
          <img
            :src="imageSrc"
            class="card-img-top img-fluid mx-auto"
            style="max-width: 250px"
            alt="..."
          />
        </div>
        <div class="card-body pt-2 px-0">
          <div class="d-flex justify-content-between align-items-center">
            <div class="room-title">
              <span class="card-title game-list-name fs-6">{{ gameName }}</span>
              <span
                class="d-none d-xxl-inline card-title game-list-type ms-1"
                style="font-size: 14px"
                >{{ gameType }}</span
              >
            </div>
            <img
              class="img-fluid mt-1"
              style="max-height: 38px; margin-right: -4px"
              :src="phoneIconSrc"
              alt=""
            />
          </div>
          <div class="text-start">
            <p class="game-list-type mt-1 mb-2">THE POT</p>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <img
                class="me-1 img-fluid"
                style="width: 28px"
                :src="feeIconSrc"
                alt=""
              />
              <span class="game-list-fee fs-6">{{ fee }}</span>
            </div>
            <div class="d-flex align-items-center">
              <img
                class="me-1 mb-1"
                style="max-width: 22px"
                :src="peopleIconSrc"
                alt=""
              />
              <span class="card-text game-list-people"
                >{{ participants }} / {{ totalParticipants }}</span
              >
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  gameId: String, // 接收 gameId
  link: String,
  imageSrc: String,
  gameName: String,
  gameType: String, //先叫這個名字到時候再改gameDetailName
  phoneIconSrc: String,
  feeIconSrc: String,
  fee: Number,
  peopleIconSrc: String,
  participants: Number,
  totalParticipants: Number,
});
</script>

<style scoped>
.game-container .card {
  background-color: #2b3139;
  width: 100%;
  font-size: 0.85rem;
}

.container .game-container .card .game-list-name,
.container .game-container .card .game-list-fee {
  color: #f8f8f8;
}

.container .game-container .card .game-list-round,
.container .game-container .card .game-list-type,
.container .game-container .card .game-list-people {
  color: #bbb;
}

.container .game-container .card img {
  border-radius: 0px;
}

.container .game-container .card-body {
  padding-bottom: 0px;
}

.card:hover .card-img-top {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

.card-img-top {
  transition: transform 0.3s ease;
}

.game-card-img {
  overflow: hidden;
}

@media (max-width: 420px) {
  .winnie-xs-style {
    padding: 0.25rem;
  }

  .winnie-xs-style .game-list-name,
  .winnie-xs-style .game-list-round,
  .winnie-xs-style .game-list-fee,
  .winnie-xs-style .game-list-people,
  .winnie-xs-style .fa-user {
    font-size: 13px;
  }

  .winnie-p-xs-2 {
    padding: 0.5rem !important;
  }
}

@media (max-width: 767.98px) {
  .winnie-xs-style {
    padding: 0.25rem;
  }

  .winnie-xs-style .game-list-name,
  .winnie-xs-style .game-list-round,
  .winnie-xs-style .game-list-fee,
  .winnie-xs-style .game-list-people,
  .winnie-xs-style .fa-user {
    font-size: 13px;
  }

  .winnie-p-xs-2 {
    padding: 0.5rem !important;
  }
}
</style>
