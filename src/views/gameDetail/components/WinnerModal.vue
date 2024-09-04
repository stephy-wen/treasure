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
        :style="{ backgroundImage: `url(${gameInfo.backgroundImage})` }"
      >
        <div class="modal-header pb-0 d-flex justify-content-between">
          <h5 class="modal-title" id="winnerModalLabel"></h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            @click="closeModal"
            aria-label="Close"
          >
            <font-awesome-icon
              icon="fa-solid fa-xmark"
            />
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
          <p class="winnie-color-gray">Next Round {{ countdown }} seconds</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, watch, onMounted, defineProps, defineEmits } from "vue";

const countdown = ref(5); //初始化倒數計時5秒

onMounted(() => {
  //const modalElement = modal.value; // 獲取模態框的 DOM 元素
  //console.log(modalElement, "modalElement");
  //const isHidden = window.getComputedStyle(modalElement).display === "none";
  //console.log(isHidden); // 檢查模態框是否隱藏
});

const props = defineProps({
  isOpen: Boolean,
  gameInfo: Object,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};

watch(
	() => props.isOpen, //監聽props.isOpen的變化
	(newVal) => {
		if (newVal) {
			countdown.value = 5 //每次打開modal都會重置倒數
			const timer = setInterval(() => {
				if (countdown.value > 0) {
					countdown.value -= 1;
				} else {
					clearInterval(timer);
					closeModal();
				}
			}, 1000);
		}
	} 
)
</script>

<style scoped>

.winnie-btn-close {
    background-color: #1E2329;
    color: #F8F8F8;
    border-radius: 50px;
    border: none;
}

.winnie-btn-close:hover {
  background-color: #414D5A;
  color: #F8F8F8;
}

#winnerModal .modal-background {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

#winnerModal .modal-header {
  border-bottom: none;
}

#winnerModal .modal-footer {
  border-top: none;
}

#winnerModal .modal-dialog .modal-content {
  min-height: 500px;
}

#winnerModal .modal-footer .winnie-color-gray {
  color: #BBB;
}

.modal-content {
  background-color: transparent;
}
</style>
