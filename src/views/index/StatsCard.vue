<template>
  <div class="stats-content mx-auto text-center" style="width: fit-content">
    <p class="fw-bold stats-title">{{ title }}</p>
    <p class="fw-bolder mt-2 stats-number">{{ number }}</p>
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
.stats-number{
  font-size: 2rem;
}
@media (min-width: 991.98px) {
  .stats-number {
      font-size: 2.85rem;
  }
}
@media (min-width: 1399.98px) {
  .stats-number {
      font-size: 4rem;
  }
}

.stats-title {
  font-size: 1rem;
}

@media (min-width: 1399.98px) {
  .stats-title {
      font-size: 1.25rem;
  }
}
</style>
