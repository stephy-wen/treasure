<template>
  <div class="leaderboard-page-nav mt-5 d-flex justify-content-center">
    <nav aria-label="Page navigation example">
      <ul class="pagination flex-wrap justify-content-center">
        <li :class="['page-item', { disabled: currentPage === 1 }]">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="changePage(currentPage - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li
          v-for="page in totalPages"
          :key="page"
          :class="['page-item', { active: page === currentPage }]"
        >
          <a class="page-link" href="#" @click.prevent="changePage(page)">{{
            page
          }}</a>
        </li>

        <li :class="['page-item', { disabled: currentPage === totalPages }]">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="changePage(currentPage + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// 定義 props
const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
});

// 狀態管理
const currentPage = ref(1);

// 計算總頁數
const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

// 定義事件
const emit = defineEmits(["page-changed"]);

// 切換頁面
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    emit("page-changed", page); // 傳遞頁碼至父組件
  }
};
</script>

<style scoped>
.leaderboard-page-nav .pagination {
    --bs-pagination-bg: transparent;
    --bs-pagination-border-color: none;
    --bs-pagination-focus-color: #FCD535;
    --bs-pagination-hover-bg: transparent;
    --bs-pagination-focus-bg: transparent;
    --bs-pagination-hover-color: #FCD535;
    --bs-pagination-color: #415058;
    --bs-pagination-focus-box-shadow: none;
}
.disabled>.page-link, .page-link.disabled {
  color: #415058;
  background-color: transparent;
}
.active>.page-link, .page-link.active{
  border-color: transparent;
  color: #FCD535;
  background-color: transparent;  
}
</style>
