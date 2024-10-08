<template>
  <div
    v-if="isOpen"
    ref="modal"
    class="modal fade show"
    id="getRewardsModal"
    tabindex="-1"
    aria-labelledby="getRewardsModalLabel"
    role="dialog"
    style="display: block"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header pb-0 d-flex justify-content-between">
          <h5 class="modal-title" id="getRewardsModalLabel"></h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          >
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
        <div class="modal-body pt-0">
          <div class="text-center">
            <img
              class="w-50"
              src="@/assets/images/common/share-gift.png"
              alt=""
            />
            <p class="f-color-white fw-bolder">
              Get a Mystery Box<br />worth up to 50 USDT in crypto
            </p>
          </div>
          <div class="container invite-info">
            <div class="invite-link mt-5">
              <label for="copy-link" class="form-label" style="font-size: 14px"
                >Invite link
                <img
                  class="ms-1"
                  src="@/assets/images/icon/antOutline-link 1.svg"
                  alt=""
              /></label>
              <div class="input-group">
                <input
                  id="copy-link"
                  type="text"
                  class="form-control"
                  style="font-size: 12px"
                  :value="referralUrl"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  readonly
                />
                <!-- value="http://www.onechance.com/join/3211232215" -->
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  @click="copyUserLink"
                >
                  <img
                    src="@/assets/images/icon/md-content_copy 1.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
            <div class="invite-code mt-2 mb-5">
              <label for="copy-code" class="form-label" style="font-size: 14px"
                >Invite code
                <img
                  class="ms-1"
                  src="@/assets/images/icon/md-code 1.svg"
                  alt=""
              /></label>
              <div class="input-group">
                <input
                  id="copy-code"
                  type="text"
                  class="form-control"
                  style="font-size: 12px"
                  :value="userId"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  readonly
                />
                <button
                  class="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  @click="copyUserId"
                >
                  <img
                    src="@/assets/images/icon/md-content_copy 1.svg"
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from "vue";
import { ElMessage } from "element-plus";

const props = defineProps({
  isOpen: Boolean,
  userId: String,
});

const modal = ref(null); // 用於存儲模態框的 DOM 元素
const userId = ref(props.userId);

const baseUrl = import.meta.env.VITE_APP_URL; // 使用環境變量來獲取基礎 URL
const referralUrl = ref(`${baseUrl}/register?join=${userId.value}`);

// 監聽 props.userId 的變化，並更新本地的 userId
watch(
  () => props.userId,
  (newUserId) => {
    userId.value = newUserId;
    referralUrl.value = `${baseUrl}/register?join=${newUserId}`;
  }
);

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};

// 定義一個方法來複製 userId 到剪貼板
const copyUserId = async () => {
  try {
    await navigator.clipboard.writeText(userId.value);
    ElMessage({
      message: "User ID Copied successfully.",
      type: "success",
    });
  } catch (error) {
    ElMessage.error({
      message: "Copy failed, please try again!",
      duration: 3000,
    });
  }
};

const copyUserLink = async () => {
  try {
    await navigator.clipboard.writeText(referralUrl.value);
    ElMessage({
      message: "Url Copied successfully.",
      type: "success",
    });
  } catch (error) {
    ElMessage.error({
      message: "Copy failed, please try again!",
      duration: 3000,
    });
  }
};
</script>

<style scoped>
#getRewardsModal .modal-content {
  background-color: #2b3139;
}

#getRewardsModal .modal-header {
  border-bottom: none;
}

#getRewardsModal .modal-footer {
  border-top: none;
}

@media (min-width: 575.98px) {
  #getRewardsModal .modal-dialog {
    max-width: 350px;
  }
}

#getRewardsModal .winnie-btn-close {
  background-color: #1e2329;
  color: #f8f8f8;
  border-radius: 50px;
  border: none;
}

#getRewardsModal .winnie-btn-close:hover {
  background-color: #414d5a;
}

.invite-link input,
.invite-link button,
.invite-link input:focus,
.invite-code input,
.invite-code button,
.invite-code input:focus {
  background-color: #1e2329;
  color: #f8f8f8;
  border: none;
  box-shadow: none;
}

.invite-link button:hover,
.invite-code button:hover {
  background-color: #414d5a;
}
</style>
