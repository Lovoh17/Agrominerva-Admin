const adminRoutes = [
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard Admin',
        component: () => import('@/views/admin/DashboardAdmin.vue'),
        meta: {
          requiresAuth: true,
          role: 'admin',
          title: 'Dashboard - Administrador',
          description: 'Panel de control del administrador'
        }
      },
      {
        path: 'admin',
        redirect: 'dashboard'
      }
    ]
  }
]

export default adminRoutes
