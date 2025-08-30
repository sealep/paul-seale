<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import type { NavButtonI } from '@/components/NavButton.vue'
import { SourceType } from '@/composables/useWatchSource'
const navButtons: NavButtonI[] = [
  {
    buttonName: 'Watch Ref',
    linkName: 'WatchFunction',
    params: { sourceType: `${SourceType.REF}` },
  },
  {
    buttonName: 'Watch ShallowRef',
    linkName: 'WatchFunction',
    params: { sourceType: `${SourceType.SHALLOW_REF}` },
  },

  {
    buttonName: 'Watch Reactive',
    linkName: 'WatchFunction',
    params: { sourceType: `${SourceType.REACTIVE}` },
  },

  {
    buttonName: 'Watch ShallowReactive',
    linkName: 'WatchFunction',
    params: { sourceType: `${SourceType.SHALLOW_REACTIVE}` },
  },
]
</script>

<template>
  <NavBar :navButtons="navButtons" />
  <RouterView />
</template>

<style>
body {
  background-color: #a4e6e2;
  margin: 0;
}
</style>
