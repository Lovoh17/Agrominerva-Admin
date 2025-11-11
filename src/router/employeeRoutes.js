const employeeRoutes = [
    {
        path: '/employee',
        component: () => import('@/layouts/EmployeeLayout.vue'),
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard Employee',
                component: () => import('@/views/employee/DashboardEmployee.vue'),
                meta: {
                    requiresAuth: true,
                    title: 'Dashboard - Empleado',
                    description: 'Panel de control del empleado'
                }
            },
            // Ruta por defecto que redirige a dashboard
            {
                path: '',
                redirect: 'dashboard'
            }
        ]
    },
]

export default employeeRoutes