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
  <RouterView :class="'router-view'" />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --light-mint: #bfffed;
  --vue-ocean-green: #42b883;
  --vue-pickled-bluewood: #35495e;
  --light-bluewood: #798c92;
  --white-old-paper: #f6eee3;
  --dark-grayish: #888888;
  --steely-blue: #b0d8fc;
  --disabled-gray-light: #f2f2f2;
  --disabled-gray-dark: #999999;
}
body {
  background-color: var(--light-mint);
  font-family: 'DM Serif Text', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.router-view {
  overflow-y: scroll;
}
@media (max-width: 480px) {
  .router-view {
    scrollbar-width: none;
  }
}
</style>
