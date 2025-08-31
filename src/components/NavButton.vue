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
  width: 10rem;
  height: 3rem;
  font-size: 1rem;
  background-color: rgb(34, 88, 168);
  color: #fefefe;
  border-radius: 5%;
  box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.5);
  margin: 2px;
}
button:hover {
  transform: scale(1.1);
}
a.router-link-active {
  background-color: green;
  box-shadow: 0 0 0rem 0.5rem rgba(153, 223, 88, 1);
  border-top: 1rem solid green;
  border-bottom: 1rem solid green;
  border-left: 0.1rem solid green;
  border-right: 0.1rem solid green;
  border-radius: 10%;
}
</style>
