<script setup lang="ts">
/*
 *****************************************************************************
 * A navigation button routes to a page.
 * We opt the button out of the tab sequence because it is redundant
 * with the underlying tabable anchor element.
 *****************************************************************************
 */
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
