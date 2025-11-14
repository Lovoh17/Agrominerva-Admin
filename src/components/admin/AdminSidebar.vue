<template>
    <div class="sidebar bg-emerald-800 border-r border-emerald-700 transition-all duration-300 ease-in-out flex flex-col"
        :class="minimized ? 'w-20' : 'w-64'">
        <!-- Logo -->
        <div class="p-4 border-b border-emerald-700 flex-shrink-0">
            <div class="flex items-center justify-center h-8 w-full overflow-hidden">
                <img v-if="!minimized" src="../../assets/images/svg/AGRO-MINERVA-VERTICAL-SIN-FONDO.svg" alt="Logo"
                    class="h-16 scale-[1.7] -translate-y-[2px] max-w-none brightness-0 invert" />
                <img v-else src="../../assets/images/svg/AGRO-MINERVA-VERTICAL-SIN-FONDO.svg" alt="Logo"
                    class="h-8 brightness-0 invert" />
            </div>
        </div>

        <!-- Navigation Menu -->
        <div class="py-4 overflow-y-auto flex-1">
            <nav class="space-y-1 px-3">
                <!-- Menu Items -->
                <router-link v-for="item in flatMenuItems" :key="item.label" :to="item.to"
                    class="flex items-center space-x-3 p-3 text-white/80 hover:bg-emerald-700 hover:text-white transition-colors"
                    active-class="bg-green-600 text-white font-semibold">
                    <i :class="item.icon" class="text-lg"></i>
                    <span v-if="!minimized" class="font-medium">{{ item.label }}</span>
                </router-link>
            </nav>
        </div>

        <!-- User Profile Section -->
        <div class="p-4 border-t border-emerald-700 bg-emerald-900 flex-shrink-0 h-14">
            <div class="flex items-center justify-between h-full">
                <div class="flex items-center space-x-3">
                    <img :src="avatarImage" alt="Avatar" class="w-8 h-8 rounded-full ring-2 ring-green-400 flex-shrink-0 object-cover" />
                    <div v-if="!minimized" class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-white truncate">
                            Amy Elsner
                        </p>
                        <p class="text-xs text-emerald-300 truncate">
                            Administrator
                        </p>
                    </div>
                </div>
                <Button v-if="!minimized" icon="pi pi-cog" text rounded
                    class="text-emerald-300 hover:text-white hover:bg-emerald-700 flex-shrink-0" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from 'primevue/button'

// Importar la imagen del avatar
import avatarImage from '../../assets/images/DefaultAvatar.jpg'

const props = defineProps({
    minimized: {
        type: Boolean,
        default: false
    }
})

const menuItems = [
    {
        label: 'Panel',
        icon: 'pi pi-home',
        to: '/admin/panel'
    },
    {
        label: 'Punto de Venta',
        icon: 'pi pi-credit-card',
        to: '/admin/punto-venta'
    },
    {
        label: 'Usuarios',
        icon: 'pi pi-users',
        to: '/admin/usuarios'
    },
    {
        label: 'Contenido',
        icon: 'pi pi-file-edit',
        children: [
            {
                label: 'Publicar Noticia',
                icon: 'pi pi-megaphone',
                to: '/admin/noticias/crear'
            },
            {
                label: 'Publicar Artículo',
                icon: 'pi pi-file',
                to: '/admin/articulos/crear'
            },
            {
                label: 'Gestionar Contenido',
                icon: 'pi pi-list-check',
                to: '/admin/contenido'
            }
        ]
    },
    {
        label: 'Comunicación',
        icon: 'pi pi-envelope',
        children: [
            {
                label: 'Redactar Correo',
                icon: 'pi pi-pencil',
                to: '/admin/correo/redactar'
            }
        ]
    },
    {
        label: 'Inventario',
        icon: 'pi pi-database',
        to: '/admin/inventario'
    },
    {
        label: 'Pedidos',
        icon: 'pi pi-shopping-cart',
        to: '/admin/ordenes'
    },
    {
        label: 'Reportes',
        icon: 'pi pi-chart-bar',
        to: '/admin/reportes'
    },
    {
        label: 'Configuración',
        icon: 'pi pi-cog',
        to: '/admin/configuracion'
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

/* Estilos personalizados para PrimeVue Button */
:deep(.p-button.p-button-text) {
    color: inherit;
}

:deep(.p-button.p-button-text:hover) {
    background-color: rgba(5, 150, 105, 0.3);
}

:deep(.p-button.p-button-text:focus) {
    box-shadow: none;
}
</style>