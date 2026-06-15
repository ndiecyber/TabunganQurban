import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import ShohibulView from '../views/ShohibulView.vue'
import MenabungView from '../views/MenabungView.vue'
import RekapView from '../views/RekapView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/shohibul',
    name: 'shohibul',
    component: ShohibulView
  },
  {
    path: '/menabung',
    name: 'menabung',
    component: MenabungView
  },
  {
    path: '/rekap',
    name: 'rekap',
    component: RekapView
  },
  {
    path: '/kalkulator',
    redirect: '/menabung'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
