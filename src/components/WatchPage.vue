<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import useDeep, { type DeepValue } from '@/composables/useDeep'
import useWatchSource, {
  SourceType,
  type WatchSource,
} from '@/composables/useWatchSource'
import {
  computed,
  ref,
  unref,
  watch,
  watchEffect,
  type WatchHandle,
  type WatchOptions,
} from 'vue'
import type { NavButtonI } from './NavButton.vue'
import NavButton from './NavButton.vue'

const navButtons: NavButtonI[] = [
  {
    buttonName: 'Ref',
    linkName: 'WatchPageWithParam',
    params: { sourceType: `${SourceType.REF}` },
  },
  {
    buttonName: 'ShallowRef',
    linkName: 'WatchPageWithParam',
    params: { sourceType: `${SourceType.SHALLOW_REF}` },
  },

  {
    buttonName: 'Reactive',
    linkName: 'WatchPageWithParam',
    params: { sourceType: `${SourceType.REACTIVE}` },
  },

  {
    buttonName: 'ShallowReactive',
    linkName: 'WatchPageWithParam',
    params: { sourceType: `${SourceType.SHALLOW_REACTIVE}` },
  },
]

const { sourceType } = defineProps<{
  sourceType: SourceType
}>()

const watchSources = [
  useWatchSource(SourceType.REF),
  useWatchSource(SourceType.SHALLOW_REF),
  useWatchSource(SourceType.REACTIVE),
  useWatchSource(SourceType.SHALLOW_REACTIVE),
]
const ws = computed(() => watchSources[sourceType])

const sourceExpOptionIndexes = ref([0, 0, 0, 0])
const sourceEffectOptionIndexes = ref([0, 0, 0, 0])

const { deepOptions } = useDeep()
const deepOptionIndexes = ref([0, 0, 0, 0])

const functionDisplay = ref('')
watchEffect(() => {
  const deep =
    deepOptions[deepOptionIndexes.value[sourceType]].name === 'default'
      ? '{ }'
      : `{ deep: ${deepOptions[deepOptionIndexes.value[sourceType]].name} }`
  const effect =
    ws.value.sourceEffectOptions[sourceEffectOptionIndexes.value[sourceType]]
      .name
  functionDisplay.value = `watch(
  ${ws.value.sourceExpOptions[sourceExpOptionIndexes.value[sourceType]].name},
  ( ) => {
    flash('${effect} triggered watcher!')
  },
  ${deep}
)`
})

const effectDisplay = ref('')
watchEffect(() => {
  effectDisplay.value =
    ws.value.sourceEffectOptions[
      sourceEffectOptionIndexes.value[sourceType]
    ].name
})

const triggerMessage = ref('')

function createWatcher(exp: WatchSource, deep: DeepValue): WatchHandle {
  // 'sync' required as 'r.value =...' will update 'ws' which triggers
  // 'setUpWatcher' which stops the watcher before it executes the effect
  // of 'r.value ...'
  const options: WatchOptions = { deep, flush: 'pre' }
  const effect =
    ws.value.sourceEffectOptions[sourceEffectOptionIndexes.value[sourceType]]
      .name
  return watch(
    exp,
    () => {
      triggerMessage.value = `${effect} triggered watcher!`
      setTimeout(() => {
        triggerMessage.value = ''
      }, 3000)
    },
    options,
  )
}

let watcher: WatchHandle | null = null

function setUpWatcher() {
  if (watcher) {
    watcher.stop()
  }
  watcher = createWatcher(
    ws.value.sourceExpOptions[sourceExpOptionIndexes.value[sourceType]].exp,
    deepOptions[deepOptionIndexes.value[sourceType]].value,
  )
}
watchEffect(() => {
  setUpWatcher()
})

function runEffect() {
  ws.value.sourceEffectOptions[
    sourceEffectOptionIndexes.value[sourceType]
  ].effect()
}
</script>

