<script setup lang="ts">
import ActionButton from '@/components/ActionButton.vue'
import useDeep, { type DeepValue } from '@/composables/useDeep'
import useWatchSource, { SourceType, type WatchSource } from '@/composables/useWatchSource'
import {
  computed,
  ref,
  toValue,
  unref,
  watch,
  watchEffect,
  type MaybeRefOrGetter,
  type WatchHandle,
  type WatchOptions,
} from 'vue'

const watchSources = [
  useWatchSource(SourceType.REF),
  useWatchSource(SourceType.SHALLOW_REF),
  useWatchSource(SourceType.REACTIVE),
  useWatchSource(SourceType.SHALLOW_REACTIVE),
]
const sourceType = ref(SourceType.REF)
const ws = computed(() => watchSources[sourceType.value])

const sourceExpOptionIndexes = ref([0, 0, 0, 0])
const sourceEffectOptionIndexes = ref([0, 0, 0, 0])

const { deepOptions } = useDeep()
const deepOptionIndexes = ref([0, 0, 0, 0])

const functionDisplay = ref('')
watchEffect(() => {
  const deep =
    deepOptions[deepOptionIndexes.value[sourceType.value]].name === 'default'
      ? '{ }'
      : `{ deep: ${deepOptions[deepOptionIndexes.value[sourceType.value]].name} }`
  const effect =
    ws.value.sourceEffectOptions[sourceEffectOptionIndexes.value[sourceType.value]].name
  functionDisplay.value = `watch(
  ${ws.value.sourceExpOptions[sourceExpOptionIndexes.value[sourceType.value]].name},
  ( ) => {
    flash('${effect}')
  },
  ${deep}
)`
})

const triggerMessage = ref('')

function createWatcher(exp: MaybeRefOrGetter<WatchSource>, deep: DeepValue): WatchHandle {
  const options: WatchOptions = { deep }
  const effect =
    ws.value.sourceEffectOptions[sourceEffectOptionIndexes.value[sourceType.value]].name
  return watch(
    toValue(exp),
    () => {
      triggerMessage.value = `${effect}`
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
    ws.value.sourceExpOptions[sourceExpOptionIndexes.value[sourceType.value]].exp,
    deepOptions[deepOptionIndexes.value[sourceType.value]].val,
  )
}
watchEffect(() => {
  setUpWatcher()
})

function runEffect() {
  ws.value.sourceEffectOptions[sourceEffectOptionIndexes.value[sourceType.value]].effect()
}
</script>

<template>
  <section id="watch-page">
    <fieldset id="source-choice">
      <legend id="choice-legend">Choose a source type:</legend>

      <label id="ref-label" for="ref-radio">
        <input
          id="ref-radio"
          type="radio"
          name="source-choice"
          :value="SourceType.REF"
          v-model="sourceType"
        />
        Ref
      </label>

      <label id="sref-label" for="sref-radio">
        <input
          id="sref-radio"
          type="radio"
          name="source-choice"
          :value="SourceType.SHALLOW_REF"
          v-model="sourceType"
        />
        Shallow Ref
      </label>

      <label id="reactive-label" for="reactive-radio">
        <input
          id="reactive-radio"
          type="radio"
          name="source-choice"
          :value="SourceType.REACTIVE"
          v-model="sourceType"
        />
        Reactive
      </label>

      <label id="sreactive-label" for="sreactive-radio">
        <input
          id="sreactive-radio"
          type="radio"
          name="source-choice"
          :value="SourceType.SHALLOW_REACTIVE"
          v-model="sourceType"
        />
        Shallow Reactive
      </label>
    </fieldset>

    <article id="watch-desc">
      <p>
        This demonstrates the
        <em>watch</em>
        function from the Vue Composition API. You can observe the behavior of the function when
        varying the source expression to be watched, the 'deep' option, and the effect to attempt to
        trigger the watcher.
      </p>
      <p>
        Note the difference in behavior when the source expression is an object versus when it is a
        getter, as well as the lack of reactivity among the shallow versions of the source types.
      </p>
    </article>

    <code id="watch-object">
      {{
        `const ${ws.sourceName} = ${ws.sourceFunction}(` +
        JSON.stringify(unref(ws.source), null, 2).replace(/\"/g, '') +
        ')'
      }}
    </code>

    <code id="watch-function">
      {{ functionDisplay }}
    </code>

    <fieldset id="function-options">
      <label id="source-label" for="source-select">Select watch source:</label>
      <select id="source-select" v-model.number="sourceExpOptionIndexes[sourceType]">
        <option v-for="(sourceExpOption, index) in ws.sourceExpOptions" :key="index" :value="index">
          {{ sourceExpOption.name }}
        </option>
      </select>

      <label id="deep-label" for="deep-select">Select deep option:</label>
      <select id="deep-select" v-model.number="deepOptionIndexes[sourceType]">
        <option v-for="(deepOption, index) in deepOptions" :key="index" :value="index">
          {{ deepOption.name }}
        </option>
      </select>

      <label id="effect-label" for="effect-select">Select effect to run:</label>
      <select id="effect-select" v-model.number="sourceEffectOptionIndexes[sourceType]">
        <option
          v-for="(sourceEffectOption, index) in ws.sourceEffectOptions"
          :key="index"
          :value="index"
        >
          {{ sourceEffectOption.name }}
        </option>
      </select>
    </fieldset>

    <section id="run-effect">
      <ActionButton
        id="effect-button"
        :disabled="!!triggerMessage"
        :buttonName="'Run Effect'"
        :action="runEffect"
      />
      <p id="trigger-message" v-show="triggerMessage">{{ triggerMessage }}</p>
    </section>
  </section>
</template>

<style src="@/assets/styles/WatchPage.css" scoped></style>
