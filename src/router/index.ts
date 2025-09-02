import HomePage from '@/components/HomePage.vue'
import ResumePage from '@/components/ResumePage.vue'
import WatchFunction from '@/components/WatchPage.vue'
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalizedLoaded,
} from 'vue-router'

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
    path: '/watch/:sourceType',
    name: 'WatchPage',
    component: WatchFunction,
    props: (route: RouteLocationNormalizedLoaded) => ({
      sourceType: Number(route.params.sourceType),
    }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // linkExactActiveClass: 'active',
  routes,
})

export default router
