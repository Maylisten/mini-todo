<template>
  <div  class="flex flex-col gap-3">
    <VueDraggable :model-value="todayUncompletedTaskList"
                  :animation="150"
                  class="flex flex-col gap-3"
                  handle=".drag-handle"
                  ghostClass="bg-base-content/10"
                  dragClass="opacity-1"
                  group="people"
                  @update="handleDrag"
                  @add="handleDrag">
      <transition-group>
        <TodayItem v-for="task of todayUncompletedTaskList" :key="task.id" :task="task" :checked="false" :draggable="true"/>
      </transition-group>
    </VueDraggable>
    <TodayTaskAddButton/>
  </div>
</template>

<script setup lang="ts">

import {useTaskStore} from "@/store/task.ts";
import {storeToRefs} from "pinia";
import TodayItem from "@/components/today/TodayItem.vue";
import {DraggableEvent, SortableEvent, VueDraggable} from "vue-draggable-plus";
import {getBeginTimestamp} from "@/utils";
import TodayTaskAddButton from "@/components/today/TodayTaskAddButton.vue";

const todayTimestamp = getBeginTimestamp(new Date());
const taskStore = useTaskStore();
const {changeOrder} = taskStore;
const {todayUncompletedTaskList} = storeToRefs(taskStore);
const handleDrag = (event: SortableEvent) => {
  const {oldIndex, newIndex} = event as DraggableEvent<Task>;
  changeOrder(todayTimestamp, oldIndex!, todayTimestamp, newIndex!);
};

</script>

<style scoped>

</style>
