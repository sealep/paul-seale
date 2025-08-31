<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavButton, { type NavButtonI } from '@/components/NavButton.vue'

import { SourceType } from '@/composables/useWatchSource'
const navButtons: NavButtonI[] = [
  {
    buttonName: 'Ref',
    linkName: 'WatchFunction',
    params: { sourceType: `${SourceType.REF}` },
  },
  {
    buttonName: 'ShallowRef',
    linkName: 'WatchFunction',
    params: { sourceType: `${SourceType.SHALLOW_REF}` },
  },

  {
    buttonName: 'Reactive',
    linkName: 'WatchFunction',
    params: { sourceType: `${SourceType.REACTIVE}` },
  },

  {
    buttonName: 'ShallowReactive',
    linkName: 'WatchFunction',
    params: { sourceType: `${SourceType.SHALLOW_REACTIVE}` },
  },
]
</script>

<template>
  <div class="page">
    <div class="chooser">
      <span>Choose a source type:</span>
      <ul>
        <li v-for="(navButton, index) in navButtons" :key="index">
          <NavButton v-bind="navButton" />
        </li>
      </ul>
    </div>
    <RouterView />
  </div>
</template>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.chooser {
  margin-top: 1rem;
  display: flex;
  align-items: center;
}
span {
  font-weight: bold;
  font-size: 1.5rem;
}
ul {
  display: flex;
  gap: 1rem;
  list-style-type: none;
}
</style>
