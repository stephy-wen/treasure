<template>
  <div
    v-if="isOpen"
    ref="modal"
    class="modal fade show"
    id="playerListModal"
    tabindex="-1"
    aria-labelledby="playerListModalLabel"
    aria-modal="true"
    role="dialog"
    style="display: block"
  >
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
      <div class="modal-content">
        <div class="modal-header pb-0 d-flex justify-content-between">
          <h5 class="modal-title" id="playerListModalLabel"></h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            @click="closeModal"
            aria-label="Close"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div class="modal-body">
          <h4 class="modal-title ms-2 mb-5 fw-bold" id="playerListModalLabel">
            Player List
          </h4>
          <table class="table table-borderless fw-bold">
            <thead>
              <tr>
                <th scope="col">Player</th>
                <th class="text-end pe-3 pe-sm-0" scope="col">Vote</th>
                <th class="text-end" scope="col">Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="player in players" :key="player.id">
                <td class="player-list-name">
                  <img
                    :class="getImageClass"
                    :src="player.image"
                    :style="{ 'max-width': getMaxWidth }"
                    alt=""
                  />
                  {{ player.name }}
                </td>
                <td class="text-end pe-3 pe-sm-0">
                  <span
                    >{{ player.votes }}
                    <img
                      class="img-fluid"
                      :style="{ 'max-width': getMaxWidth }"
                      src="../images/icon/balance-icon.png"
                      alt=""
                    />
                  </span>
                </td>
                <td class="text-end">{{ player.rate }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits } from "vue";

const modal = ref(null); // 用於存儲模態框的 DOM 元素

onMounted(() => {
  //const modalElement = modal.value; // 獲取模態框的 DOM 元素
  //console.log(modalElement, "modalElement");
  //const isHidden = window.getComputedStyle(modalElement).display === "none";
  //console.log(isHidden); // 檢查模態框是否隱藏
});

const props = defineProps({
  isOpen: Boolean,
  players: Array,
});

console.log("isOpen prop in PlayerListModal:", props.isOpen);

const emit = defineEmits(["closeModal"]);

// 計算屬性 getImageClass
const getImageClass = computed(() => {
  return "img-fluid"; // 根據需求可動態返回不同的 class
});

const closeModal = () => {
  emit("closeModal");
};
// 計算不同裝置下的圖片大小
const getMaxWidth = computed(() => (window.innerWidth < 768 ? "24px" : "32px"));
</script>
