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
            <img v-if="cell.image" class="img-fluid" :src="cell.image" alt="" />
            {{ cell.text }}
            <img v-if="cell.USDIcon" class="img-fluid ms-1" style="max-width: 22px;" :src="cell.USDIcon" alt="" />
            <img v-if="cell.icon" class="img-fluid ms-1" :src="cell.icon" alt="" />
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
});
</script>

<style scoped>
.leaderboard-container .table {
    --bs-table-bg: #1E2329;
    color: #F8F8F8;
    --bs-table-color: none;
    width: 100%;
    margin: 0;
}

.leaderboard-container .table th, .leaderboard-container .table td {
    vertical-align: middle;
}

.leaderboard-container thead {
    color: #BBB;
}

.leaderboard-container .table tbody tr th {
    color: #BBB;
    text-align: center;
}

.leaderboard-container .table tbody tr:hover {
    background-color: #414D5A;
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
    .leaderboard-name {
        font-size: 0.75rem;
    }   
    .leaderboard-container .table img {
        margin-right: 5px;
    }
    .custom-rounded {
        border-radius: 0px;
    }
}

.rewards-list-dropdown .dropdown-menu .leaderboard-container .table{
  --bs-table-bg: transparent;
  border-radius: 0px;
}
</style>
