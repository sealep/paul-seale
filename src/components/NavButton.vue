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
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.5);
}
button:hover {
  transform: scale(1.01);
}
a {
  display: block;
  border-radius: 5%;
}
a.router-link-active {
  border: 1px solid white;
  box-shadow: 0 0 0 0.2rem var(--light-bluewood);
}
@media (max-width: 480px) {
  button {
    width: 5rem;
    font-size: 1rem;
  }
}
</style>
