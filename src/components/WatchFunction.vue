<script setup lang="ts">
import ActionButton from '@/ActionButton.vue'
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

interface WatchFunctionI {
  sourceType: SourceType
}

const { sourceType } = defineProps<WatchFunctionI>()

const ws = computed(() => useWatchSource(sourceType))

const { deepOptions, deepOptionsIndex } = useDeep()

const functionDisplay = ref('')
watchEffect(() => {
  const deep =
    deepOptions[deepOptionsIndex.value].name === 'default'
      ? '{ }'
      : `{ deep: ${deepOptions[deepOptionsIndex.value].name} }`
  const effect =
    ws.value.sourceEffectOptions[ws.value.sourceEffectOptionsIndex.value].name
  functionDisplay.value = `
    watch(
        ${ws.value.sourceExpOptions[ws.value.sourceExpOptionsIndex.value].name},
        ( ) => { console.log('${effect} triggered watcher') },
        ${deep}
    )
  `
})

const effectDisplay = ref('')
watchEffect(() => {
  effectDisplay.value =
    ws.value.sourceEffectOptions[ws.value.sourceEffectOptionsIndex.value].name
})

function createWatcher(exp: WatchSource, deep: DeepValue): WatchHandle {
  const options: WatchOptions = deep ? { deep } : {}
  const effect =
    ws.value.sourceEffectOptions[ws.value.sourceEffectOptionsIndex.value].name
  return watch(
    exp,
    () => {
      console.log(`${effect} triggered watcher`)
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
    ws.value.sourceExpOptions[ws.value.sourceExpOptionsIndex.value].exp,
    deepOptions[deepOptionsIndex.value].value,
  )
}
watchEffect(() => {
  setUpWatcher()
})

function runEffect() {
  ws.value.sourceEffectOptions[ws.value.sourceEffectOptionsIndex.value].effect()
}
</script>

<template>
  <div class="code">
    {{
      `const ${ws.sourceName} = ${ws.sourceFunction}(` +
      JSON.stringify(unref(ws.source), null, 2).replace(/\"/g, '') +
      ')'
    }}
  </div>
  <div>
    <div class="params">
      <label for="selectSourceExp">Select watch source:</label>
      <select
        id="selectSourceExp"
        v-model.number="ws.sourceExpOptionsIndex.value"
      >
        <option
          v-for="(roExpOption, index) in ws.sourceExpOptions"
          :key="index"
          :value="index"
        >
          {{ roExpOption.name }}
        </option>
      </select>
      <label for="selectDeep">Select deep option:</label>
      <select id="selectDeep" v-model.number="deepOptionsIndex">
        <option
          v-for="(deepOption, index) in deepOptions"
          :key="index"
          :value="index"
        >
          {{ deepOption.name }}
        </option>
      </select>
    </div>
  </div>
  <div class="code">
    {{ functionDisplay }}
  </div>
  <select
    id="selectRoEffect"
    v-model.number="ws.sourceEffectOptionsIndex.value"
  >
    <option
      v-for="(roEffectOption, index) in ws.sourceEffectOptions"
      :key="index"
      :value="index"
    >
      {{ roEffectOption.name }}
    </option>
  </select>
  <ActionButton :buttonName="'Run Effect'" :action="runEffect" />
  <!-- <button @click="runEffect">Run Effect</button> -->
</template>

<style scoped>
.code {
  white-space: pre;
  font-family: 'Courier New', Courier, monospace;
  background-color: rgb(201, 229, 229);
  padding: 1.5rem;
  border: solid #888888;
  border-radius: 2%;
}
.params {
  display: flex;
  gap: 1rem;
  align-items: center;
}
label {
  font-weight: 600;
}
select {
  width: 12rem;
  height: 2rem;
  font-family: 'Courier New', Courier, monospace;
  border: solid #888888;
  border-radius: 2%;
  padding: 0.2rem;
  font-size: 1rem;
}
</style>
