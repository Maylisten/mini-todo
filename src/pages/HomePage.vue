<template>
  <div>Home</div>
</template>

<script setup lang="ts">
const sayHello = async () => {
  const str = await window.api.test.sayHello();
  console.log(str);
};
sayHello();
</script>

<style scoped lang="less"></style>
