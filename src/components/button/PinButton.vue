<template>
  <div class="w-fit h-fit hover:cursor-pointer no-draggable pointer-events-auto" @click="handleIconClick">
    <PinIcon/>
  </div>
</template>

<script setup lang="ts">

import PinIcon from "@/components/icon/PinIcon.vue";

const handleIconClick = () => {
  window.localApi.native.showWindow("pin");
};
</script>

<style scoped>

</style>
