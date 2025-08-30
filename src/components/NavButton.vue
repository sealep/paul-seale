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
    <button>{{ buttonName }}</button>
  </RouterLink>
</template>

<style scoped></style>
