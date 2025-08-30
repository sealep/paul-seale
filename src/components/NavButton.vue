<script setup lang="ts">
import { RouterLink, type RouteParamsGeneric } from 'vue-router'

export interface NavButtonI {
  buttonName: string
  linkName: string
  params: RouteParamsGeneric
}

const { buttonName, linkName, params } = defineProps<NavButtonI>()
</script>

<template>
  <RouterLink :to="{ name: linkName, params }">
    <button>{{ buttonName }}</button>
  </RouterLink>
</template>

<style scoped></style>
