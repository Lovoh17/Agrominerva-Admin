<template>
  <div
    class="sidebar bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-all duration-300 ease-in-out flex flex-col fixed left-0 top-0"
    :class="minimized ? 'w-20' : 'w-64'">
    <!-- Logo Section -->
    <div class="p-4 border-b border-neutral-200 dark:border-neutral-700 flex-shrink-0">
      <div class="flex items-center justify-center h-8">
        <img v-if="!minimized" src="../../assets/images/svg/AGRO-MINERVA-VERTICAL-SIN-FONDO.svg" alt="Logo"
          class="h-8 max-w-full" />
        <img v-else src="../../assets/images/svg/AGRO-MINERVA-VERTICAL-SIN-FONDO.svg" alt="Logo" class="h-6 max-w-full" />
      </div>
    </div>

    <!-- Navigation Menu -->
    <div class="py-4 overflow-y-auto flex-1">
      <nav class="space-y-1 px-3">
        <!-- Menu Items -->
        <router-link v-for="item in flatMenuItems" :key="item.label" :to="item.to"
          class="flex items-center space-x-3 p-3 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          active-class="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
          <i :class="item.icon" class="text-lg flex-shrink-0"></i>
          <span v-if="!minimized" class="font-medium truncate">{{ item.label }}</span>
        </router-link>
      </nav>
    </div>

    <!-- User Profile Section -->
    <div class="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex-shrink-0">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <Avatar image="/demo/images/avatar/onyamalimba.png" shape="circle" size="normal" class="flex-shrink-0" />
          <div v-if="!minimized" class="flex-1 min-w-0">
            <p class="text-sm font-medium text-neutral-900 dark:text-white truncate">
              Carlos Rodríguez
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
              Empleado
            </p>
          </div>
        </div>
        <Button v-if="!minimized" icon="pi pi-cog" text rounded
          class="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 flex-shrink-0" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'

const props = defineProps({
  minimized: {
    type: Boolean,
    default: false
  }
})

// Opciones específicas para empleados
const menuItems = [
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    to: { name: 'Dashboard Employee' }
  },
  {
    label: 'Ventas',
    icon: 'pi pi-dollar',
    children: [
      {
        label: 'Nueva Venta',
        icon: 'pi pi-plus-circle',
        to: '/employee/sales/create'
      },
      {
        label: 'Historial Ventas',
        icon: 'pi pi-history',
        to: '/employee/sales/history'
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        to: '/employee/customers'
      }
    ]
  },
  {
    label: 'Productos',
    icon: 'pi pi-shopping-bag',
    children: [
      {
        label: 'Catálogo',
        icon: 'pi pi-th-large',
        to: '/employee/products/catalog'
      },
      {
        label: 'Buscar Productos',
        icon: 'pi pi-search',
        to: '/employee/products/search'
      },
      {
        label: 'Stock Disponible',
        icon: 'pi pi-check-circle',
        to: '/employee/products/stock'
      }
    ]
  },
  {
    label: 'Inventario',
    icon: 'pi pi-box',
    children: [
      {
        label: 'Control Diario',
        icon: 'pi pi-calendar',
        to: '/employee/inventory/daily'
      },
      {
        label: 'Ajustes',
        icon: 'pi pi-wrench',
        to: '/employee/inventory/adjustments'
      },
      {
        label: 'Reportes',
        icon: 'pi pi-chart-line',
        to: '/employee/inventory/reports'
      }
    ]
  },
  {
    label: 'Clientes',
    icon: 'pi pi-user',
    children: [
      {
        label: 'Lista de Clientes',
        icon: 'pi pi-list',
        to: '/employee/customers/list'
      },
      {
        label: 'Agregar Cliente',
        icon: 'pi pi-user-plus',
        to: '/employee/customers/create'
      },
      {
        label: 'Fidelización',
        icon: 'pi pi-star',
        to: '/employee/customers/loyalty'
      }
    ]
  },
  {
    label: 'Mi Desempeño',
    icon: 'pi pi-chart-bar',
    to: '/employee/performance'
  },
  {
    label: 'Horarios',
    icon: 'pi pi-clock',
    to: '/employee/schedule'
  },
  {
    label: 'Soporte',
    icon: 'pi pi-question-circle',
    to: '/employee/support'
  }
]

// Aplanar los elementos del menú para mostrar todos al mismo nivel
const flatMenuItems = computed(() => {
  const flatItems = []

  menuItems.forEach(item => {
    if (item.children) {
      // Agregar los elementos hijos
      flatItems.push(...item.children)
    } else {
      // Agregar el elemento principal
      flatItems.push(item)
    }
  })

  return flatItems
})
</script>

<style scoped>
.sidebar {
  height: 100vh;
  position: fixed;
  z-index: 50;
  overflow-y: auto;
}
</style>