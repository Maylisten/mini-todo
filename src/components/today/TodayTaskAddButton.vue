<template>
  <div class="h-fit w-full">
    <div v-if="!inputShow" @click="showInput"
         class="flex w-fit flex-row items-center gap-0.5 transition text-base-content/60 hover:text-primary hover:cursor-pointer">
      <AddIcon class="text-xl"/>
      <span class="text-base">添加任务</span>
    </div>
    <div
        ref="input"
        v-if="inputShow"
        class="flex h-fit w-full flex-col py-4 transition gap-1.5">
      <div class="flex flex-row items-center gap-2">
        <DragIcon class="text-base"/>
        <input type="checkbox" name="radio-1" class="checkbox checkbox-sm checkbox-primary pointer-events-none"/>
        <input type="text" placeholder="请输入任务标题" v-focus v-model="title" @blur="completeEdit"
               @keydown.enter="completeEdit"
               class="input input-bordered pl-0 border-0 border-b-2 rounded-none  focus:outline-none w-full input-sm text-base"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddIcon from "@/components/icon/AddIcon.vue";
import {ref} from "vue";
import {useTaskStore} from "@/store/task.ts";
import DragIcon from "@/components/icon/DragIcon.vue";
import {getBeginTimestamp} from "@/utils";

const inputShow = ref(false);

const title = ref("");

const showInput = () => {
  inputShow.value = true;
};

const taskStore = useTaskStore();
const {save} = taskStore;

let editingLock = false;
const completeEdit = async () => {
  if (editingLock) {
    return;
  }
  try {
    editingLock = true;
    inputShow.value = false;
    if (title.value) {
      await save({title: title.value, description: ""}, getBeginTimestamp(new Date()));
      title.value = "";
    }
  } catch (e) {
    console.error(e);
  } finally {
    editingLock = false;
  }
};

</script>

<style scoped>

</style>
