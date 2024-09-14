<template>
  <div class="h-fit w-full">
    <div
        class="flex select-none flex-row items-center rounded-md text-base title gap-1.5 mb-2.5 p-2 bg-base-content/10">
      <div class="rounded-md p-0.5 hover:bg-base-content/30 hover:cursor-pointer">
        <LeftArrowIcon @click="toggleShow"
                       :class="{'rotate-[270deg]':show, 'rotate-180':!show}"/>
      </div>
      <div>{{ title }}</div>
      <div class="bg-primary/60 px-2 text-sm rounded-md font-bold text-white">{{ taskCount }}</div>
      <div @click="completeAll"
           class="text-primary text-xl hover:cursor-pointer hover:bg-base-content/10 rounded-md p-1 transition ml-auto"
           :class="{'icon-disabled':noData}">
        <DeleteIcon/>
      </div>
    </div>
    <transition enter-active-class="animate__animated animate__faster animate__fadeIn">
      <div v-show="show" class="pl-[30px]">
        <div v-if="noData">
          <div class="mb-2.5 ml-1 text-base-content/60">
            无任务
          </div>
        </div>
        <div v-else class="flex flex-col gap-16 mb-[50px]">
          <DateTaskList v-for="({timestamp, tasks}) of entities" :key="timestamp" :timestamp="timestamp"
                        :tasks="tasks"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import LeftArrowIcon from "@/components/icon/LeftArrowIcon.vue";
import {computed, ref, toRefs} from "vue";
import DateTaskList from "@/components/detail/DateTaskList.vue";
import {useTaskStore} from "@/store/task.ts";
import {useToast} from "vue-toastification";
import DeleteIcon from "@/components/icon/DeleteIcon.vue";

const props = defineProps<{ title: string, data: Map<number, Task[]> }>();
const {title, data} = toRefs(props);

const entities = computed(() =>
    [...data.value.entries()].map(([timestamp, tasks]) => ({timestamp, tasks}))
);

const tasks = computed(() => [...data.value.entries()].flatMap(([, tasks]) => tasks));
const taskCount = computed(() => tasks.value.length);
const show = ref(false);

const toggleShow = () => {
  show.value = !show.value;
};
const noData = computed(() => entities.value.length === 0);
const taskStore = useTaskStore();
const {completeByBatch} = taskStore;
const toast = useToast();
const completeAll = async () => {
  if (window.confirm(`确定要批量完成所有 ${title.value} 任务吗？`)) {
    try {
      const allTasks = [...data.value.entries()].flatMap(([, tasks]) => tasks);
      const count = taskCount.value;
      await completeByBatch(allTasks.map(task => task.id));
      toast.success(`批量完成 ${count} 个任务`);
    } catch (e) {
      console.error(e);
      toast.error("批量完成失败！");
    }
  }
};

</script>

<style scoped>

</style>
