<template>
  <div class="flex flex-col">
    <div class="h-fit border-b-[1px] border-base-content/40 pb-2.5 flex flex-row justify-between items-center">
      <span> 共完成 <span class="text-primary">{{ taskCount }}</span> 个任务</span>
      <div>
        <button class="btn btn-primary btn-xs" :class="{'btn-disabled': noData}" @click="clearAll">全部删除</button>
      </div>
    </div>
    <div v-for="[timestamp, tasks] of entities" :key="timestamp">
      <CompleteTaskItem v-for="task of tasks" :key="task.id" :task="task" :timestamp="timestamp"/>
    </div>
    <NoData v-if="noData"/>
  </div>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {useTaskStore} from "@/store/task.ts";
import {storeToRefs} from "pinia";
import CompleteTaskItem from "@/components/complete/CompleteTaskItem.vue";
import {useToast} from "vue-toastification";
import NoData from "@/components/common/NoData.vue";

const taskStore = useTaskStore();
const {completedTaskMap} = storeToRefs(taskStore);
const {removeByBatch} = taskStore;
const entities = computed(() => [...completedTaskMap.value.entries()].sort(([timestamp1], [timestamp2]) => timestamp2 - timestamp1));
const taskCount = computed(() => entities.value.reduce((count, [, tasks]) => count + tasks.length, 0));
const noData = computed(() => taskCount.value === 0);

const toast = useToast();
const clearAll = () => {
  if (window.confirm("确定要永久清空全部已完成任务吗？")) {
    const count = taskCount.value;
    removeByBatch(entities.value.reduce((ids, [, tasks]) => ids.concat(tasks.map(task => task.id)), new Array<string>()));
    toast.success(`成功清空 ${count} 项任务`);
  }
};
</script>

<style scoped>

</style>
