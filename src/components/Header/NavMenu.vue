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
          <font-awesome-icon 
          icon="fa-solid fa-angle-down" 
          class="ms-2 dropdown-icon"
        />
        </router-link>
        <!-- Dropdown menu -->
        <ul class="dropdown-menu px-4 py-3 custom-dropdown-menu" :aria-labelledby="item.id">
          <p class="dropdown-title">{{ item.dropdownTitle }}</p>
          <div v-for="section in item.dropdownSections" :key="section.title">
            <div class="dropdown-subtitle">
              <div :class="section.circleClass"></div>
              <span class="dropdown-title">{{ section.title }}</span>
            </div>
            <li
              v-for="game in section.games"
              :key="game.roomNumber"
              class="mx-0"
            >
              <router-link
                class="dropdown-item winnie-dropdown-item my-2 text-center"
                :to="game.url"
              >
                <!-- <span class="me-5 room-number">{{ game.roomNumber }}</span> -->
                <span class="game-type-name">{{ game.gameRoom }}</span>
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
.winnie-nav-link {
  color: #f8f8f8;
  display: flex;
  align-items: center;
  height: 100%;
}

.dropdown-menu {
  background-color: #1e2329;
}

.dropdown-title {
  font-size: 1rem;
  color: #f8f8f8;
  font-weight: 600;
}

.red-circle {
  width: 10px;
  height: 10px;
  background-color: #f63e3d;
  border: 1px solid #35485d;
  border-radius: 50%;
  display: inline-block;
  margin-right: 3px;
}

.green-circle {
  width: 10px;
  height: 10px;
  background-color: #71f63d;
  border: 1px solid #35485d;
  border-radius: 50%;
  display: inline-block;
  margin-right: 3px;
}

.winnie-dropdown-item {
  color: #f8f8f8;
  font-size: 1rem;
  font-weight: 600;
  background-color: #2b3139;
  border-radius: 6px;
}

.winnie-dropdown-item:hover {
  background-color: #414d5a;
}
.winnie-dropdown-item:hover .game-type-name {
  color: #f8f8f8 !important;
}
.winnie-dropdown-item:hover .room-number {
  color: #bbb !important;
}

ul li a {
  color: #f8f8f8;
  text-decoration: none;
  padding: 10px 5px;
  font-weight: 600;
}
@media (min-width: 1199.98px) {
  nav ul li a {
    padding: 8px 32px;
  }
}

nav ul li a:hover {
  color: #fcd535;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-icon {
  transition: transform 0.2s ease;
}

.dropdown-toggle[aria-expanded="true"] .dropdown-icon {
  transform: rotate(180deg);
}

.custom-dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
}

.custom-dropdown-menu::-webkit-scrollbar {
  width: 5px;
  background-color: #1e2329;
}

.custom-dropdown-menu::-webkit-scrollbar-thumb {
  background-color: #2B3139;
  border-radius: 4px;
}

.custom-dropdown-menu::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 滚动条悬停时的颜色 */
}
</style>
