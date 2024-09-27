<template>
  <div class="leaderboard-container">
    <table class="table table-borderless fw-bold custom-rounded">
      <thead>
        <tr>
          <th
            v-for="header in headers"
            :key="header"
            :class="header.class"
            scope="col"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in data" :key="index">
          <td
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            :class="cell.class"
          >
            <!-- 如果 imageFirst 為 true，先顯示圖片，然後顯示文字 -->
            <template v-if="imageFirst">
              <!-- 檢查是否有 link，如果有則包裹在 <a> 中 -->
              <a v-if="cell.link" :href="cell.link" :target="cell.target">
                <img
                  v-if="cell.image"
                  class="img-fluid"
                  :src="cell.image"
                  alt=""
                />
              </a>
              <!-- 如果沒有 link，則直接顯示圖片 -->
              <img
                v-else-if="cell.image"
                class="img-fluid"
                :src="cell.image"
                alt=""
              />
              {{ cell.text }}
            </template>

            <!-- 如果 imageFirst 為 false，先顯示文字，然後顯示圖片 -->
            <template v-else>
              {{ cell.text }}
              <a v-if="cell.link" :href="cell.link" :target="cell.target">
                <img
                  v-if="cell.image"
                  class="img-fluid"
                  :style="cell.imageStyle ? cell.imageStyle : ''"
                  :src="cell.image"
                  alt=""
                />
              </a>
              <img
                v-else-if="cell.blackImage"
                class="img-fluid"
                :style="cell.imageStyle ? cell.imageStyle : ''"
                :src="cell.blackImage"
                alt=""
              />
              <img
                v-else-if="cell.image"
                class="img-fluid"
                :style="cell.imageStyle ? cell.imageStyle : ''"
                :src="cell.image"
                alt=""
              />
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  Title: String,
  headers: Array,
  data: Array,
  customClass: String,
  imageFirst: { type: Boolean, default: false }, // 控制圖片和文字的顯示順序
});
</script>

<style scoped>
.leaderboard-container .table {
  --bs-table-bg: #1e2329;
  color: #f8f8f8;
  --bs-table-color: none;
  width: 100%;
  margin: 0;
}

.leaderboard-container .table th,
.leaderboard-container .table td {
  vertical-align: middle;
}

.leaderboard-container thead {
  color: #bbb;
}

.leaderboard-container .table tbody tr th {
  color: #bbb;
  text-align: center;
}

.leaderboard-container .table tbody tr:hover {
  background-color: #414d5a;
}

.leaderboard-container .table img {
  max-width: 35px;
  margin-right: 10px;
}

.custom-rounded {
  border-radius: 15px;
  overflow: hidden;
}

@media (max-width: 767.98px) {
  .leaderboard-container .table {
    --bs-table-bg: none;
  }
  .leaderboard-container .table img {
    margin-right: 5px;
  }
  .custom-rounded {
    border-radius: 0px;
  }
}

.rewards-list-dropdown .dropdown-menu .leaderboard-container .table {
  --bs-table-bg: transparent;
  border-radius: 0px;
}

.icon-cursor img {
  cursor: pointer;
}
</style>
