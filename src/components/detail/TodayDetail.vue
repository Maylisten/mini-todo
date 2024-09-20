<template>
  <div class="pb-[50px]">
    <DateTaskList :timestamp="timestamp"
                  :tasks="tasks"/>
  </div>
</template>

<script setup lang="ts">

import DateTaskList from "@/components/detail/DateTaskList.vue";
import {useTaskStore} from "@/store/task.ts";
import {ref, toRefs} from "vue";
import {getBeginTimestamp} from "@/utils";

const taskStore = useTaskStore();
const {todayUncompletedTaskList} = toRefs(taskStore);
const timestamp = ref(getBeginTimestamp(new Date()));
const tasks = todayUncompletedTaskList;

</script>

<style scoped>

</style>
