<!-- src/components/AvatarChange.vue -->
<template>
  <div
    class="d-flex justify-content-between align-items-center avactar-change mb-4"
  >
    <p>Avatar</p>
    <a href="#" @click.prevent="openModal">
      <div>
        <img style="width: 36px" :src="selectedAvatar" alt="Avatar" />
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
                :src="selectedAvatar"
                alt="Selected Avatar"
              />
            </div>
            <div class="select-avatar">
              <p class="mb-3 fw-bold">Select avatar</p>
              <div class="d-flex">
                <div class="row gy-3">
                  <div
                    v-for="(avatar, index) in avatars"
                    :key="index"
                    class="col-3 text-center"
                  >
                    <img
                      :src="avatar"
                      alt="Avatar"
                      @click="selectAvatar(avatar)"
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
import { ref, onMounted } from "vue";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// 模擬 avatar 圖片的清單
const avatars = [
  "@/assets/images/icon/NFT/02.png",
  "@/assets/images/icon/NFT/01.png",
  "@/assets/images/icon/NFT/03.png",
  "@/assets/images/icon/NFT/04.png",
  "@/assets/images/icon/NFT/05.png",
  "@/assets/images/icon/NFT/06.png",
  "@/assets/images/icon/NFT/07.png",
  "@/assets/images/icon/NFT/09.png",
];

// 管理選擇的 avatar 和 modal 狀態
const selectedAvatar = ref(avatars[7]); // 預設選擇最後一個
const modalRef = ref(null);
let bootstrapModal = null;

const openModal = () => {
  if (bootstrapModal) {
    bootstrapModal.show();
  }
};

const closeModal = () => {
  if (bootstrapModal) {
    bootstrapModal.hide();
  }
};

const selectAvatar = (avatar) => {
  selectedAvatar.value = avatar;
};

const saveAvatar = () => {
  // 實際儲存邏輯可以在這裡處理
  closeModal();
};

onMounted(() => {
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

.modal-header,
.modal-body,
.modal-footer {
  background-color: black;
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
  background-color: #414d5a;
  color: #f8f8f8;
  width: 230px;
  border: none;
  border-radius: 50px;
}
</style>
