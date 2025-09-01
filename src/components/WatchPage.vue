<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavButton, { type NavButtonI } from '@/components/NavButton.vue'

import { SourceType } from '@/composables/useWatchSource'
const navButtons: NavButtonI[] = [
  {
    buttonName: 'ShallowRef',
    linkName: 'WatchFunction',
    params: { sourceType: `${SourceType.SHALLOW_REF}` },
  },
  {
    buttonName: 'Ref',
    linkName: 'WatchFunction',
    params: { sourceType: `${SourceType.REF}` },
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
    <p class="description">
      This demonstrates the usage of the 'watch' function from the Vue
      Composition API. You can observe the behavior of the function when varying
      the target object to be watched, and the 'deep' option.
    </p>
    <RouterView />
  </div>
</template>

<style scoped>
.description {
  position: absolute;
  left: 7%;
  top: 23%;
  font-size: 1.2rem;
  width: 20%;
}
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
.chooser span {
  font-weight: bold;
  font-size: 1.2rem;
}
ul {
  display: flex;
  gap: 1rem;
  list-style-type: none;
}
</style>
