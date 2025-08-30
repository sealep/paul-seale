import HomePage from '@/components/HomePage.vue'
import WatchFunction from '@/components/WatchFunction.vue'
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
    path: '/watch/:sourceType',
    name: 'WatchFunction',
    component: WatchFunction,
    props: (route: RouteLocationNormalizedLoaded) => ({
      sourceType: Number(route.params.sourceType),
    }),
    //  (route: RouteLocationNormalizedLoaded) => ({
    //   params: { sourceType: route.params.sourceType },
    // }),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
