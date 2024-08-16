<template>
  <div class="col-6 col-sm-4 col-lg-3 winnie-xs-style">
    <router-link :to="{ name: 'GameDetail', params: { gameId: gameId } }">
      <div class="card winnie-p-xs-2 p-3">
        <div class="game-card-img position-relative">
          <img
            :src="imageSrc"
            class="card-img-top img-fluid mx-auto"
            style="max-width: 250px"
            alt="..."
          />
          <div
            class="position-absolute top-0 start-0 d-flex align-items-center pe-1 pb-1 ps-3 pt-2"
            style="color: #f8f8f8"
          >
            <span style="font-size: 14px">{{ gid }}</span>
          </div>
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
  gid: String,
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

<style scoped></style>
