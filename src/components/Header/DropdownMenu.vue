<template>
  <div :class="['dropdown', dropdownClass]" style="display: inline-flex">
    <a
      class="d-flex align-items-center dropdown-toggle"
      href="#"
      :id="menuId"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <img :src="iconSrc" :alt="iconAlt" />
    </a>
    <ul
      class="dropdown-menu dropdown-menu-lg-start px-3 py-3 fw-bold"
      :aria-labelledby="menuId"
    >
      <li v-for="item in items" :key="item.label" class="py-1">
        <a
          class="dropdown-item fs-6"
          href="#"
          @click.prevent="handleClick(item)"
        >
          <img
            v-if="item.icon"
            :src="item.icon"
            :alt="item.label"
            class="me-2"
            style="width: 24px"
          />
          {{ item.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  menuId: {
    type: String,
    required: true,
  },
  iconSrc: {
    type: String,
    required: true,
  },
  iconAlt: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  dropdownClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["select"]);

const handleClick = (item) => {
  emit("select", item);
};
</script>

<style scoped>
/* 可以根據需求添加自定義樣式 */
</style>
