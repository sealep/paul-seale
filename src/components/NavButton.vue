<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface NavButtonI {
  buttonName: string
  linkName: string
}

const { buttonName, linkName } = defineProps<NavButtonI>()
</script>

<template>
  <div>
    <RouterLink :to="{ name: linkName }">
      <button tabindex="-1">{{ buttonName }}</button>
    </RouterLink>
  </div>
</template>

<style src="@/assets/styles/NavButton.css" scoped></style>
