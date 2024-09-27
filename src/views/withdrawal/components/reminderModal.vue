<template>
  <!-- reminder modal -->
  <div
    class="modal fade"
    id="withdrawRemindModal"
    tabindex="-1"
    aria-labelledby="withdrawRemindModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="withdrawRemindModalLabel"></h5>
        </div>
        <div
          class="modal-body d-flex flex-column align-items-center justify-content-center"
        >
          <img
            class="mb-3"
            src="@/assets/images/icon/md-warning 1.svg"
            alt=""
          />
          <p class="text-center">
            DO NOT define your Binance deposit address as the receiving address
            for validator rewards.<br />Validator rewards sent from the node to
            Binance deposit address is not supported and will not be
            credited.<br />This will lead to asset loss.
          </p>
        </div>
        <div class="modal-footer px-5">
          <button type="button" class="btn w-100 mb-3 mt-3">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
