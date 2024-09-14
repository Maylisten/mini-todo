<template>
  <div
      class="flex h-fit w-full flex-col transition">
    <div class="flex flex-row items-center gap-2 w-full" @dblclick="handleDbClick">
      <DragIcon v-if="draggable" class="drag-handle text-base hover:cursor-move"/>
      <input type="checkbox" name="radio-1" class="checkbox checkbox-sm checkbox-primary"
             @change="handleCheckChange" :value="checked"/>
      <span v-if="!editing" class="text-md py-0.5" :class="{'line-through': checked,}">{{ task.title }}</span>
      <input v-else type="text" placeholder="请输入任务标题" v-focus v-model="editingTitle" @blur="completeEdit"
             @keydown.enter="completeEdit"
             class="input input-bordered pl-0 border-0 border-b-2 rounded-none  focus:outline-none w-full input-sm text-base"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, toRefs} from "vue";
import {useTaskStore} from "@/store/task.ts";
import DragIcon from "@/components/icon/DragIcon.vue";

const props = withDefaults(defineProps<{
  task: Task,
  checked: boolean,
  edit?: boolean,
  draggable?: boolean,
}>(), {edit: false, draggable: true});
const {task, checked, edit} = toRefs(props);
const editing = ref(edit.value);

const taskStore = useTaskStore();
const {update, complete, restore} = taskStore;

const editingTitle = ref("");

const handleCheckChange = () => {
  if (!checked.value) {
    complete(task.value.id);
  } else {
    restore(task.value.id);
  }
};

const handleDbClick = () => {
  if (!checked.value) {
    editing.value = true;
    editingTitle.value = task.value.title;
  }
};
let editingLock = false;
const completeEdit = async () => {
  if (editingLock) {
    return;
  }
  try {
    editingLock = true;
    if (editingTitle.value) {
      await update({...task.value, title: editingTitle.value});
    }
    editing.value = false;
  } catch (e) {
    console.error(e);
  } finally {
    editingLock = false;
  }
};

</script>

<style scoped>

</style>
