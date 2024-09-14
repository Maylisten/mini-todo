<template>
  <div class="relative w-full h-fit flex flex-col items-center justify-center overflow-hidden text-nowrap">
    <div class="text-center text-base font-bold">{{ monthDay }}</div>
    <div class="text-xs font-bold">{{ weekDay }}</div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import {ref} from "vue";
import {getCNDay} from "@/utils";

const monthDay = ref(dayjs().date());
const weekDay = ref(`周${getCNDay(dayjs().day())}`);

</script>

<style scoped>

</style>
