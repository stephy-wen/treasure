<template>
	<div 
	v-if="isOpen"
  ref="modal"
	class="modal fade show" 
	id="nicknameReviseModal" 
	tabindex="-1" 
	aria-labelledby="nicknameReviseModalLabel" 
	aria-hidden="true"
	role="dialog"
	style="display: block"
	>
		<div class="modal-dialog modal-dialog-centered">
			<div class="modal-content">
				<div class="modal-header d-flex justify-content-between">
					<h5 class="modal-title ps-4" id="nicknameReviseModalLabel">Nickname</h5>
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
				<div class="modal-body winnie-container-nickname mx-auto">
					<div class="nickname-change mb-3">
						<label style="font-size: 14px;" for="inputNickname" class="form-label">Your nickname is used for trading messages</label>
						<input type="text" id="inputNickname" class="form-control" value="winnie123456789" placeholder="Enter your new nickname" aria-describedby="nicknameHelpBlock">
						<div id="nicknameHelpBlock" class="form-text">
							15/20
						</div>
					</div>
					<div class="nickname-notice">
						<p style="font-size: 14px;">Your nickname can be edited 3 more time(s) this year</p>
						<div class="nickname-notice-bk-color mt-2 mb-3 p-2 d-flex justify-content-between">
							<p style="font-size: 12px;"><i class="fa-solid fa-circle-exclamation me-2 winnie-text-white"></i></p>
							<p class="text-start deposit-notice-color" style="font-size: 12px;">
								Make sure your nickname does not contain disrespectful language, our official names (i.e. product names), or names of other trading platforms
							</p>
						</div>
					</div>
				</div>
				<div class="modal-footer mx-auto mb-3">
					<button type="button" class="btn btn-primary save-btn">confirm</button>
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

console.log("isOpen prop in NicknameReviseModal:", props.isOpen);

const emit = defineEmits(["closeModal"]);

const closeModal = () => {
  emit("closeModal");
};
</script>

<style scoped>
#nicknameReviseModal .modal-content {
  background-color: #2B3139;
}

#nicknameReviseModal .modal-header {
  border-bottom: none;
}

#nicknameReviseModal .modal-footer {
  border-top: none;
}

#nicknameReviseModal button.save-btn {
  background-color: #414D5A;
  color: #F8F8F8;
  width: 230px;
  border: none;
  border-radius: 50px;
}

@media (min-width: 575.98px) {
#nicknameReviseModal .modal-dialog{
  max-width: 500px;
}
}

#nicknameReviseModal .winnie-btn-close {
  background-color: #1E2329;
  color: #F8F8F8;
  border-radius: 50px;
  border: none;
}

.nickname-notice-bk-color {
  background-color: #414D5A;
  border-radius: 8px;
}

#nicknameHelpBlock {
  color: #BBB;
  text-align: end;
}

#nicknameReviseModal input {
  background-color: transparent;
  border: 1px solid #414D5A;
  color: #F8F8F8;
}

#nicknameReviseModal .winnie-container-nickname{
  width: 80%;
}
</style>