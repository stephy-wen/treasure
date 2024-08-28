<template>
  <!-- winner Modal -->
  <div
    v-if="isOpen"
    class="modal fade show"
    id="winnerModal"
    tabindex="-1"
    aria-labelledby="winnerModalLabel"
    aria-modal="true"
    role="dialog"
    style="display: block"
  >
    <div
      class="modal-dialog mx-auto modal-dialog-centered modal-fullscreen-sm-down"
    >
      <div
        class="modal-content modal-background"
        style="background-image: url('/assets/images/common/attend_eth.png')"
      >
        <div class="modal-header pb-0 d-flex justify-content-between">
          <h5 class="modal-title" id="winnerModalLabel"></h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            @click="closeModal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div
          class="modal-body text-center d-flex flex-column justify-content-center"
        >
          <div class="game-winner-title">
            <p class="fs-2 fw-bold">WINNER</p>
          </div>
          <div class="winner-info mt-5">
            <img src="@/assets/images/icon/NFT/09.png" alt="" />
            <p class="fs-5 fw-bold mt-2">hehe15235</p>
          </div>
        </div>
        <div class="modal-footer mx-auto">
          <p class="winnie-color-gray">Next Round 5 seconds</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped></style>
