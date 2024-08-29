<template>
	<div 
	v-if="isOpen"
    ref="modal"
	class="modal fade show" 
	id="getRewardsModal" 
	tabindex="-1" 
	aria-labelledby="getRewardsModalLabel" 
	aria-hidden="true"
	role="dialog"
	style="display: block"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header pb-0 d-flex justify-content-between">
					<h5 class="modal-title" id="getRewardsModalLabel"></h5>
					<button 
					type="button" class="btn winnie-btn-close" 
					data-bs-dismiss="modal" aria-label="Close"
					@click="closeModal"
					>
						<font-awesome-icon
						icon="fa-solid fa-xmark"
						/>
					</button>
				</div>
				<div class="modal-body pt-0">
					<div class="text-center">
						<img class="w-50" src="@/assets/images/common/share-gift.png" alt="">
						<p class="f-color-white fw-bolder">Get a Mystery Box<br>worth up to 50 USDT in crypto</p>
					</div>
					<div class="container invite-info">
						<div class="invite-link mt-5">
							<label for="copy-link" class="form-label" style="font-size: 14px;">Invite link <img class="ms-1" src="@/assets/images/icon/antOutline-link 1.svg" alt=""></label>
							<div class="input-group">
									<input id="copy-link" type="text" class="form-control" style="font-size: 12px;" value="http://www.onechance.com/join/3211232215" aria-label="Recipient's username" aria-describedby="button-addon2" readonly>
									<button class="btn btn-outline-secondary" type="button" id="button-addon2"><img src="@/assets/images/icon/md-content_copy 1.svg" alt=""></button>
							</div>
						</div>
						<div class="invite-code mt-2 mb-5">
							<label for="copy-code" class="form-label" style="font-size: 14px;">Invite code <img class="ms-1" src="@/assets/images/icon/md-code 1.svg" alt=""></label>
							<div class="input-group">
									<input id="copy-code" type="text" class="form-control" style="font-size: 12px;" value="3211232215" aria-label="Recipient's username" aria-describedby="button-addon2" readonly>
									<button class="btn btn-outline-secondary" type="button" id="button-addon2"><img src="@/assets/images/icon/md-content_copy 1.svg" alt=""></button>
							</div>
						</div>
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
});

console.log("isOpen prop in GetRewardsModal:", props.isOpen);

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};

</script>

<style scoped>
#getRewardsModal .modal-content {
  background-color: #2B3139;
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
  background-color: #1E2329;
  color: #F8F8F8;
  border-radius: 50px;
  border: none;
}

#getRewardsModal .winnie-btn-close:hover {
  background-color: #414D5A;
}

.invite-link input, .invite-link button, .invite-link input:focus,
.invite-code input, .invite-code button, .invite-code input:focus {
  background-color: #1E2329;
  color: #F8F8F8;
  border: none;
  box-shadow: none;
}

.invite-link button:hover, .invite-code button:hover {
	background-color: #414D5A;
}
</style>