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
      <button class="nav-button">{{ buttonName }}</button>
    </RouterLink>
  </div>
</template>

<style scoped>
.nav-button {
  background-color: var(--vue-pickled-bluewood);
  color: white;
  border-radius: 5%;
  box-shadow: 0 0 0.5rem 0 rgba(0, 0, 0, 0.5);
}
.nav-button:hover {
  transform: scale(1.01);
}
a {
  display: block;
  border-radius: 5%;
}
a.router-link-active {
  border: 0.2rem solid white;
  box-shadow: 0 0 0 0.2rem var(--light-bluewood);
}
</style>
