<template>
  <div>
    <div
      v-if="isOpen"
      ref="modal"
      class="modal fade show"
      id="avatarModal"
      tabindex="-1"
      aria-labelledby="avatarModalLabel"
      aria-hidden="true"
      role="dialog"
      style="display: block"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-between">
            <h5 class="modal-title ps-2 ps-lg-3" id="avatarModalLabel">
              Change profile picture
            </h5>
            <button
              type="button"
              class="btn winnie-btn-close"
              data-bs-dismiss="modal"
              @click="closeModal"
              aria-label="Close"
            >
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </div>
          <div class="modal-body container">
            <div class="text-center mt-1 mb-5">
              <img
                style="width: 65px !important"
                src="@/assets/images/icon/NFT/09.png"
                alt=""
              />
            </div>
            <div class="select-avatar">
              <p class="mb-3 fw-bold">Select avatar</p>
              <div class="d-flex">
                <div class="row gy-3">
                  <div
                    class="col-3 text-center"
                    v-for="(avatars, index) in avatars"
                    :key="index"
                  >
                    <img
                      src="@/assets/images/icon/NFT/09.png"
                      alt="Avatar"
                      class="avatar-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer mx-auto mb-5">
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
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";

const modal = ref(null); // 用於存儲模態框的 DOM 元素

onMounted(() => {
  //const modalElement = modal.value; // 獲取模態框的 DOM 元素
  //console.log(modalElement, "modalElement");
  //const isHidden = window.getComputedStyle(modalElement).display === "none";
  //console.log(isHidden); // 檢查模態框是否隱藏
});

const props = defineProps({
  isOpen: Boolean,
  avatars: Array,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>
#avatarModal {
  color: #f8f8f8;
}

#avatarModal .modal-content {
  background-color: #2b3139;
}

#avatarModal .modal-header {
  border-bottom: none;
}

#avatarModal .modal-body img {
  width: 48px;
}

#avatarModal .modal-footer {
  border-top: none;
}

#avatarModal button.save-btn {
  background-color: #414d5a;
  color: #f8f8f8;
  width: 230px;
  border: none;
  border-radius: 50px;
}

#avatarModal button.save-btn:hover {
  background-color: #1e2329;
}

@media (min-width: 575.98px) {
  #avatarModal .modal-dialog {
    max-width: 350px;
  }
}

#avatarModal .winnie-btn-close {
  background-color: #1e2329;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

#avatarModal .winnie-btn-close:hover {
  background-color: #414d5a;
}

@media (min-width: 575.98px) {
  #avatarModal .modal-dialog {
    max-width: 350px;
  }
}
</style>