<template>
  <div class="page">
    <div class="choice">
      <span class="choice-label">Choose a source type:</span>
      <ul>
        <li v-for="(navButton, index) in navButtons" :key="index">
          <NavButton v-bind="navButton" />
        </li>
      </ul>
    </div>
    <div class="description">
      <p>
        This demonstrates the <em>watch</em> function from the Vue Composition
        API. You can observe the behavior of the function when varying the
        source expression to be watched, the 'deep' option, and the effect to
        attempt to trigger the watcher.
      </p>
      <p>
        Note the difference in behavior when the source expression is an object
        versus when it is a getter, as well as the lack of reactivity among the
        shallow versions of the source types.
      </p>
    </div>
    <div class="code object">
      {{
        `const ${ws.sourceName} = ${ws.sourceFunction}(` +
        JSON.stringify(unref(ws.source), null, 2).replace(/\"/g, '') +
        ')'
      }}
    </div>
    <div class="code function">
      {{ functionDisplay }}
    </div>
    <div class="source-label">
      <label for="selectSourceExp">Select watch source:</label>
    </div>
    <div class="source-select">
      <select
        id="selectSourceExp"
        v-model.number="sourceExpOptionIndexes[sourceType]"
      >
        <option
          v-for="(sourceExpOption, index) in ws.sourceExpOptions"
          :key="index"
          :value="index"
        >
          {{ sourceExpOption.name }}
        </option>
      </select>
    </div>
    <div class="deep-label">
      <label for="selectDeep">Select deep option:</label>
    </div>
    <div class="deep-select">
      <select id="selectDeep" v-model.number="deepOptionIndexes[sourceType]">
        <option
          v-for="(deepOption, index) in deepOptions"
          :key="index"
          :value="index"
        >
          {{ deepOption.name }}
        </option>
      </select>
    </div>
    <div class="effect-label">
      <label for="selectSourceEffect">Select effect to run:</label>
    </div>
    <div class="effect-select">
      <select
        id="selectSourceEffect"
        v-model.number="sourceEffectOptionIndexes[sourceType]"
      >
        <option
          v-for="(sourceEffectOption, index) in ws.sourceEffectOptions"
          :key="index"
          :value="index"
        >
          {{ sourceEffectOption.name }}
        </option>
      </select>
    </div>
    <div class="run-effect">
      <ActionButton
        :disabled="!!triggerMessage"
        :buttonName="'Run Effect'"
        :action="runEffect"
      />
    </div>
    <div class="trigger-message" v-show="triggerMessage">
      {{ triggerMessage }}
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 1rem;
  display: grid;
  grid-template-columns: 20% 30% 50%;
  grid-template-areas:
    'choice choice choice'
    'description description object'
    'source-label source-select function'
    'deep-label deep-select function'
    'effect-label effect-select function'
    'run-effect trigger-message .';
  align-items: center;
}
.choice-label {
  margin-right: 1rem;
  grid-area: choice-label;
  justify-self: end;
  font-size: 1.4rem;
  /* font-weight: bold; */
}
.choice {
  grid-area: choice;
}
.description {
  margin-right: 1.5rem;
  grid-area: description;
  font-size: 1.2rem;
}
.object {
  margin-top: 1rem;
  grid-area: object;
}
.source-label {
  margin-top: 1rem;
  margin-right: 0.5rem;
  grid-area: source-label;
  justify-self: end;
}
.source-select {
  margin-top: 1rem;
  margin-right: 0.5rem;
  grid-area: source-select;
}
.deep-label {
  margin-right: 0.5rem;
  grid-area: deep-label;
  justify-self: end;
}
.deep-select {
  margin-right: 0.5rem;
  grid-area: deep-select;
}
.effect-label {
  margin-right: 0.5rem;
  grid-area: effect-label;
  justify-self: end;
}
.effect-select {
  margin-right: 0.5rem;
  grid-area: effect-select;
}
.function {
  margin-top: 1rem;
  grid-area: function;
}
.run-effect {
  margin-right: 0.5rem;
  grid-area: run-effect;
  justify-self: end;
}
@keyframes yellowfade {
  from {
    background-color: yellow;
  }
  to {
    background-color: transparent;
  }
}
.trigger-message {
  margin-left: 0.5rem;
  width: fit-content;
  grid-area: trigger-message;
  animation-name: yellowfade;
  animation-duration: 3s;
  font-weight: bold;
}
.code {
  white-space: pre;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  background-color: var(--white-old-paper);
  padding: 0.5rem;
  border: solid 2px var(--dark-grayish);
}
label {
  font-weight: bold;
}
select {
  width: 100%;
  padding-left: 0.5rem;
  height: 2rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  color: black;
  border: solid 2px var(--dark-grayish);
  font-size: 1rem;
}
ul {
  display: inline-flex;
  gap: 1rem;
  align-items: center;
  list-style-type: none;
}
p {
  margin: 0.5rem 0;
}
:deep(.nav-button) {
  width: 9rem;
  height: 2.5rem;
  font-size: 1rem;
}
@media (max-width: 640px) {
  :deep(.nav-button) {
    width: 4.5rem;
    height: 2rem;
    font-size: 0.55rem;
  }
}
:deep(.action-button) {
  width: 9rem;
  height: 2.5rem;
  font-size: 1rem;
}
@media (max-width: 640px) {
  :deep(.action-button) {
    width: 4.5rem;
    height: 2rem;
    font-size: 0.55rem;
  }
}
</style>
