<template>
  <div class="flex w-full flex-row items-center justify-center px-0" @click="openDialog">
    <slot></slot>
  </div>
  <Teleport to="body">
    <div class="pointer-events-none fixed top-0 left-0 flex h-screen w-screen flex-row place-content-center"
         :class="{'pointer-events-auto':open}">
      <transition enter-active-class="animate__animated animate__faster animate__fadeInDown"
                  leave-active-class="animate__animated animate__faster animate__fadeOutUp">
        <div v-if="open"
             @click.stop
             class="pointer-events-auto h-fit border-2 shadow-xl card w-[500px] mt-[50px] bg-base-100 border-base-200">
          <div class="pt-4 card-body">
            <TaskForm @close="closeDialog" :date-selectable="true"/>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import {ref} from "vue";
import TaskForm from "@/components/form/TaskForm.vue";

const open = ref(false);

const openDialog = () => {
  open.value = true;
};
const closeDialog = () => {
  open.value = false;
};

</script>

<style scoped>

</style>
