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
  background-color: var(--steely-blue);
  color: black;
  border: 1px solid black;
  border-radius: 5%;
  box-shadow: 0 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.5);
}
button:disabled {
  background-color: var(--disabled-gray-light);
  color: var(--disabled-gray-dark);
}
button:hover {
  transform: scale(1.01);
}
</style>
