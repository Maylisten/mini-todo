<template>
  <div class="h-fit w-full">
    <div v-if="!cardShow" @click="showCard"
         class="flex w-fit flex-row items-center gap-1 transition text-base-content/60 hover:text-primary hover:cursor-pointer">
      <AddIcon class="text-2xl"/>
      <span>添加任务</span>
    </div>
    <transition enter-active-class="animate__animated animate__fadeIn">
      <div v-if="cardShow" ref="form"
           class="pointer-events-auto h-fit w-full border-2 p-5 shadow-xl card bg-base-100 border-base-200">
        <TaskForm :date="date" @close="hideCard" :date-selectable="false"/>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import AddIcon from "@/components/icon/AddIcon.vue";
import {nextTick, ref, toRefs} from "vue";
import TaskForm from "@/components/form/TaskForm.vue";

const props = defineProps<{ date: Date }>();
const {date} = toRefs(props);

const cardShow = ref(false);

const form = ref<HTMLDivElement>();

const showCard = () => {
  cardShow.value = true;
  nextTick(() => {
    const {bottom} = form.value!.getBoundingClientRect();
    if (bottom > window.innerHeight) {
      form.value?.scrollIntoView();
    }
  });
};

const hideCard = () => {
  cardShow.value = false;
};

</script>

<style scoped>

</style>
