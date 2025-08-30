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
  position: sticky;
  top: 0;
  background: linear-gradient(-90deg, rgb(228, 156, 22), rgb(159, 161, 18));
  box-shadow: 0 25px 15px 0 rgba(0, 0, 0, 0.5);
}
</style>
