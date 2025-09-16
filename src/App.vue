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
    buttonName: 'Resume',
    linkName: 'ResumePage',
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

<style src="@/assets/styles/App.css"></style>
