<template>
  <div
    class="hexagon"
    :style="{ backgroundImage: `url(${backgroundImage})` }"
    @click="handleClick"
  >
    <div class="overlay">
      <div class="dots">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  backgroundImage: String,
});

const emit = defineEmits(["openModal"]);

const handleClick = () => {
  emit("openModal");
};
</script>
