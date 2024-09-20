<template>
  <div class="w-full h-fit">
    <div class="divider">待完成</div>
    <TodayUncompleteList/>
    <div class="divider">已完成</div>
    <TodayCompleteList/>
  </div>
</template>

<script setup lang="ts">
import TodayUncompleteList from "@/components/today/TodayUncompleteList.vue";
import TodayCompleteList from "@/components/today/TodayCompleteList.vue";
</script>

<style scoped>

</style>
