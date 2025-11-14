const adminRoutes = [
  // Rutas de Admin (con layout completo)
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/admin/panel', // Redirect principal
    children: [
      {
        path: 'panel',
        name: 'Dashboard Admin',
        component: () => import('@/views/admin/DashboardAdmin.vue'),
        meta: {
          requiresAuth: true, // Debería requerir auth
        }
      },
      {
        path: 'usuarios',
        name: 'Lista de Usuarios',
        component: () => import('@/views/admin/EmployeeList.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      // ===== RUTAS DE CONTENIDO =====
      {
        path: 'noticias/crear',
        name: 'Publicar Noticia',
        component: () => import('@/views/content/NewsCreate.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'articulos/crear',
        name: 'Publicar Artículo',
        component: () => import('@/views/content/ArticleCreate.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'contenido',
        name: 'Gestionar Contenido',
        component: () => import('@/views/content/ContentManagement.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      // ===== RUTAS DE COMUNICACIÓN =====
      {
        path: 'correo/redactar',
        name: 'Redactar Correo',
        component: () => import('@/views/admin/email/EmailCompose.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      // ===== RUTAS OPERATIVAS =====
      {
        path: 'reportes',
        name: 'Reportes',
        component: () => import('@/views/admin/Reports.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'configuracion',
        name: 'Configuración',
        component: () => import('@/views/admin/Settings.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'inventario',
        name: 'Inventario',
        component: () => import('@/views/admin/Inventory.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'ordenes',
        name: 'Órdenes',
        component: () => import('@/views/admin/Orders.vue'),
        meta: {
          requiresAuth: true,
        }
      },
      {
        path: 'punto-venta',
        name: 'Punto de Venta',
        component: () => import('@/views/PointOfSale.vue'),
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