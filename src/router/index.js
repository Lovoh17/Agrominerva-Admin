import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards'
import adminRoutes from './adminRoutes'

const routes = [
  //...publicRoutes,
  ...adminRoutes,
  {
    path: '/tests',
    name: 'tests',
    component: () => import('../views/Tests.vue'),
  },
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router