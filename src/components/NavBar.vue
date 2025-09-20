<script setup lang="ts">
/*
 *****************************************************************************
 * The navigation bar.
 *****************************************************************************
 */
import { type NavButtonI } from '@/components/NavButton.vue'
import NavButton from '@/components/NavButton.vue'

interface NavBarI {
  navButtons: NavButtonI[]
}

const { navButtons } = defineProps<NavBarI>()
</script>

<template>
  <section id="nav-bar" class="grid">
    <nav class="flex">
      <div v-for="(navButton, index) in navButtons" :key="index">
        <NavButton v-bind="navButton" />
      </div>
    </nav>
  </section>
</template>

<style src="@/assets/styles/NavBar.css" scoped></style>
