import { createRouter, createWebHistory } from 'vue-router'
//import { authGuard } from './guards'
import publicRoutes from './publicRoutes'
import adminRoutes from './adminRoutes'
import employeeRoutes from './employeeRoutes'

const routes = [
  ...publicRoutes,
  ...adminRoutes,
  ...employeeRoutes,
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

// SEO dinámico: título y descripción
router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title

  if (to.meta.description) {
    const desc = document.querySelector('meta[name="description"]')
    if (desc) {
      desc.setAttribute('content', to.meta.description)
    } else {
      const meta = document.createElement('meta')
      meta.name = 'description'
      meta.content = to.meta.description
      document.head.appendChild(meta)
    }
  }
})

export default router