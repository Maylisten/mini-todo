<template>
  <AppLayout/>
</template>

<script setup lang="ts">
import AppLayout from "@/layout/AppLayout.vue";
import {useTaskStore} from "@/store/task.ts";
import {onMounted} from "vue";
import {useThemeStore} from "@/store";

const themeStore = useThemeStore();
const {initTheme} = themeStore;
const taskStore = useTaskStore();
const {list} = taskStore;
onMounted(async () => {
  initTheme();
  await list();
});
</script>

<style scoped>

</style>

<style>

</style>
