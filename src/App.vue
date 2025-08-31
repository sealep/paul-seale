<script setup lang="ts">
import type { NavButtonI } from '@/components/NavButton.vue'
import NavBar from '@/components/NavBar.vue'
import { RouterView } from 'vue-router'

const navButtons: NavButtonI[] = [
  {
    buttonName: 'Home',
    linkName: 'HomePage',
  },
  {
    buttonName: 'Watch',
    linkName: 'WatchPage',
  },
]
</script>

<template>
  <NavBar :navButtons="navButtons" />
  <RouterView />
</template>

<style>
body {
  background-color: #a4e6e2;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
/* .active {
  border: 2px solid black;
  width: 100%;
  height: 100%;
} */
</style>
