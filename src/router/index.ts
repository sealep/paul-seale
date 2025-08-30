import HomePage from '@/components/HomePage.vue'
import WatchSource from '@/components/WatchSource.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/watch',
    name: 'WatchSource',
    component: WatchSource,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
