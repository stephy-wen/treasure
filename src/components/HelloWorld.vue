<script setup>
  import { ref } from 'vue';
  
  const navItems = ref([
    {
      id: 'navbarDropdown',
      label: 'Treasure Spot',
      dropdown: true,
      dropdownTitle: 'Treasure Spot',
      dropdownSections: [
        {
          circleClass: 'red-circle',
          title: 'Drawn',
          links: [
            { url: 'game/play-bnb.html', roomNumber: 'GID 1225', gameType: 'BINANCE' },
            { url: 'game/play-trx.html', roomNumber: 'GID 1136', gameType: 'TRON' }
          ]
        },
        {
          circleClass: 'green-circle',
          title: 'In Progress',
          links: [
            { url: 'game/play-bnb.html', roomNumber: 'GID 1225', gameType: 'BINANCE' },
            { url: 'game/play-trx.html', roomNumber: 'GID 1136', gameType: 'TRON' }
          ]
        }
      ]
    },
    { id: '', label: 'Leaderboard', dropdown: false, url: 'leaderboard' },
    { id: '', label: 'Learn', dropdown: false, url: 'about' },
  ]);
  </script>

<!-- NavBar.vue -->
<template>
  <div class="collapse navbar-collapse">
    <ul class="navbar-nav me-auto ms-2 mb-2 mb-lg-0">
      <li class="nav-item" v-for="item in navItems" :key="item.id">
        <!-- Check if the item is a dropdown -->
        <a
          v-if="item.dropdown"
          class="winnie-nav-link fs-6 dropdown-toggle"
          href="#"
          :id="item.id"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ item.label }}
        </a>
        <ul v-if="item.dropdown" class="dropdown-menu px-4 py-3" :aria-labelledby="item.id">
          <p class="dropdown-title">{{ item.dropdownTitle }}</p>
          <div
            v-for="(section, index) in item.dropdownSections"
            :key="index"
            class="dropdown-subtitle mt-3"
          >
            <div :class="section.circleClass"></div>
            <span class="dropdown-title">{{ section.title }}</span>
            <li v-for="(link, idx) in section.links" :key="idx" class="mx-0">
              <a :href="link.url" class="dropdown-item winnie-dropdown-item my-2">
                <span class="me-5 room-number">{{ link.roomNumber }}</span>
                <span class="game-type-name">{{ link.gameType }}</span>
              </a>
            </li>
          </div>
        </ul>
        <!-- For other nav items -->
        <a
          v-else
          class="winnie-nav-link fs-6"
          :href="item.url"
        >
          {{ item.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
