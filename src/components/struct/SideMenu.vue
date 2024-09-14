<template>
  <ul class="h-full w-full text-2xl menu bg-base-200 gap-1.5 pb-5">
    <li v-for="menu of mainMenuList" :key="menu.path">
      <RouterLink :to="menu.path" class="group">
        <Component :is="menu.meta?.iconComp" class="dark:group-[.active]:text-primary"/>
      </RouterLink>
    </li>
    <li>
      <TaskAddDialogButton>
        <button class="btn btn-circle btn-primary btn-sm" @click="openTodoAddDialog">
          <AddIcon class="text-2xl font-bold"/>
        </button>
      </TaskAddDialogButton>
    </li>
    <li class="w-full mt-auto">
      <PinButton/>
    </li>
    <li class="w-full">
      <ThemeButton class="py-1.5"/>
    </li>
  </ul>
</template>

<script setup lang="ts">
import ListIcon from "@/components/icon/ListIcon.vue";
import CalendarIcon from "@/components/icon/CalendarIcon.vue";
import TimelineIcon from "@/components/icon/TimelineIcon.vue";
import CompleteIcon from "@/components/icon/CompleteIcon.vue";
import {mainMenuList} from "@/router/mainMenu.ts";
import AddIcon from "@/components/icon/AddIcon.vue";
import {ref} from "vue";
import TaskAddDialogButton from "@/components/form/TaskAddDialogButton.vue";
import ThemeButton from "@/components/button/ThemeButton.vue";
import PinButton from "@/components/button/PinButton.vue";
import DayIcon from "@/components/icon/DayIcon.vue";

defineOptions({
  components: {
    ListIcon,
    CalendarIcon,
    TimelineIcon,
    CompleteIcon,
    DayIcon
  },
});

const todoAddDialog = ref<null | HTMLDialogElement>(null);

const openTodoAddDialog = () => {
  if (todoAddDialog.value) {
    todoAddDialog.value.showModal();
  }
};
// const closeTodoAddDialog = () => {
//   if (todoAddDialog.value) {
//     todoAddDialog.value.close();
//   }
// };
</script>

<style scoped>
</style>
