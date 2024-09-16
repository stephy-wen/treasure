<!-- src/components/AvatarChange.vue -->
<template>
  <div
    class="d-flex justify-content-between align-items-center avactar-change mb-4"
  >
    <p>Avatar</p>
    <a href="#" @click.prevent="openModal">
      <div>
        <img style="width: 36px" :src="selectedAvatarUrl" alt="Avatar" />
        <img
          src="@/assets/images/icon/ze-arrow 1 Copy 2.svg"
          alt="Arrow Icon"
        />
      </div>
    </a>

    <!-- Change Avatar Modal -->
    <div
      class="modal fade"
      id="changeAvatarModal"
      tabindex="-1"
      aria-labelledby="changeAvatarModalLabel"
      aria-hidden="true"
      ref="modalRef"
    >
      <div class="modal-dialog winnie-dialog-bottom">
        <div class="modal-content">
          <div class="modal-header justify-content-center pt-4">
            <h5 class="modal-title" id="changeAvatarModalLabel">
              Change profile picture
            </h5>
          </div>
          <div class="modal-body container px-4">
            <div class="text-center mt-1 mb-5">
              <img
                style="width: 65px !important"
                :src="tempSelectedAvatarUrl"
                alt="Selected Avatar"
              />
            </div>
            <div class="select-avatar">
              <p class="mb-3 fw-bold">Select avatar</p>
              <div class="d-flex">
                <div class="row gy-3">
                  <div
                    v-for="(avatar, index) in avatarImageList"
                    :key="index"
                    class="col-3 text-center"
                  >
                    <img
                      :src="avatar.url"
                      alt="Avatar"
                      @click="selectAvatar(avatar)"
                      :class="{ 'avatar-img': selectedAvatarId === avatar.id }"
                      style="cursor: pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer py-4">
            <button
              type="button"
              class="btn btn-primary save-btn"
              @click="saveAvatar"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { defineProps, defineEmits } from "vue";
import modules from "@/services/modules";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ElMessage } from "element-plus";

const { changeAvatar } = modules.userInfo; // api

const {
  userInfo: { getAvatarList },
} = modules;

const props = defineProps({
  userImage: String,
});

const emit = defineEmits(["avatarChanged", "upDataNickname"]);

const selectedAvatarId = ref(null); // 定義選中的頭像 ID 和 URL
const selectedAvatarUrl = ref(""); // 默認顯示第一個頭像
const tempSelectedAvatarUrl = ref(""); // 用來存儲臨時選中的頭像

const avatarImageList = ref([]);

const modalRef = ref(null);
let bootstrapModal = null;

// 監聽 props.userName 的變化，並更新本地的 userName
watch(
  () => props.userImage,
  (newUserImage) => {
    selectedAvatarUrl.value = newUserImage;
    tempSelectedAvatarUrl.value = newUserImage;
  }
);

const openModal = () => {
  if (bootstrapModal) {
    bootstrapModal.show();
    tempSelectedAvatarUrl.value = selectedAvatarUrl.value;
  }
};

const closeModal = () => {
  if (bootstrapModal) {
    bootstrapModal.hide();
  }
};

const selectAvatar = (avatar) => {
  selectedAvatarId.value = avatar.id;
  // selectedAvatarUrl.value = avatar.url;
  tempSelectedAvatarUrl.value = avatar.url; // 只更新臨時變量
};

// 當點擊 Save 按鈕時保存變更
const saveAvatar = async () => {
  if (selectedAvatarId.value) {
    try {
      await changeAvatar(selectedAvatarId.value);
      console.log("Avatar changed successfully!");
      ElMessage.success("Avatar changed successfully!");

      // 確認選中的頭像並更新
      selectedAvatarUrl.value = tempSelectedAvatarUrl.value; // 只有在點擊 Save 時，才更新 selectedAvatarUrl

      emit("avatarChanged", selectedAvatarUrl.value);
      closeModal();
    } catch (error) {
      ElMessage.error("Failed to change avatar");
      console.error("Failed to change avatar:", error);
    }
  } else {
    ElMessage.warning("Please select an avatar.");
    console.log("Please select an avatar.");
  }
};

const getAvatarImageList = async () => {
  try {
    const res = await getAvatarList();
    avatarImageList.value = res.data.data;
    console.log(avatarImageList.value);
  } catch (error) {
    console.log("getAvatarImage錯誤", error);
  }
};

onMounted(() => {
  getAvatarImageList();
  // 初始化 Bootstrap 的 Modal
  const modalElement = modalRef.value;
  if (modalElement) {
    bootstrapModal = new window.bootstrap.Modal(modalElement);
  }
});
</script>

<style scoped>
/* 確保模態框的 CSS 是正確的 */
.modal.fade.show {
  display: block;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #2b3139;
  color: #f8f8f8;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.winnie-dialog-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  margin: 0;
  transition: transform 0.4s ease-in-out;
}

.modal.fade .winnie-dialog-bottom {
  transform: translateY(100%);
}

.modal.show .winnie-dialog-bottom {
  transform: translateY(0);
}

.save-btn {
  margin: 0 auto;
  background-color: #414d5a;
  color: #f8f8f8;
  width: 230px;
  border: none;
  border-radius: 50px;
}

.select-avatar img {
  height: 58px;
  width: 58px;
  border-radius: 50px;
}
</style>
