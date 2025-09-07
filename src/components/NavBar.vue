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
  padding: 0 1rem;
  height: 5rem;
  position: sticky;
  top: 0;
  background-color: var(--vue-ocean-green);
  box-shadow: 0 1rem 1rem 0 rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 1rem;
}
@media (orientation: portrait) and (width >= 768px) {
  .nav-bar {
    padding: 0 0.5rem;
    justify-content: space-evenly;
  }
}
@media (orientation: portrait) and (width < 768px) {
  .nav-bar {
    padding: 0 0.5rem;
    justify-content: space-evenly;
  }
  :deep(.nav-button) {
    width: 6rem;
    height: 2rem;
    font-size: 0.8rem;
  }
}
</style>
