//guardsimport { useAuthStore } from '@/stores/auth'

export const authGuard = (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirigir al login si no está autenticado
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirigir al dashboard si ya está autenticado
    next(authStore.user?.role === 'admin' ? '/admin/dashboard' : '/employee/dashboard')
  } else if (to.meta.requiredRole && authStore.user?.role !== to.meta.requiredRole) {
    // Redirigir si no tiene el rol requerido
    next('/unauthorized')
  } else {
    next()
  }
}

export const roleGuard = (requiredRole) => {
  return (to, from, next) => {
    const authStore = useAuthStore()
    
    if (authStore.user?.role !== requiredRole) {
      next('/unauthorized')
    } else {
      next()
    }
  }
}