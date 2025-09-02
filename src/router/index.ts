import HomePage from '@/components/HomePage.vue'
import ResumePage from '@/components/ResumePage.vue'
import WatchPage from '@/components/WatchPage.vue'
import { SourceType } from '@/composables/useWatchSource'
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
    path: '/watch',
    name: 'WatchPage',
    redirect: { path: `/watch/${SourceType.REF}` },
    children: [
      {
        path: ':sourceType',
        name: 'WatchPageWithParam',
        component: WatchPage,
        props: (route: RouteLocationNormalizedLoaded) => ({
          sourceType: Number(route.params.sourceType),
        }),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
