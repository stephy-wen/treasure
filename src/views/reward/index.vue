<template>
  <div></div>
</template>
<script>
import { onMounted } from "vue";
import modules from "@/services/modules";

const {
  userInfo: { getGameRewardInfo, getGameRewardHistory },
  auth: { getTransactionLog },
} = modules;

const getRewardInfos = async () => {
  try {
    await getGameRewardInfo;
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {});
</script>
