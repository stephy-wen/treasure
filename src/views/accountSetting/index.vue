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
            :src="userInfo?.avatarUrl"
            alt=""
          />
          <p class="fs-4 fw-bold">{{ userInfo?.name }}</p>
          <p class="fs-6 fw-bold winnie-color-gray">
            UID {{ userInfo?.userId }}
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
          <p>{{ userInfo?.email }}</p>
        </div>
        <!-- 引入 AvatarChange 組件 -->
        <AvatarChange
          :userImage="userInfo.avatarUrl"
          @avatarChanged="onAvatarChanged"
        />

        <div class="d-flex justify-content-between login-pw-change mb-4">
          <p>Login Password</p>
          <router-link to="/manage-password">
            <img src="@/assets/images/icon/ze-arrow 1 Copy 2.svg" alt="" />
          </router-link>
        </div>
        <NickNameChange
          :userName="userInfo.name"
          @upDataNickname="onNicknameChanged"
        />
        <div class="d-flex justify-content-start log-out-link mb-4">
          <a href="account/login">Log out</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

import AvatarChange from "./components/AvatarChange.vue";
import NickNameChange from "./components/NickNameChange.vue";

const userStore = useUserStore();
const userInfo = ref({});

const loadUserInfo = async () => {
  userInfo.value = await userStore.fetchUserInfo(); // 調用 API 更新 userInfo
  console.log(userInfo.value);
};

const onAvatarChanged = (newAvatarUrl) => {
  console.log("父層收到通知 更新頭像");
  userStore.updateAvatar(newAvatarUrl);
};

// 被子組件通知更換新名稱
const onNicknameChanged = (newNickname) => {
  console.log("父層收到通知 更新暱稱");
  userStore.updateNickname(newNickname);
};

onMounted(async () => {
  await loadUserInfo();
});
</script>

<style scoped></style>
