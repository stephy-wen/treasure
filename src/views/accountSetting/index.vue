<template>
  <div>
    <header
      class="position-relative"
      style="max-width: 575.98px; border-bottom: 1px solid #2b3139"
    >
      <div class="d-flex align-items-center justify-content-center py-3">
        <a href="dashboard"
          ><img
            src="@/assets/images/icon/ze-arrow-left 1.svg"
            alt=""
            class="position-absolute start-0 ms-3"
        /></a>
        <p class="mb-0 fs-5 fw-bold">Setting</p>
      </div>
    </header>

    <div class="winnie-account d-sm-none" style="max-width: 575.98px">
      <div class="personal-info text-center">
        <div class="avatar-photo">
          <img
            class="my-3"
            style="width: 60px"
            src="@/assets/images/icon/NFT/09.png"
            alt=""
          />
          <p class="fs-4 fw-bold">winnie32145985</p>
          <p class="fs-6 fw-bold winnie-color-gray">
            UID 32123
            <img
              class="ms-2"
              src="@/assets/images/icon/md-content_copy 1.svg"
              alt=""
            />
          </p>
        </div>
      </div>
      <div class="winnie-profile container mt-5">
        <p class="winnie-color-gray mb-4">Profile</p>
        <div class="d-flex justify-content-between email-account mb-4">
          <p>Email</p>
          <p>win***456@gmail.com</p>
        </div>
        <!-- 引入 AvatarChange 組件 -->
        <AvatarChange />

        <div class="d-flex justify-content-between login-pw-change mb-4">
          <p>Login Password</p>
          <a href="account/manage-password.html">
            <img src="@/assets/images/icon/ze-arrow 1 Copy 2.svg" alt="" />
          </a>
        </div>
        <div class="d-flex justify-content-between nickname-change mb-4">
          <p>Nickname</p>
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#changeNicknameModal"
          >
            <div>
              <span class="winnie-color-gray">winnie123456789</span>
              <img src="@/assets/images/icon/ze-arrow 1 Copy 2.svg" alt="" />
            </div>
          </a>
          <!-- Change Nickname start -->
          <div
            class="modal fade"
            id="changeNicknameModal"
            tabindex="-1"
            aria-labelledby="changeNicknameModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-fullscreen winnie-dialog-right">
              <div class="modal-content">
                <div
                  class="modal-header d-flex align-items-center justify-content-center py-3"
                >
                  <h5
                    class="modal-title fs-5 fw-bold"
                    id="changeNicknameModalLabel"
                  >
                    Nickname
                  </h5>
                  <a
                    href="#"
                    class="position-absolute start-0 ms-3"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    ><img src="@/assets/images/icon/ze-arrow-left 1.svg" alt=""
                  /></a>
                </div>

                <div class="modal-body px-4">
                  <div class="nickname-change my-3">
                    <label
                      style="font-size: 14px"
                      for="inputNickname"
                      class="form-label"
                      >Your nickname is used for trading messages</label
                    >
                    <input
                      type="text"
                      id="inputNickname"
                      class="form-control"
                      value="winnie123456789"
                      placeholder="Enter your new nickname"
                      aria-describedby="nicknameHelpBlock"
                    />
                    <div id="nicknameHelpBlock" class="form-text">15/20</div>
                  </div>
                  <div class="mt-4">
                    <p class="mb-2 winnie-color-gray" style="font-size: 14px">
                      * Your nickname can be edited 3 more time(s) this year
                    </p>
                    <p class="winnie-color-gray" style="font-size: 14px">
                      * Make sure your nickname does not contain disrespectful
                      language, our official names (i.e. product names), or
                      names of other trading platforms
                    </p>
                    <div class="text-center mt-5">
                      <button
                        class="mt-5 save-btn btn btn-primary"
                        type="button"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
                <div class="modal-footer"></div>
              </div>
            </div>
          </div>
          <!-- Change Nickname start -->
        </div>
        <div class="d-flex justify-content-start log-out-link mb-4">
          <a href="account/login">Log out</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AvatarChange from "./components/AvatarChange.vue";
</script>

<style scoped></style>
