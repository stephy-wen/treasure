<!-- src/components/Navbar.vue -->
<template>
    <header>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <div class="logo ps-3 ps-md-4 ps-lg-5 pe-lg-5">
            <a href="index" class="text-white">
              <img style="height: 25px;" src="images/icon/logo name.svg" alt="" />
            </a>
          </div>
          <button class="custom-navbar-toggler d-lg-none" type="button" data-bs-toggle="modal" data-bs-target="#navbarModal">
            <span class="custom-navbar-toggler-icon"></span>
            <span class="custom-navbar-toggler-icon"></span>
            <span class="custom-navbar-toggler-icon"></span>
          </button>
  
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav me-auto ms-2 mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link class="winnie-nav-link fs-6" to="/game/game-list">Hunting Game</router-link>
              </li>
              <!-- 登入後出現 start -->
              <li class="nav-item dropdown">
                <a class="winnie-nav-link fs-6 dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Treasure Spot
                </a>
                <ul class="dropdown-menu px-4 py-3" aria-labelledby="navbarDropdown">
                  <p class="dropdown-title">Treasure Spot</p>
                  <div class="dropdown-subtitle mt-3">
                    <div class="red-circle"></div>
                    <span class="dropdown-title">Drawn</span>
                  </div>
                  <li class="mx-0">
                    <a class="dropdown-item winnie-dropdown-item my-2" href="game/play-bnb.html">
                      <span class="me-5 room-number">GID 1225</span>
                      <span class="game-type-name">BINANCE</span>
                    </a>
                  </li>
                  <li class="mx-0">
                    <a class="dropdown-item winnie-dropdown-item my-2" href="game/play-trx.html">
                      <span class="me-5 room-number">GID 1136</span>
                      <span class="game-type-name">TRON</span>
                    </a>
                  </li>
  
                  <div class="dropdown-subtitle mt-3">
                    <div class="green-circle"></div>
                    <span class="dropdown-title">In Progress</span>
                  </div>
                  <li class="mx-0">
                    <a class="dropdown-item winnie-dropdown-item my-2" href="game/play-bnb.html">
                      <span class="me-5 room-number">GID 1225</span>
                      <span class="game-type-name">BINANCE</span>
                    </a>
                  </li>
                  <li class="mx-0">
                    <a class="dropdown-item winnie-dropdown-item my-2" href="game/play-trx.html">
                      <span class="me-5 room-number">GID 1136</span>
                      <span class="game-type-name">TRON</span>
                    </a>
                  </li>
                </ul>
              </li>
              <!-- 登入後出現 end -->
              <li class="nav-item">
                <router-link class="winnie-nav-link fs-6" to="/leaderboard">Leaderboard</router-link>
              </li>
              <li class="nav-item">
                <router-link class="winnie-nav-link fs-6" to="/about">Learn</router-link>
              </li>
            </ul>
            <div class="d-flex align-items-center">
              <!-- 未登入 start -->
              <!-- <button class="btn btn-outline-primary me-1 me-xl-2 fs-6" type="button" @click="window.location.href='account/login'">Log In</button>
              <button class="btn btn-primary me-lg-2 me-xl-5 ms-lg-2 fs-6" type="button" @click="window.location.href='account/register'">Sign Up</button> -->
              <!-- 未登入 end -->
              <!-- 登入後出現 start -->
              <div class="dropdown dropdown-member-info d-inline-flex align-items-center me-3">
                <a class="d-flex align-items-center dropdown-toggle" style="color: #F8F8F8;" href="#" id="dropdownMenuMember" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="fa-solid fa-circle-user me-2"></i>
                  <p class="personal-id text-center fs-6 fw-bold mb-0">winnie33527</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-lg-start px-3 py-4 fw-bold" style="width: 250px;" aria-labelledby="dropdownMenuMember">
                  <div class="personal-info">
                    <div class="personal-photo text-center mt-1">
                      <img class="img-fluid" style="max-width: 36px;" src="images/icon/NFT/09.png" alt="">
                    </div>
                    <p class="personal-id text-center fs-6"><i class="fa-solid fa-circle-user mt-3 me-2"></i>winnie33527</p>
                  </div>
                  <div class="personal-balance-info mt-2 mt-4">
                    <div class="d-flex justify-content-center align-items-center mt-3 mx-3">
                      <p class="personal-balance fw-bold mb-0"><img class="me-2 img-fluid" style="max-width: 30px; vertical-align: middle;" src="images/icon/balance-icon.png" alt="">3,969,443<a href="#"><img class="img-fluid ms-2 mb-1" style="max-width: 16px; vertical-align: middle;" src="images/icon/antOutline-eye.svg" alt=""></a></p>
                    </div>
                    <div class="text-center mt-1">
                      <button class="btn btn-primary fs-6 mt-1 px-4" style="border-radius: 50px;" type="button" @click="window.location.href='account/deposit'">Recharge Now</button>
                    </div>
                  </div>
                  <li class="mt-4"><a class="dropdown-item winnie-member-info fs-6 fw-bold" href="dashboard"><img class="me-3 mb-1" style="max-width: 16px;" src="images/icon/md-dashboard.svg" alt="">Dashboard</a></li>
                  <li class="mt-2"><a class="dropdown-item winnie-member-info fs-6 fw-bold" href="account/login"><i class="fa-solid fa-power-off me-3"></i>Log Out</a></li>
                </ul>
              </div>
              <!-- 登入後出現 end -->
  
              <div class="d-flex">
                <div class="dropdown dropdown-language" style="display: inline-flex;">
                  <a class="d-flex align-items-center dropdown-toggle" href="#" id="dropdownMenuLanguage" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="images/icon/md-language.svg" alt="">
                  </a>
                  <ul class="dropdown-menu dropdown-menu-lg-start px-3 py-3 fw-bold" aria-labelledby="dropdownMenuLanguage">
                    <li><a class="dropdown-item winnie-language fs-6" href="#">English</a></li>
                    <li><a class="dropdown-item winnie-language fs-6" href="#">繁體中文</a></li>
                  </ul>
                </div>
                <div class="dropdown dropdown-faq" style="display: inline-flex;">
                  <a class="d-flex align-items-center dropdown-toggle mx-1 mx-xl-3" href="#" id="dropdownMenuFaq" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="images/icon/antFill-question-circle.svg" alt="">
                  </a>
                  <ul class="dropdown-menu dropdown-menu-lg-start px-2 py-3 fw-bold" aria-labelledby="dropdownMenuFaq">
                    <li class="py-1">
                      <a class="dropdown-item winnie-faq fs-6 d-flex align-items-center" href="about">
                        <img class="me-2" style="width: 24px;" src="images/icon/md-info.svg" alt="">
                        About OneChance
                      </a>
                    </li>
                    <li class="py-1">
                      <a class="dropdown-item winnie-faq fs-6 d-flex align-items-center" href="terms-of-service">
                        <img class="me-2" style="width: 24px;" src="images/icon/ze-label-o 1.svg" alt="">
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
                <a href="#" ><img src="images/icon/arcoDesign-moon.svg" alt=""></a>
              </div>
            </div>
          </div>
        </div>
      </nav>
  
      <!-- Sidebar -->
      <div class="modal fade" id="navbarModal" tabindex="-1" aria-labelledby="navbarModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="navbarModalLabel">Menu</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <ul class="navbar-nav me-auto ms-2 mb-2 mb-lg-0">
                <li class="nav-item">
                  <router-link class="winnie-nav-link fs-6" to="/game/game-list">Hunting Game</router-link>
                </li>
                <li class="nav-item dropdown">
                  <a class="winnie-nav-link fs-6 dropdown-toggle" href="#" id="navbarDropdownMobile" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Treasure Spot
                  </a>
                  <ul class="dropdown-menu px-4 py-3" aria-labelledby="navbarDropdownMobile">
                    <p class="dropdown-title">Treasure Spot</p>
                    <div class="dropdown-subtitle mt-3">
                      <div class="red-circle"></div>
                      <span class="dropdown-title">Drawn</span>
                    </div>
                    <li class="mx-0">
                      <a class="dropdown-item winnie-dropdown-item my-2" href="game/play-bnb.html">
                        <span class="me-5 room-number">GID 1225</span>
                        <span class="game-type-name">BINANCE</span>
                      </a>
                    </li>
                    <li class="mx-0">
                      <a class="dropdown-item winnie-dropdown-item my-2" href="game/play-trx.html">
                        <span class="me-5 room-number">GID 1136</span>
                        <span class="game-type-name">TRON</span>
                      </a>
                    </li>
  
                    <div class="dropdown-subtitle mt-3">
                      <div class="green-circle"></div>
                      <span class="dropdown-title">In Progress</span>
                    </div>
                    <li class="mx-0">
                      <a class="dropdown-item winnie-dropdown-item my-2" href="game/play-bnb.html">
                        <span class="me-5 room-number">GID 1225</span>
                        <span class="game-type-name">BINANCE</span>
                      </a>
                    </li>
                    <li class="mx-0">
                      <a class="dropdown-item winnie-dropdown-item my-2" href="game/play-trx.html">
                        <span class="me-5 room-number">GID 1136</span>
                        <span class="game-type-name">TRON</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item">
                  <router-link class="winnie-nav-link fs-6" to="/leaderboard">Leaderboard</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="winnie-nav-link fs-6" to="/about">Learn</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showModal = ref(false);
  
  function toggleModal() {
    showModal.value = !showModal.value;
  }
  </script>
  
  <style scoped>
  /* 這裡放置你的 CSS 或 SCSS */
  </style>
  