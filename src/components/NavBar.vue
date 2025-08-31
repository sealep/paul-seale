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
  width: 100%;
  height: 6rem;
  margin-bottom: 2rem;
  position: sticky;
  top: 0;
  background-color: rgb(22, 80, 80);
  box-shadow: 0 25px 15px 0 rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
}
</style>
