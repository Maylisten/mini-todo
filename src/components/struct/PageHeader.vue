<template>
  <div class="relative flex h-full w-full select-none flex-row items-center justify-center">
    <span class="text-base font-bold tracking-widest">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">

import {mainMenuList} from "@/router/mainMenu.ts";
import {computed} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const title = computed(() => {
  const name = route.name;
  return mainMenuList.find(item => item.name === name)?.meta.label;
});

</script>

<style scoped>

</style>
