<script setup lang="ts">
import useSource, {
  SourceType,
  type WatchSource,
} from '@/composables/useSource'
import {
  ref,
  watch,
  watchEffect,
  type WatchHandle,
  type WatchOptions,
} from 'vue'

const {
  source,
  sourceExpOptions,
  sourceExpOptionsIndex,
  sourceEffectOptions,
  sourceEffectOptionsIndex,
} = useSource(SourceType.REF)

const deepOptions: { name: string; value: number | boolean | undefined }[] = [
  { name: 'default', value: undefined },
  { name: 'false', value: false },
  { name: 'true', value: true },
  { name: '0', value: 0 },
  { name: '1', value: 1 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
]
const deepOptionsIndex = ref(0)

const functionDisplay = ref('')
watchEffect(() => {
  const deep =
    deepOptions[deepOptionsIndex.value].name === 'default'
      ? '{ }'
      : `{ deep: ${deepOptions[deepOptionsIndex.value].name} }`
  const effect = sourceEffectOptions[sourceEffectOptionsIndex.value].name
  functionDisplay.value = `
    watch(
        ${sourceExpOptions[sourceExpOptionsIndex.value].name},
        ( ) => { console.log('${effect} triggered watcher') },
        ${deep}
    )
  `
})

const effectDisplay = ref('')
watchEffect(() => {
  effectDisplay.value = sourceEffectOptions[sourceEffectOptionsIndex.value].name
})

function createWatcher(exp: WatchSource, deep?: number | boolean): WatchHandle {
  const options: WatchOptions = deep ? { deep } : {}
  const effect = sourceEffectOptions[sourceEffectOptionsIndex.value].name
  // options.onTrigger = () => {
  //   console.log(`${effect} triggered watcher`)
  // }
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
    sourceExpOptions[sourceExpOptionsIndex.value].exp,
    deepOptions[deepOptionsIndex.value].value,
  )
}
watchEffect(() => {
  setUpWatcher()
})

function runEffect() {
  sourceEffectOptions[sourceEffectOptionsIndex.value].effect()
}
</script>

<template>
  <div class="display">
    {{ JSON.stringify(source, null, 2) }}
  </div>
  <div>
    <select id="selectRoExp" v-model.number="sourceExpOptionsIndex">
      <option
        v-for="(roExpOption, index) in sourceExpOptions"
        :key="index"
        :value="index"
      >
        {{ roExpOption.name }}
      </option>
    </select>
    <select id="selectRoEffect" v-model.number="sourceEffectOptionsIndex">
      <option
        v-for="(roEffectOption, index) in sourceEffectOptions"
        :key="index"
        :value="index"
      >
        {{ roEffectOption.name }}
      </option>
    </select>
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
  <div class="display">
    {{ functionDisplay }}
  </div>
  <div class="display">
    {{ effectDisplay }}
  </div>
  <button @click="runEffect">Run Effect</button>
</template>

<style scoped>
.display {
  white-space: pre;
  font-family: 'Courier New', Courier, monospace;
}
</style>
