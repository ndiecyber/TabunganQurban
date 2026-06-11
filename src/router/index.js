import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/shohibul',
    name: 'shohibul',
    component: () => import('../views/ShohibulView.vue')
  },
  {
    path: '/menabung',
    name: 'menabung',
    component: () => import('../views/MenabungView.vue')
  },
  {
    path: '/rekap',
    name: 'rekap',
    component: () => import('../views/RekapView.vue')
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
