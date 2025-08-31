<script setup lang="ts">
export interface ActionButtonI {
  buttonName: string
  action: () => void
}

const { buttonName, action } = defineProps<ActionButtonI>()
</script>

<template>
  <button @click="action">{{ buttonName }}</button>
</template>

<style scoped>
button {
  width: 8rem;
  height: 2rem;
  font-size: 1rem;
  background-color: rgb(158, 182, 218);
  color: #09232e;
  border-radius: 5%;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.5);
}
</style>
