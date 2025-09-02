<script setup lang="ts">
import type { NavButtonI } from '@/components/NavButton.vue'
import NavBar from '@/components/NavBar.vue'
import { RouterView } from 'vue-router'
import { SourceType } from './composables/useWatchSource'

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
    params: { sourceType: `${SourceType.REF}` },
  },
]
</script>

<template>
  <NavBar :navButtons="navButtons" />
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --light-mint: #bfffed;
  --vue-ocean-green: #42b883;
  --vue-pickled-bluewood: #35495e;
  --white-old-paper: #f6eee3;
  --gray-border: #888888;
  --action-button: #9eb6da;
  --disabled-bg: #f2f2f2;
  --disabled-text: #999999;
}
body {
  background-color: var(--light-mint);
  font-family: 'Arimo', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
