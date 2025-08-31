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

const sourceExpOptionsIndex = ref(0)
const sourceEffectOptionsIndex = ref(0)

const { deepOptions } = useDeep()
const deepOptionsIndex = ref(0)

const functionDisplay = ref('')
watchEffect(() => {
  const deep =
    deepOptions[deepOptionsIndex.value].name === 'default'
      ? '{ }'
      : `{ deep: ${deepOptions[deepOptionsIndex.value].name} }`
  const effect =
    ws.value.sourceEffectOptions[sourceEffectOptionsIndex.value].name
  functionDisplay.value = `
    watch(
        ${ws.value.sourceExpOptions[sourceExpOptionsIndex.value].name},
        ( ) => { flash('${effect} triggered watcher!') },
        ${deep}
    )
  `
})

const effectDisplay = ref('')
watchEffect(() => {
  effectDisplay.value =
    ws.value.sourceEffectOptions[sourceEffectOptionsIndex.value].name
})

const triggerMessage = ref('')

function createWatcher(exp: WatchSource, deep: DeepValue): WatchHandle {
  const options: WatchOptions = deep ? { deep } : {}
  const effect =
    ws.value.sourceEffectOptions[sourceEffectOptionsIndex.value].name
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
    ws.value.sourceExpOptions[sourceExpOptionsIndex.value].exp,
    deepOptions[deepOptionsIndex.value].value,
  )
}
watchEffect(() => {
  setUpWatcher()
})

function runEffect() {
  ws.value.sourceEffectOptions[sourceEffectOptionsIndex.value].effect()
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
      <select id="selectSourceExp" v-model.number="sourceExpOptionsIndex">
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
  <div class="params">
    <label for="selectSourceEffect">Select effect to run:</label>
    <select id="selectSourceEffect" v-model.number="sourceEffectOptionsIndex">
      <option
        v-for="(roEffectOption, index) in ws.sourceEffectOptions"
        :key="index"
        :value="index"
      >
        {{ roEffectOption.name }}
      </option>
    </select>
  </div>
  <ActionButton
    :disabled="!!triggerMessage"
    :buttonName="'Run Effect'"
    :action="runEffect"
  />
  <p class="trigger-message" v-show="triggerMessage">
    {{ triggerMessage }}
  </p>
</template>

<style scoped>
.code {
  white-space: pre;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
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
  font-weight: bold;
}
select {
  width: 17rem;
  height: 2rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  color: black;
  border: solid #888888;
  border-radius: 2%;
  padding: 0.2rem;
  font-size: 1rem;
}
@keyframes yellowfade {
  from {
    background-color: rgba(153, 223, 88, 1);
  }
  to {
    background-color: transparent;
  }
}
.trigger-message {
  padding: 2rem;
  border-radius: 50%;
  animation-name: yellowfade;
  animation-duration: 3s;
  font-weight: bold;
}
</style>
