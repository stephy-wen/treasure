<template>
  <div v-if="showModal" class="modal fade show" style="display: block">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
      <div class="modal-content">
        <div class="modal-header pb-0 d-flex justify-content-between">
          <h5 class="modal-title">Player List</h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            @click="$emit('close')"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <h4 class="ms-2 mb-5 fw-bold">Player List</h4>
          <table class="table table-borderless fw-bold">
            <thead>
              <tr>
                <th scope="col">Player</th>
                <th class="text-end" scope="col">Vote</th>
                <th class="text-end" scope="col">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="player in players" :key="player.name">
                <td class="player-list-name d-flex align-items-center">
                  <img
                    class="img-fluid me-1"
                    style="max-width: 24px"
                    :src="player.image"
                    alt=""
                  />
                  {{ player.name }}
                </td>
                <td class="text-end">
                  <span
                    >{{ player.vote }}
                    <img
                      class="img-fluid"
                      style="max-width: 24px"
                      src="../images/icon/balance-icon.png"
                      alt=""
                  /></span>
                </td>
                <td class="text-end">{{ player.rate }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  showModal: Boolean,
  players: Array,
});
</script>
