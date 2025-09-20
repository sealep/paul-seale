/*
 ******************************************************************************
 * The deep option is in the options object parameter to the 'watch' function.
 ******************************************************************************
 */
type DeepValue = number | boolean | undefined
type DeepOption = { name: string; val: DeepValue }

const deepOptions: DeepOption[] = [
  { name: 'default', val: undefined },
  { name: 'false', val: false },
  { name: 'true', val: true },
  { name: '1', val: 1 },
  { name: '2', val: 2 },
  { name: '3', val: 3 },
  { name: '4', val: 4 },
] as const

export default function useDeep() {
  return { deepOptions }
}

export { type DeepValue, type DeepOption }
