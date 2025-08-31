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
  border-radius: 5%;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.5);
}
button:disabled {
  background-color: #f2f2f2;
  color: #999999;
}
button:hover {
  transform: scale(1.1);
}
</style>
