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
import type { NavButtonI } from './NavButton.vue'
import NavButton from './NavButton.vue'

interface WatchFunctionI {
  sourceType: SourceType
}

const navButtons: NavButtonI[] = [
  {
    buttonName: 'Ref',
    linkName: 'WatchPage',
    params: { sourceType: `${SourceType.REF}` },
  },
  {
    buttonName: 'ShallowRef',
    linkName: 'WatchPage',
    params: { sourceType: `${SourceType.SHALLOW_REF}` },
  },

  {
    buttonName: 'Reactive',
    linkName: 'WatchPage',
    params: { sourceType: `${SourceType.REACTIVE}` },
  },

  {
    buttonName: 'ShallowReactive',
    linkName: 'WatchPage',
    params: { sourceType: `${SourceType.SHALLOW_REACTIVE}` },
  },
]

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
        ( ) => {
          flash('${effect} triggered watcher!')
        },
        ${deep}
    )
  `.trim()
})

const effectDisplay = ref('')
watchEffect(() => {
  effectDisplay.value =
    ws.value.sourceEffectOptions[sourceEffectOptionsIndex.value].name
})

const triggerMessage = ref('')

function createWatcher(exp: WatchSource, deep: DeepValue): WatchHandle {
  // 'sync' required as 'r.value =...' will update 'ws' which triggers
  // 'setUpWatcher' which stops the watcher before it executes the effect
  // of 'r.value ...'
  const options: WatchOptions = { deep, flush: 'sync' }
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
  <div class="page">
    <div class="choice-label">Choose a source type:</div>
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
      <select id="selectSourceExp" v-model.number="sourceExpOptionsIndex">
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
    <div class="effect-label">
      <label for="selectSourceEffect">Select effect to run:</label>
    </div>
    <div class="effect-select">
      <select id="selectSourceEffect" v-model.number="sourceEffectOptionsIndex">
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
  padding: 3rem;
  display: grid;
  grid-template-columns: 30% 20% 40%;
  grid-template-areas:
    'choice-label choices choices'
    'description description object'
    'source-label source-select function'
    'deep-label deep-select function'
    'effect-label effect-select function'
    'run-effect trigger-message .';
  gap: 2rem;
  align-items: center;
}
.choice-label {
  grid-area: choice-label;
  font-size: 1.5rem;
  font-weight: bold;
  justify-self: end;
}
.choices {
  grid-area: choices;
}
.description {
  grid-area: description;
  font-size: 1.2rem;
}
.object {
  grid-area: object;
}
.source-label {
  grid-area: source-label;
  justify-self: end;
}
.source-select {
  grid-area: source-select;
}
.deep-label {
  grid-area: deep-label;
  justify-self: end;
}
.deep-select {
  grid-area: deep-select;
}
.effect-label {
  grid-area: effect-label;
  justify-self: end;
}
.effect-select {
  grid-area: effect-select;
}
.function {
  grid-area: function;
}
.run-effect {
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
  grid-area: trigger-message;
  width: fit-content;
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
  border: solid 2px var(--gray-border);
}
label {
  font-weight: bold;
}
select {
  width: 100%;
  height: 2rem;
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  color: black;
  border: solid 2px var(--gray-border);
  font-size: 1rem;
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
