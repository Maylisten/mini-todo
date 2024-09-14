<template>
  <div class="w-fit h-fit hover:cursor-pointer no-draggable pointer-events-auto" @click="handleIconClick">
    <HomeIcon class="hover:cursor-pointer hover:text-primary"/>
  </div>
</template>

<script setup lang="ts">

import HomeIcon from "@/components/icon/HomeIcon.vue";

const handleIconClick = () => {
  window.localApi.native.showWindow("main");
};
</script>

<style scoped>

</style>
