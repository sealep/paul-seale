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
  background-color: var(--action-button);
  border-radius: 5%;
  box-shadow: 0 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.5);
}
button:disabled {
  background-color: var(--disabled-bg);
  color: var(--disabled-text);
}
button:hover {
  transform: scale(1.1);
}
</style>
