<template>
  <div class="h-fit w-full">
    <CollapseDetail title="过期" :data="expiredBeginTimestampTaskMap"/>
  </div>
</template>

<script setup lang="ts">
import CollapseDetail from "@/components/detail/CollapseDetail.vue";
import {useTaskStore} from "@/store/task.ts";
import {storeToRefs} from "pinia";

const taskStore = useTaskStore();
const {expiredBeginTimestampTaskMap} = storeToRefs(taskStore);
</script>

<style scoped>

</style>
