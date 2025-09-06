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
    <div class="choice-label">Choose a source type:</div>
    <div class="choice">
      <ul class="choice-buttons">
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

<style src="@/assets/styles/WatchPage.css" scoped></style>
