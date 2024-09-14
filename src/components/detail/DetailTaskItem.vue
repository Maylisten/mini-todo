<template>
  <div v-if="!editing"
       class="relative flex h-fit w-full flex-col py-4 transition border-b-[1px] border-base-content/40 gap-1.5 group">
    <div class="flex flex-row items-center gap-2">
      <input type="checkbox" name="radio-1" class="checkbox checkbox-sm checkbox-primary"
             @change="handleCheckChange"/>
      <span class="text-sm">{{ task.title }}</span>
    </div>
    <p class="pl-7 text-xs text-base-content/60">
      {{ task.description }}
    </p>
    <div class="absolute top-0 right-0 hidden h-full w-fit flex-row items-center gap-2 group-hover:flex">
      <EditIcon class="text-2xl text-base-content/60 hover:text-primary hover:cursor-pointer" @click="showForm"/>
      <DatePicker v-model="newDate">
        <DatePickIcon class="text-2xl text-base-content/60 hover:text-primary hover:cursor-pointer"/>
      </DatePicker>
    </div>
  </div>
  <div v-else ref="form"
       class="pointer-events-auto my-2 h-fit w-full border-2 p-5 shadow-xl card bg-base-100 border-base-200">
    <TaskForm :default-task="task" :date="new Date(timestamp)" type="edit" @close="hideForm" @submitted="hideForm"
              :date-selectable="false"/>
  </div>
</template>

<script setup lang="ts">

import {nextTick, ref, toRefs, watch} from "vue";
import {useTaskStore} from "@/store/task.ts";
import EditIcon from "@/components/icon/EditIcon.vue";
import TaskForm from "@/components/form/TaskForm.vue";
import DatePickIcon from "@/components/icon/DatePickIcon.vue";
import DatePicker from "@/components/form/DatePicker.vue";

const props = defineProps<{ task: Task, timestamp: number }>();
const {task, timestamp} = toRefs(props);

const editing = ref(false);

const form = ref<HTMLDivElement>();
const showForm = () => {
  editing.value = true;
  nextTick(() => {
    const {bottom} = form.value!.getBoundingClientRect();
    if (bottom > window.innerHeight) {
      form.value?.scrollIntoView();
    }
  });
};
const hideForm = () => {
  editing.value = false;
};
const taskStore = useTaskStore();
const {complete, changeDate} = taskStore;
const handleCheckChange = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    complete(task.value.id);
  }
};
const newDate = ref(new Date(timestamp.value));
watch(newDate, (value) => {
  changeDate(task.value.id, value);
});

</script>

<style scoped>

</style>
