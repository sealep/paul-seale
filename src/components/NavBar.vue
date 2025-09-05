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

<style scoped>
.nav-bar {
  padding-left: 1rem;
  margin-bottom: 1rem;
  height: 5rem;
  position: sticky;
  background-color: var(--vue-ocean-green);
  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 1rem;
}
@media (max-width: 480px) {
  .nav-bar {
    justify-content: space-evenly;
  }
}
</style>
