<template>
  <div class="relative flex h-screen w-screen flex-row">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
:deep(.simplebar-scrollbar::before) {
  background-color: oklch(var(--bc));
}
</style>
