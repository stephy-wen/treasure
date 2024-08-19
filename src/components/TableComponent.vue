<template>
  <div class="leaderboard-container">
    <h2 class="fw-bold mb-3">{{ Title }}</h2>
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
});
</script>

<style scoped>
/* 在此添加樣式 */
</style>
