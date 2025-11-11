<template>
    <div class="sidebar bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 transition-all duration-300 ease-in-out flex flex-col"
        :class="minimized ? 'w-20' : 'w-64'">
        <!-- Logo -->
        <div class="p-4 border-b border-neutral-200 dark:border-neutral-700 flex-shrink-0">
            <div class="flex items-center justify-center h-8 w-full overflow-hidden">
                <img v-if="!minimized" src="../../assets/images/svg/AGRO-MINERVA-VERTICAL-SIN-FONDO.svg" alt="Logo"
                    class="h-16 scale-[1.7] -translate-y-[2px] max-w-none" />
                <img v-else src="../../assets/images/svg/AGRO-MINERVA-VERTICAL-SIN-FONDO.svg" alt="Logo" class="h-8" />
            </div>
        </div>

        <!-- Navigation Menu -->
        <div class="py-4 overflow-y-auto flex-1">
            <nav class="space-y-1 px-3">
                <!-- Menu Items -->
                <router-link v-for="item in flatMenuItems" :key="item.label" :to="item.to"
                    class="flex items-center space-x-3 p-3 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    active-class="bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                    <i :class="item.icon" class="text-lg"></i>
                    <span v-if="!minimized" class="font-medium">{{ item.label }}</span>
                </router-link>
            </nav>
        </div>

        <!-- User Profile Section - ALTURA CORREGIDA -->
        <div
            class="p-4 border-t border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex-shrink-0 h-14">
            <div class="flex items-center justify-between h-full">
                <div class="flex items-center space-x-3">
                    <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle" size="normal"
                        class="flex-shrink-0" />
                    <div v-if="!minimized" class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-neutral-900 dark:text-white truncate">
                            Amy Elsner
                        </p>
                        <p class="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                            Administrator
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

const menuItems = [
    {
        label: 'Dashboard',
        icon: 'pi pi-home',
        to: '/admin/dashboard'
    },
    {
        label: 'Usuarios',
        icon: 'pi pi-users',
        children: [
            {
                label: 'Lista de Usuarios',
                icon: 'pi pi-list',
                to: '/admin/users'
            },
            {
                label: 'Agregar Usuario',
                icon: 'pi pi-user-plus',
                to: '/admin/users/create'
            }
        ]
    },
    {
        label: 'Productos',
        icon: 'pi pi-shopping-bag',
        children: [
            {
                label: 'Todos los Productos',
                icon: 'pi pi-box',
                to: '/admin/products'
            },
            {
                label: 'Categorías',
                icon: 'pi pi-tags',
                to: '/admin/categories'
            },
            {
                label: 'Inventario',
                icon: 'pi pi-database',
                to: '/admin/inventory'
            }
        ]
    },
    {
        label: 'Pedidos',
        icon: 'pi pi-shopping-cart',
        to: '/admin/orders'
    },
    {
        label: 'Reportes',
        icon: 'pi pi-chart-bar',
        to: '/admin/reports'
    },
    {
        label: 'Configuración',
        icon: 'pi pi-cog',
        to: '/admin/settings'
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
    position: relative;
    z-index: 40;
}
</style>