<template>
  <div class="d-flex justify-content-between nickname-change mb-4">
    <p>Nickname</p>
    <a href="#" @click.prevent="openModal">
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
      ref="modalRef"
    >
      <div class="modal-dialog modal-fullscreen winnie-dialog-right">
        <div class="modal-content">
          <div
            class="modal-header d-flex align-items-center justify-content-center py-3"
          >
            <h5 class="modal-title fs-5 fw-bold" id="changeNicknameModalLabel">
              Nickname
            </h5>
            <a
              href="#"
              class="position-absolute start-0 ms-3"
              data-bs-dismiss="modal"
              @click.prevent="closeModal"
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
                language, our official names (i.e. product names), or names of
                other trading platforms
              </p>
              <div class="text-center mt-5">
                <button class="mt-5 save-btn btn btn-primary" type="button">
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
</template>

<script setup>
import { ref, onMounted } from "vue";
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

onMounted(() => {
  // 初始化 Bootstrap 的 Modal
  const modalElement = modalRef.value;
  if (modalElement) {
    bootstrapModal = new window.bootstrap.Modal(modalElement); // 初始化模態框
  }
});
</script>

<style scoped>
.modal-content {
  background-color: #2b3139;
  color: #f8f8f8;
}

.modal.fade .winnie-dialog-right {
  transform: translateX(100%);
}

.modal.show .winnie-dialog-right {
  transform: translateX(0);
}
</style>
