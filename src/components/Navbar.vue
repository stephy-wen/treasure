<!-- src/components/Navbar.vue -->
<template>
    <header>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <div class="logo ps-3 ps-md-4 ps-lg-5 pe-lg-5">
            <a href="index" class="text-white">
              <img  style="height: 25px;" :src="logo" alt="Logo">
              <img  style="height: 25px;" src="../assets/images/icon/logo.svg" alt="Logo">
              <!-- <img src="@/images/icon/logo name.svg" alt="" /> -->
            </a>
          </div>
          <button class="custom-navbar-toggler d-lg-none" type="button" data-bs-toggle="modal" data-bs-target="#navbarModal">
            <span class="custom-navbar-toggler-icon"></span>
            <span class="custom-navbar-toggler-icon"></span>
            <span class="custom-navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
  
    </header>
  </template>
  
  <script setup>
    import logo from '@/assets/images/icon/logo.svg'; // 引入圖片
  import { ref } from 'vue';

  const showModal = ref(false);
  
  function toggleModal() {
    showModal.value = !showModal.value;
  }
  </script>
  
  <style scoped>
  /* 這裡放置你的 CSS 或 SCSS */
  </style>
  