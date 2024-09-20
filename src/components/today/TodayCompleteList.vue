<template>
  <div class="flex flex-col gap-3">
    <TodayItem v-for="task of todayCompletedTaskList" :key="task.id" :task="task" :checked="true" :draggable="false"/>
  </div>
</template>

<script setup lang="ts">

import {useTaskStore} from "@/store/task.ts";
import {storeToRefs} from "pinia";
import TodayItem from "@/components/today/TodayItem.vue";

const taskStore = useTaskStore();
const {todayCompletedTaskList} = storeToRefs(taskStore);

</script>

<style scoped>

</style>
