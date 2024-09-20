<template>
  <div class="relative flex h-screen w-screen flex-row">
    <div class="absolute top-0 left-0 z-20 w-full bg-transparent h-[30px] draggable"></div>
    <div class="h-full w-[70px] bg-base-200 pt-[25px]">
      <SideMenu/>
    </div>
    <div class="flex h-full flex-1 flex-col">
      <div class="w-full h-[40px]">
        <PageHeader/>
      </div>
      <div class="relative w-full flex-1">
        <Simplebar style="height: 100%" className="simplebar-scrollbar">
          <div class="h-fit w-full py-[0px] px-[50px]">
            <router-view/>
          </div>
        </Simplebar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideMenu from "@/components/struct/SideMenu.vue";
import PageHeader from "@/components/struct/PageHeader.vue";
import Simplebar from "simplebar-vue";
</script>

<style scoped>
:deep(.simplebar-scrollbar::before) {
  background-color: oklch(var(--bc));
}
</style>
