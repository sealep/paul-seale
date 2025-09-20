<script setup lang="ts">
/*
 *****************************************************************************
 * An action button executes an event.
 *****************************************************************************
 */
export interface ActionButtonI {
  buttonName: string
  action: () => void
}

const { buttonName, action } = defineProps<ActionButtonI>()
</script>

<template>
  <button class="action-button" @click="action">{{ buttonName }}</button>
</template>

<style src="@/assets/styles/ActionButton.css" scoped></style>
