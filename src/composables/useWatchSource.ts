import {
  isRef,
  reactive,
  ref,
  shallowReactive,
  shallowRef,
  type Reactive,
  type Ref,
  type ShallowReactive,
  type ShallowRef,
} from 'vue'

enum SourceType {
  REF,
  SHALLOW_REF,
  REACTIVE,
  SHALLOW_REACTIVE,
}

type RawSource = {
  n: number
  o2: {
    n2: number
    a: [number, { n3: number }]
  }
}

type Source =
  | Ref<RawSource>
  | ShallowRef<RawSource>
  | Reactive<RawSource>
  | ShallowReactive<RawSource>

/* The native WatchSource doesn't allow Reactive objects */
type WatchSource = Source | (() => Source | number)

type ExpOption = {
  name: string
  exp: WatchSource
}

type EffectOption = { name: string; effect: () => void }

function getSource(sourceType: SourceType): Source {
  const o: RawSource = {
    n: 0,
    o2: {
      n2: 0,
      a: [0, { n3: 0 }],
    },
  }
  switch (sourceType) {
    case SourceType.REF:
      return ref(o)
    case SourceType.SHALLOW_REF:
      return shallowRef(o)
    case SourceType.REACTIVE:
      return reactive(o)
    case SourceType.SHALLOW_REACTIVE:
      return shallowReactive(o)
  }
}

function getSourceName(sourceType: SourceType) {
  switch (sourceType) {
    case SourceType.REF:
      return 'r'
    case SourceType.SHALLOW_REF:
      return 'sr'
    case SourceType.REACTIVE:
      return 'ro'
    case SourceType.SHALLOW_REACTIVE:
      return 'sro'
  }
}

function isShallow(sourceType: SourceType) {
  return (
    sourceType === SourceType.SHALLOW_REACTIVE ||
    sourceType === SourceType.SHALLOW_REF
  )
}

function getRefExpOptions(
  source: Ref<RawSource> | ShallowRef<RawSource>,
  isShallow: boolean,
): ExpOption[] {
  const sourceName = getSourceName(
    isShallow ? SourceType.SHALLOW_REF : SourceType.REF,
  )
  return [
    { name: sourceName, exp: source },
    { name: `( ) => ${sourceName}`, exp: () => source },
    { name: `( ) => ${sourceName}.value`, exp: () => source.value },
    { name: `( ) => ${sourceName}.value.n`, exp: () => source.value.n },
  ]
}

function getReactiveExpOptions(
  source: Reactive<RawSource> | ShallowReactive<RawSource>,
  isShallow: boolean,
): ExpOption[] {
  const sourceName = getSourceName(
    isShallow ? SourceType.SHALLOW_REACTIVE : SourceType.REACTIVE,
  )
  return [
    {
      name: sourceName,
      exp: source,
    },
    { name: `( ) => ${sourceName}`, exp: () => source },
    { name: `( ) => ${sourceName}.n`, exp: () => source.n },
    { name: `( ) => ${sourceName}.o2.n2`, exp: () => source.o2.n2 },
  ]
}

function getSourceExpOptions(source: Source, sourceType: SourceType) {
  if (isRef(source)) {
    return getRefExpOptions(source, isShallow(sourceType))
  } else {
    return getReactiveExpOptions(source, isShallow(sourceType))
  }
}

function getRefEffectOptions(
  source: Ref<RawSource> | ShallowRef<RawSource>,
  isShallow: boolean,
): EffectOption[] {
  const sourceName = getSourceName(
    isShallow ? SourceType.SHALLOW_REF : SourceType.REF,
  )
  return [
    {
      name: `${sourceName}.value.n++`,
      effect: () => source.value.n++,
    },
  ]
}

function getReactiveEffectOptions(
  source: Reactive<RawSource> | ShallowReactive<RawSource>,
  isShallow: boolean,
): EffectOption[] {
  const sourceName = getSourceName(
    isShallow ? SourceType.SHALLOW_REACTIVE : SourceType.REACTIVE,
  )
  return [
    {
      name: `${sourceName}.n++`,
      effect: () => source.n++,
    },
  ]
}

function getSourceEffectOptions(source: Source, sourceType: SourceType) {
  if (isRef(source)) {
    return getRefEffectOptions(source, isShallow(sourceType))
  } else {
    return getReactiveEffectOptions(source, isShallow(sourceType))
  }
}

export default function useWatchSource(sourceType: SourceType) {
  const source = getSource(sourceType)
  const sourceExpOptions = getSourceExpOptions(source, sourceType)
  const sourceExpOptionsIndex = ref(0)

  const sourceEffectOptions = getSourceEffectOptions(source, sourceType)
  const sourceEffectOptionsIndex = ref(0)
  return {
    source,
    sourceExpOptions,
    sourceExpOptionsIndex,
    sourceEffectOptions,
    sourceEffectOptionsIndex,
  }
}

export {
  SourceType,
  type Source,
  type WatchSource,
  type ExpOption,
  type EffectOption,
}
