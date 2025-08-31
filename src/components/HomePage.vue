<script setup lang="ts">
import { SourceType } from '@/composables/useWatchSource'
import type { NavButtonI } from '@/components/NavButton.vue'
import NavBar from './NavBar.vue'

const navButtons: NavButtonI[] = [
  {
    buttonName: 'Watch',
    linkName: 'WatchPage',
    //  params: { sourceType: `${SourceType.REF}` },
  },
]
</script>

<template>
  <NavBar :navButtons="navButtons" />
  <h1>Welcome to Paul Seale' personal website!</h1>
</template>

<style scoped></style>
