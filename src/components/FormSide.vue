<template>
	<div class="side-form position-relative">
		<form class="px-3 px-md-0 px-lg-5" id="loginForm">

		</form>
	</div>
</template>
  
<script setup>

</script>
  
<style scoped>
.side-form {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 20px;
	width: 100%;
	max-width: 400px;
}
@media (max-width: 991px) {
	.side-form {
		width: 100%;
		padding: 15px;
	}
}
</style>
  