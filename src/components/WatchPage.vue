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
    <div class="choose-label">Choose a source type:</div>
    <div class="choices">
      <ul>
        <li v-for="(navButton, index) in navButtons" :key="index">
          <NavButton v-bind="navButton" />
        </li>
      </ul>
    </div>
    <div class="description">
      <p>
        This demonstrates the usage of the <em>watch</em> function from the Vue
        Composition API. You can observe the behavior of the function when
        varying the source expression to be watched, the 'deep' option, and the
        effect to trigger the watcher.
      </p>
      <p>
        Note the difference in behavior when the source expression is an object
        versus when it is a getter, as well as the lack of reactivity among the
        shallow versions of the source types.
      </p>
    </div>
    <div class="watch">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr auto auto 1fr;
  grid-template-areas:
    '. choose-label choices .'
    'description watch watch watch';
  gap: 1rem;
}
.choose-label {
  grid-area: choose-label;
  font-size: 1.5rem;
  font-weight: bold;
  align-self: center;
  padding: 0 1rem;
}
.choices {
  grid-area: choices;
}
.description {
  grid-area: description;
  font-size: 1.2rem;
}
.watch {
  grid-area: watch;
}
ul {
  display: flex;
  gap: 1rem;
  list-style-type: none;
}
p {
  margin: 1rem;
}
</style>
