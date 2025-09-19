<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface NavButtonI {
  buttonName: string
  linkName: string
}

const { buttonName, linkName } = defineProps<NavButtonI>()
</script>

<template>
  <RouterLink :to="{ name: linkName }">
    <button tabindex="-1">{{ buttonName }}</button>
  </RouterLink>
</template>

<style src="@/assets/styles/NavButton.css" scoped></style>
