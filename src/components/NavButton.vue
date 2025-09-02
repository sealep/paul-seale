<script setup lang="ts">
import { RouterLink, type RouteParamsGeneric } from 'vue-router'

export interface NavButtonI {
  buttonName: string
  linkName: string
  params?: RouteParamsGeneric
}

const { buttonName, linkName, params } = defineProps<NavButtonI>()
</script>

<template>
  <div>
    <RouterLink :to="{ name: linkName, params }">
      <button>{{ buttonName }}</button>
    </RouterLink>
  </div>
</template>

<style scoped>
button {
  width: 9rem;
  height: 2.5rem;
  font-size: 1rem;
  background-color: var(--vue-pickled-bluewood);
  color: white;
  border-radius: 5%;
  box-shadow: 0 0.2rem 0.2rem 0 rgba(0, 0, 0, 0.5);
}
button:hover {
  transform: scale(1.1);
}
a {
  display: block;
  border-radius: 5%;
}
a.router-link-active {
  background-color: var(--light-bluewood);
  padding: 0.2rem;
}
</style>
