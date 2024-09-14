<template>
  <div class="relative flex h-full w-full flex-col gap-[5px]">
    <ExpiredDetail/>
    <FutureDetail/>
    <TodayDetail/>
  </div>
</template>

<script setup lang="ts">
import ExpiredDetail from "@/components/detail/ExpiredDetail.vue";
import FutureDetail from "@/components/detail/FutureDetail.vue";
import TodayDetail from "@/components/detail/TodayDetail.vue";
import 'simplebar-vue/dist/simplebar.min.css';
</script>

<style scoped lang="less">

</style>
