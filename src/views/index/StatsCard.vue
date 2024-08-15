<template>
  <div class="col-7 col-lg-3 mt-3 mt-lg-0">
    <div class="stats-content mx-auto text-center" style="width: fit-content">
      <p class="fw-bold stats-title">{{ title }}</p>
      <p class="fw-bolder mt-2 stats-number">{{ number }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
/* Add any specific styles for StatsCard here */
</style>
