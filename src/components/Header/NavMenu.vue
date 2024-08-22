<template>
  <ul class="navbar-nav me-auto ms-2 mb-2 mb-lg-0">
    <li
      v-for="item in links"
      :key="item.id"
      class="nav-item"
      :class="{ dropdown: item.dropdown }"
    >
      <template v-if="item.dropdown">
        <router-link
          :class="`winnie-nav-link fs-6 ${
            item.dropdown ? 'dropdown-toggle' : ''
          }`"
          to="#"
          :id="item.id"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ item.label }}
        </router-link>
        <!-- Dropdown menu -->
        <ul class="dropdown-menu px-4 py-3" :aria-labelledby="item.id">
          <p class="dropdown-title">{{ item.dropdownTitle }}</p>
          <div v-for="section in item.dropdownSections" :key="section.title">
            <div class="dropdown-subtitle mt-3">
              <div :class="section.circleClass"></div>
              <span class="dropdown-title">{{ section.title }}</span>
            </div>
            <li
              v-for="link in section.links"
              :key="link.roomNumber"
              class="mx-0"
            >
              <router-link
                class="dropdown-item winnie-dropdown-item my-2"
                :to="link.url"
              >
                <span class="me-5 room-number">{{ link.roomNumber }}</span>
                <span class="game-type-name">{{ link.gameType }}</span>
              </router-link>
            </li>
          </div>
        </ul>
      </template>
      <template v-else>
        <router-link
          class="winnie-nav-link fs-6"
          :to="{ name: item.routeName }"
        >
          {{ item.label }}
        </router-link>
      </template>
    </li>
  </ul>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  links: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
/* 可在這裡放置 NavMenu 的樣式 */
</style>
