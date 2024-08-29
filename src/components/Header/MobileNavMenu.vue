<template>
  <div class="accordion-item">
    <div class="accordion-header" :id="headerId">
      <!-- 判斷是否為 dropdown -->
      <template v-if="item.dropdown">
        <button
          class="accordion-button collapsed fs-5 fw-bold"
          type="button"
          :data-bs-toggle="'collapse'"
          :data-bs-target="'#' + collapseId"
          aria-expanded="false"
          :aria-controls="collapseId"
        >
          <font-awesome-icon :icon="item.icon" class="me-3" />{{ item.label }}
        </button>
      </template>

      <template v-else>
        <a class="accordion-button fs-5 fw-bold" :href="item.url">
          <font-awesome-icon :icon="item.icon" class="me-3" />{{ item.label }}
        </a>
      </template>
    </div>

    <!-- 動態生成 accordion body，僅當 item.dropdown 為 true 時顯示 -->
    <div
      v-if="item.dropdown"
      :id="collapseId"
      class="accordion-collapse collapse"
      :aria-labelledby="headerId"
      data-bs-parent="#accordionNav"
    >
      <div class="accordion-body pt-0">
        <ul class="px-4 py-0">
          <div v-for="section in item.dropdownSections" :key="section.title">
            <div class="dropdown-subtitle text-start mt-1">
              <div :class="section.circleClass"></div>
              <span class="dropdown-title fs-5 fw-regular ms-1">
                {{ section.title }}
              </span>
            </div>
            <li v-for="game in section.games" :key="game.gid" class="mx-0">
              <a
                class="dropdown-item winnie-dropdown-item my-2 px-2 py-1"
                :href="game.link"
              >
                <span class="me-5 room-number fs-5 fw-regular">{{
                  game.gid
                }}</span>
                <span class="game-type-name fs-5 fw-regular">{{
                  game.type
                }}</span>
              </a>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";

// 定義 props
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

// 計算 headerId 和 collapseId
const headerId = computed(() => `heading${props.index}`);
const collapseId = computed(() => `collapse${props.index}`);
</script>

<style scoped>
/* 可在這裡加入組件特有的樣式 */
.dropdown-title{
  font-size: 1rem;
  color: #F8F8F8;
  font-weight: 600;
}

.winnie-modal .accordion-button {
  background-color: transparent;
  color: #f8f8f8;
}

.accordion-button:not([data-bs-toggle])::after {
  display: none;
}

.accordion-button.collapsed::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

.accordion-button:not(.collapsed)::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e");
}

/* Treasure Spot 展開樣式 */
.winnie-dropdown-item {
  color: #f8f8f8;
  font-size: 1rem;
  font-weight: 600;
  background-color: #2b3139;
  border-radius: 10px;
}

.winnie-dropdown-item:hover {
  background-color: #414d5a;
}
.winnie-dropdown-item:hover .game-type-name {
  color: #f8f8f8;
}
.winnie-dropdown-item:hover .room-number {
  color: #bbb;
}

.red-circle{
  width: 10px;
  height: 10px;
  background-color: #F63E3D;
  border: 1px solid #35485D;
  border-radius: 50%;
  display: inline-block
}

.green-circle{
  width: 10px;
  height: 10px;
  background-color: #71F63D;
  border: 1px solid #35485D;
  border-radius: 50%;
  display: inline-block
}
</style>
