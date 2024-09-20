<template>
  <div class="w-screen h-screen overflow-hidden flex flex-col">
    <div class="h-[30px] w-full flex flex-row justify-end items-center draggable px-1 text-xl gap-1.5">
      <MainButton/>
      <ThemeButton class="scale-75 no-draggable"/>
    </div>
    <div class="flex-1 overflow-hidden">
      <Simplebar class="h-full">
        <div class="flex-1 px-5">
          <TodayList/>
        </div>
      </Simplebar>
    </div>
  </div>
</template>

<script setup lang="ts">
import ThemeButton from "@/components/button/ThemeButton.vue";
import MainButton from "@/components/button/MainButton.vue";
import TodayList from "@/components/today/TodayList.vue";
import Simplebar from "simplebar-vue";
</script>

<style scoped>

</style>
