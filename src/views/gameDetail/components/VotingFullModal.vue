<template>
	<div 
	  v-if="isOpen"
    ref="modal"
		class="modal fade show" 
		id="maxParticipantsModal" 
		tabindex="-1" 
		aria-labelledby="maxParticipantsModalLabel" 
		aria-hidden="true"
		role="dialog"
    style="display: block"
	>
		<div class="modal-dialog mx-auto modal-dialog-centered">
			<div class="modal-content modal-background" style="background-color: #181A20;border: 1px solid #414D5A;">
				<div class="modal-header pb-0 d-flex justify-content-between">
					<h5 class="modal-title" id="maxParticipantsModalLabel"></h5>
          <button
            type="button"
            class="btn winnie-btn-close"
            @click="closeModal"
            aria-label="Close"
          >
            <font-awesome-icon
              icon="fa-solid fa-xmark"
            />
          </button>
				</div>
				<div class="modal-body text-center d-flex flex-column justify-content-center">
					<div class="vote-full-reminder mx-auto">
						<img class="mb-3" style="width: 50px;" src="@/assets/images/icon/logo.svg" alt="">
						<p class="fs-5">Voting is full. <br>Please wait for the next round.</p>
						<p class="winnie-color-gray mt-5 fs-1">{{ countdown }}</p>
					</div> 
				</div>
				<div class="modal-footer">
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch, onMounted, defineProps, defineEmits } from "vue";

const modal = ref(null); // 用於存儲模態框的 DOM 元素
const countdown = ref(5); //初始化倒數計時5秒

onMounted(() => {
  //const modalElement = modal.value; // 獲取模態框的 DOM 元素
  //console.log(modalElement, "modalElement");
  //const isHidden = window.getComputedStyle(modalElement).display === "none";
  //console.log(isHidden); // 檢查模態框是否隱藏
});

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["closeModal"]);

const closeModal = () => { 
  emit("closeModal");
};

watch(
	() => props.isOpen, //監聽props.isOpen的變化
	(newVal) => {
		if (newVal) {
			countdown.value = 5 //每次打開modal都會重置倒數
			const timer = setInterval(() => {
				if (countdown.value > 0) {
					countdown.value -= 1;
				} else {
					clearInterval(timer);
					closeModal();
				}
			}, 1000);
		}
	} 
)
</script>

<style scoped>
.winnie-btn-close {
	background-color: #1E2329;
	color: #F8F8F8;
	border-radius: 50px;
	border: none;
}

.winnie-btn-close:hover {
	background-color: #414D5A;
	color: #F8F8F8;
}

#maxParticipantsModal .modal-background {
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

#maxParticipantsModal .modal-header {
	border-bottom: none;
}

#maxParticipantsModal .modal-footer {
	border-top: none;
}

#maxParticipantsModal .winnie-color-gray{
	color: #BBB;
}

#maxParticipantsModal .modal-dialog .modal-content {
	min-height: 300px;
}

#maxParticipantsModal {
	background-color: rgba(0, 0, 0, 0.50);
}
</style>