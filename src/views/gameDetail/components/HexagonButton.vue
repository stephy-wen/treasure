<template>
  <div
    class="hexagon hexagon-more"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
    @click="handleClick"
  >
    <div v-if="isClickable" class="overlay">
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";

const props = defineProps({
  backgroundImage: String,
  isClickable: Boolean, // 用于控制按钮是否可以点击
});

const emit = defineEmits(["openModal"]);

const handleClick = () => {
  if (props.isClickable) {
    emit("openModal");
  }
};
</script>

<style scoped>
.hexagon {
  width: 20%;
  padding-top: 13.64%;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
}

.hexagon-more {
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(65, 77, 90, 0.9);
  clip-path: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.dots {
  display: flex;
  flex-direction: row;
  gap: 4px;
}

.dot {
  width: 6px;
  height: 6px;
  background-color: #f8f8f8;
  border-radius: 50%;
}

@media (min-width: 575.98px) and (max-width: 767.98px) {
  .dot {
  width: 4px;
  height: 4px;
}
}
</style>
