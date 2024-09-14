<template>
  <div class="h-fit">
    <div class="flex w-full flex-row items-center justify-between border-b-[1px] border-base-content/40 pb-2.5">
      <div class="font-bold text-base-content/80">{{ title }}</div>
      <div v-show="tasks.length>0">
        <button class="btn btn-primary btn-outline btn-xs ml-1.5" @click="completeAll">
          <CompleteIcon/>
          批量完成
        </button>
      </div>
    </div>
    <VueDraggable :data-timestamp="timestamp"
                  :model-value="tasks"
                  :animation="150"
                  class="flex flex-col"
                  ghostClass="bg-base-content/10"
                  dragClass="border-t-[1px]"
                  group="people"
                  @update="handleDrag"
                  @add="handleDrag">
      <transition-group enter-active-class="animate__animated animate__faster animate__fadeIn"
                        leave-active-class="animate__animated animate__faster animate__fadeOut">
        <DetailTaskItem v-for="task of tasks" :key="task.id" :task="task" :timestamp="timestamp"/>
      </transition-group>
    </VueDraggable>
    <div class="mt-3">
      <TaskAddCardButton :date="new Date(timestamp)" class="mt-3"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {computed, toRefs} from "vue";
import DetailTaskItem from "@/components/detail/DetailTaskItem.vue";
import TaskAddCardButton from "@/components/form/TaskAddCardButton.vue";
import {getDateStr} from "@/utils";
import {DraggableEvent, SortableEvent, VueDraggable} from 'vue-draggable-plus';
import {useTaskStore} from "@/store/task.ts";
import CompleteIcon from "@/components/icon/CompleteIcon.vue";
import {useToast} from "vue-toastification";

const props = defineProps<{ timestamp: number, tasks: Task[] }>();
const {timestamp, tasks} = toRefs(props);
const title = computed(() => getDateStr(timestamp.value));
const taskStore = useTaskStore();
const {changeOrder, completeByBatch} = taskStore;
const toast = useToast();
const handleDrag = (event: SortableEvent) => {
  const {oldIndex, newIndex, from} = event as DraggableEvent<Task>;
  const fromTimestamp = Number(from.getAttribute("data-timestamp"));
  const toTimestamp = timestamp.value;
  changeOrder(fromTimestamp, oldIndex!, toTimestamp, newIndex!);
};
const completeAll = async () => {
  if (window.confirm("确定要批量完成这一天的所有任务吗？")) {
    try {
      const taskCount = tasks.value.length;
      await completeByBatch(tasks.value.map(task => task.id));
      toast.success(`批量完成 ${taskCount} 个任务`);
    } catch (e) {
      console.error(e);
      toast.error("批量完成失败！");
    }
  }
};

</script>

<style scoped>

</style>
