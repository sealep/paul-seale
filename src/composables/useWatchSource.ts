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
type WatchSource = object | (() => object | number)

type ExpOption = {
  name: string
  exp: WatchSource
}

type EffectOption = { name: string; effect: () => void }

function newRawObj() {
  const o: RawSource = {
    n: 0,
    o2: {
      n2: 0,
      a: [0, { n3: 0 }],
    },
  }
  return o
}

function getSource(sourceType: SourceType): Source {
  switch (sourceType) {
    case SourceType.REF:
      return ref(newRawObj())
    case SourceType.SHALLOW_REF:
      return shallowRef(newRawObj())
    case SourceType.REACTIVE:
      return reactive(newRawObj())
    case SourceType.SHALLOW_REACTIVE:
      return shallowReactive(newRawObj())
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

function getSourceFunction(sourceType: SourceType) {
  switch (sourceType) {
    case SourceType.REF:
      return 'ref'
    case SourceType.SHALLOW_REF:
      return 'shallowRef'
    case SourceType.REACTIVE:
      return 'reactive'
    case SourceType.SHALLOW_REACTIVE:
      return 'shallowReactive'
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
    { name: `${sourceName}.value`, exp: source.value },
    { name: `${sourceName}.value.o2`, exp: source.value.o2 },
    { name: `${sourceName}.value.o2.a`, exp: source.value.o2.a },
    {
      name: `${sourceName}.value.o2.a[1]`,
      exp: source.value.o2.a[1],
    },
    { name: `( ) => ${sourceName}`, exp: () => source },
    { name: `( ) => ${sourceName}.value`, exp: () => source.value },
    { name: `( ) => ${sourceName}.value.n`, exp: () => source.value.n },
    { name: `( ) => ${sourceName}.value.o2`, exp: () => source.value.o2 },
    { name: `( ) => ${sourceName}.value.o2.n2`, exp: () => source.value.o2.n2 },
    { name: `( ) => ${sourceName}.value.o2.a`, exp: () => source.value.o2.a },
    {
      name: `( ) => ${sourceName}.value.o2.a[0]`,
      exp: () => source.value.o2.a[0],
    },
    {
      name: `( ) => ${sourceName}.value.o2.a[1]`,
      exp: () => source.value.o2.a[1],
    },
    {
      name: `( ) => ${sourceName}.value.o2.a[1].n3`,
      exp: () => source.value.o2.a[1].n3,
    },
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
    { name: sourceName, exp: source },
    { name: `${sourceName}.o2`, exp: source.o2 },
    { name: `${sourceName}o2.a`, exp: source.o2.a },
    {
      name: `${sourceName}.o2.a[1]`,
      exp: source.o2.a[1],
    },
    { name: `( ) => ${sourceName}`, exp: () => source },
    { name: `( ) => ${sourceName}.n`, exp: () => source.n },
    { name: `( ) => ${sourceName}.o2`, exp: () => source.o2 },
    { name: `( ) => ${sourceName}.o2.n2`, exp: () => source.o2.n2 },
    { name: `( ) => ${sourceName}.o2.a`, exp: () => source.o2.a },
    {
      name: `( ) => ${sourceName}.o2.a[0]`,
      exp: () => source.o2.a[0],
    },
    {
      name: `( ) => ${sourceName}.o2.a[1]`,
      exp: () => source.o2.a[1],
    },
    {
      name: `( ) => ${sourceName}.o2.a[1].n3`,
      exp: () => source.o2.a[1].n3,
    },
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
      name: `${sourceName}.value = { /* clone */ }`,
      effect: () => (source.value = newRawObj()),
    },
    {
      name: `${sourceName}.value.n++`,
      effect: () => source.value.n++,
    },
    {
      name: `${sourceName}.value.o2.n2++`,
      effect: () => source.value.o2.n2++,
    },
    {
      name: `${sourceName}.value.o2.a[0]++`,
      effect: () => source.value.o2.a[0]++,
    },
    {
      name: `${sourceName}.value.o2.a[1].n3++`,
      effect: () => source.value.o2.a[1].n3++,
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
    {
      name: `${sourceName}.o2.n2++`,
      effect: () => source.o2.n2++,
    },
    {
      name: `${sourceName}.o2.a[0]++`,
      effect: () => source.o2.a[0]++,
    },
    {
      name: `${sourceName}.o2.a[1].n3++`,
      effect: () => source.o2.a[1].n3++,
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
  const sourceName = getSourceName(sourceType)
  const sourceFunction = getSourceFunction(sourceType)
  const sourceExpOptions = getSourceExpOptions(source, sourceType)

  const sourceEffectOptions = getSourceEffectOptions(source, sourceType)
  return {
    source,
    sourceName,
    sourceFunction,
    sourceExpOptions,
    sourceEffectOptions,
  }
}

export {
  SourceType,
  type Source,
  type WatchSource,
  type ExpOption,
  type EffectOption,
}
