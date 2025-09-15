import HomePage from '@/components/HomePage.vue'
import ResumePage from '@/components/ResumePage.vue'
import WatchPage from '@/components/WatchPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/resume',
    name: 'ResumePage',
    component: ResumePage,
  },
  {
    path: '/watch',
    name: 'WatchPage',
    component: WatchPage,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
