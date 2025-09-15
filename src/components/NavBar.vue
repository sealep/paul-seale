<script setup lang="ts">
import { type NavButtonI } from '@/components/NavButton.vue'
import NavButton from '@/components/NavButton.vue'

interface NavBarI {
  navButtons: NavButtonI[]
}

const { navButtons } = defineProps<NavBarI>()
</script>

<template>
  <div class="nav-bar">
    <div v-for="(navButton, index) in navButtons" :key="index">
      <NavButton v-bind="navButton" />
    </div>
  </div>
</template>

<style src="@/assets/styles/NavBar.css" scoped></style>
