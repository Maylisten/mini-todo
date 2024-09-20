<template>
  <div
      class="relative flex h-fit w-full flex-col py-4 transition border-b-[1px] border-base-content/40 gap-1.5 group">
    <div class="flex flex-row items-center gap-2">
      <input type="checkbox" name="radio-1" class="checkbox checkbox-sm checkbox-primary" checked
             @change="handleCheckChange"/>
      <span class="text-sm">{{ task.title }}</span>
      <span class="text-xs text-base-content/60 text-gray-400">
        {{ formatDateStr }}
      </span>
    </div>
    <p class="pl-7 text-xs text-base-content/60">
      {{ task.description }}
    </p>
  </div>
</template>

<script setup lang="ts">

import {computed, toRefs} from "vue";
import {useTaskStore} from "@/store/task.ts";
import dayjs from "dayjs";

const props = defineProps<{ task: Task, timestamp: number }>();
const {task, timestamp} = toRefs(props);

const formatDateStr = computed(() => dayjs(timestamp.value).format("YYYY-MM-DD"));

const taskStore = useTaskStore();
const {restore} = taskStore;
const handleCheckChange = async (event: Event) => {
  if (!(event.target as HTMLInputElement).checked) {
    await restore(task.value.id);
  }
};

</script>

<style scoped>

</style>
