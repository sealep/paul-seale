import { ref } from 'vue'

type DeepValue = number | boolean | undefined
type DeepOption = { name: string; value: DeepValue }

const deepOptions: DeepOption[] = [
  { name: 'false /* default */', value: false },
  { name: 'true', value: true },
  { name: '1', value: 1 },
  { name: '2', value: 2 },
  { name: '3', value: 3 },
  { name: '4', value: 4 },
]

export default function useDeep() {
  return { deepOptions }
}

export { type DeepValue, type DeepOption }
