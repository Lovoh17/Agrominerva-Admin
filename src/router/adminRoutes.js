const adminRoutes = [
  // Rutas de Admin (con layout completo)
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/admin/dashboard', // Redirect principal
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard Admin',
        component: () => import('@/views/admin/DashboardAdmin.vue'),
        meta: {
          requiresAuth: true, // Debería requerir auth
        }
      },
      {
        path: 'users',
        name: 'Lista de Usuarios',
        component: () => import('@/views/admin/EmployeeList.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'reports',
        name: 'Reportes',
        component: () => import('@/views/admin/Reports.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'settings',
        name: 'Configuración', // Corregida la tilde
        component: () => import('@/views/admin/Settings.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'inventory',
        name: 'Inventario',
        component: () => import('@/views/admin/Inventory.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'orders', // Corregido: sin la barra inicial
        name: 'Órdenes', // Corregida la tilde
        component: () => import('@/views/admin/Orders.vue'),
        meta: {
          requiresAuth: true,
        }
      }
    ]
  },
  
  // Ruta de Login (SIN layout de admin)
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue'),
    meta: {
      requiresAuth: false,
      layout: 'blank' // Sin sidebar ni topbar
    }
  },
]

export default adminRoutes