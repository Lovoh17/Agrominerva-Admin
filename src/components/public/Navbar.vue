<template>
    <header class="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div class="container mx-auto px-4">
            <div class="flex justify-between items-center min-h-[110px]">
                <div class="flex items-center flex-shrink-0">
                    <router-link to="/" class="flex items-center space-x-3 no-underline group">
                        <img src="../../assets/images/svg/AGRO-MINERVA-VERTICAL-SIN-FONDO.svg" alt="Logo AgroMinerva"
                            class="h-28 w-28 transition-transform duration-300 group-hover:scale-110" v-if="logo" />
                    </router-link>
                </div>

                <div class="flex items-center space-x-4 flex-shrink-0">
                    <nav class="hidden lg:flex items-center space-x-4">
                        <router-link to="/" class="nav-link group">
                            <i class="pi pi-home mr-2 text-lg transition-transform group-hover:scale-110"></i>
                            <span class="font-semibold">Inicio</span>
                        </router-link>

                        <div class="relative group" @mouseenter="openDropdown = 'shop'"
                            @mouseleave="openDropdown = null">
                            <button class="nav-link group">
                                <i
                                    class="pi pi-shopping-bag mr-2 text-lg transition-transform group-hover:scale-110"></i>
                                <span class="font-semibold">Tienda</span>
                                <i class="pi pi-chevron-down ml-2 text-xs transition-transform"
                                    :class="{ 'rotate-180': openDropdown === 'shop' }"></i>
                            </button>

                            <transition enter-active-class="transition-all duration-200 ease-out"
                                leave-active-class="transition-all duration-150 ease-in"
                                enter-from-class="opacity-0 scale-95 translate-y-2"
                                enter-to-class="opacity-100 scale-100 translate-y-0"
                                leave-from-class="opacity-100 scale-100 translate-y-0"
                                leave-to-class="opacity-0 scale-95 translate-y-2">
                                <div v-if="openDropdown === 'shop'"
                                    class="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                                    <router-link to="/tienda" class="dropdown-item group" @click="openDropdown = null">
                                        <i class="pi pi-store mr-3"></i>
                                        <span>Ver Tienda</span>
                                    </router-link>
                                    <router-link to="/carrito" class="dropdown-item group" @click="openDropdown = null">
                                        <i class="pi pi-shopping-cart mr-3"></i>
                                        <span>Mi Carrito</span>
                                        <Badge v-if="cartItemCount > 0" :value="cartItemCount" severity="danger"
                                            class="ml-auto" />
                                    </router-link>
                                    <router-link to="/pedidos" class="dropdown-item group" @click="openDropdown = null">
                                        <i class="pi pi-truck mr-3"></i>
                                        <span>Mis Pedidos</span>
                                    </router-link>
                                </div>
                            </transition>
                        </div>

                        <div class="relative group" @mouseenter="openDropdown = 'blog'"
                            @mouseleave="openDropdown = null">
                            <button class="nav-link group">
                                <i class="pi pi-book mr-2 text-lg transition-transform group-hover:scale-110"></i>
                                <span class="font-semibold">Blog</span>
                                <i class="pi pi-chevron-down ml-2 text-xs transition-transform"
                                    :class="{ 'rotate-180': openDropdown === 'blog' }"></i>
                            </button>

                            <transition enter-active-class="transition-all duration-200 ease-out"
                                leave-active-class="transition-all duration-150 ease-in"
                                enter-from-class="opacity-0 scale-95 translate-y-2"
                                enter-to-class="opacity-100 scale-100 translate-y-0"
                                leave-from-class="opacity-100 scale-100 translate-y-0"
                                leave-to-class="opacity-0 scale-95 translate-y-2">
                                <div v-if="openDropdown === 'blog'"
                                    class="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                                    <router-link to="/blog" class="dropdown-item group" @click="openDropdown = null">
                                        <i class="pi pi-bookmark mr-3"></i>
                                        <span>Artículos</span>
                                    </router-link>
                                    <router-link to="/blog/actividad" class="dropdown-item group"
                                        @click="openDropdown = null">
                                        <i class="pi pi-rss mr-3"></i>
                                        <span>Actividad Reciente</span>
                                    </router-link>
                                </div>
                            </transition>
                        </div>

                        <div class="relative group" @mouseenter="openDropdown = 'agronomy'"
                            @mouseleave="openDropdown = null">
                            <button class="nav-link group">
                                <i
                                    class="pi pi-graduation-cap mr-2 text-lg transition-transform group-hover:scale-110"></i>
                                <span class="font-semibold">Agronomía</span>
                                <i class="pi pi-chevron-down ml-2 text-xs transition-transform"
                                    :class="{ 'rotate-180': openDropdown === 'agronomy' }"></i>
                            </button>

                            <transition enter-active-class="transition-all duration-200 ease-out"
                                leave-active-class="transition-all duration-150 ease-in"
                                enter-from-class="opacity-0 scale-95 translate-y-2"
                                enter-to-class="opacity-100 scale-100 translate-y-0"
                                leave-from-class="opacity-100 scale-100 translate-y-0"
                                leave-to-class="opacity-0 scale-95 translate-y-2">
                                <div v-if="openDropdown === 'agronomy'"
                                    class="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                                    <router-link to="/agronomia/programas" class="dropdown-item group"
                                        @click="openDropdown = null">
                                        <i class="pi pi-list mr-3"></i>
                                        <span>Programas Académicos</span>
                                    </router-link>
                                    <router-link to="/agronomia/profesores" class="dropdown-item group"
                                        @click="openDropdown = null">
                                        <i class="pi pi-users mr-3"></i>
                                        <span>Nuestros Profesores</span>
                                    </router-link>
                                    <router-link to="/agronomia/carrera" class="dropdown-item group"
                                        @click="openDropdown = null">
                                        <i class="pi pi-info-circle mr-3"></i>
                                        <span>Información de Carrera</span>
                                    </router-link>
                                </div>
                            </transition>
                        </div>

                        <div class="relative group" @mouseenter="openDropdown = 'info'"
                            @mouseleave="openDropdown = null">
                            <button class="nav-link group">
                                <i
                                    class="pi pi-info-circle mr-2 text-lg transition-transform group-hover:scale-110"></i>
                                <span class="font-semibold">Información</span>
                                <i class="pi pi-chevron-down ml-2 text-xs transition-transform"
                                    :class="{ 'rotate-180': openDropdown === 'info' }"></i>
                            </button>

                            <transition enter-active-class="transition-all duration-200 ease-out"
                                leave-active-class="transition-all duration-150 ease-in"
                                enter-from-class="opacity-0 scale-95 translate-y-2"
                                enter-to-class="opacity-100 scale-100 translate-y-0"
                                leave-from-class="opacity-100 scale-100 translate-y-0"
                                leave-to-class="opacity-0 scale-95 translate-y-2">
                                <div v-if="openDropdown === 'info'"
                                    class="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                                    <router-link to="/conocenos" class="dropdown-item group"
                                        @click="openDropdown = null">
                                        <i class="pi pi-building mr-3"></i>
                                        <span>Sobre Nosotros</span>
                                    </router-link>
                                    <router-link to="/contacto" class="dropdown-item group"
                                        @click="openDropdown = null">
                                        <i class="pi pi-envelope mr-3"></i>
                                        <span>Contacto</span>
                                    </router-link>
                                    <div class="border-t border-gray-200 my-2"></div>
                                    <router-link to="/preguntas-frecuentes" class="dropdown-item group"
                                        @click="openDropdown = null">
                                        <i class="pi pi-question-circle mr-3"></i>
                                        <span>Preguntas Frecuentes</span>
                                    </router-link>
                                    <router-link to="/privacidad" class="dropdown-item group"
                                        @click="openDropdown = null">
                                        <i class="pi pi-shield mr-3"></i>
                                        <span>Privacidad</span>
                                    </router-link>
                                    <router-link to="/terminos" class="dropdown-item group"
                                        @click="openDropdown = null">
                                        <i class="pi pi-file mr-3"></i>
                                        <span>Términos</span>
                                    </router-link>
                                </div>
                            </transition>
                        </div>
                    </nav>

                    <router-link to="/carrito"
                        class="relative p-3 text-gray-600 hover:text-primary-600 transition-colors rounded-lg hover:bg-gray-50">
                        <i class="pi pi-shopping-cart text-xl"></i>
                        <Badge v-if="cartItemCount > 0" :value="cartItemCount" severity="danger"
                            class="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center" />
                    </router-link>

                    <Button icon="pi pi-bars" text rounded
                        class="lg:!hidden text-gray-600 hover:bg-gray-100 h-12 w-12 transition-colors"
                        @click="toggleMobileMenu" />
                </div>
            </div>

            <NavbarMobile :mobile-menu-open="mobileMenuOpen" :nav-items="navItemsWithDropdowns"
                @close-menu="mobileMenuOpen = false" />
        </div>
    </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
//import { useCartStore } from '@/stores/cart'
import NavbarMobile from './NavbarMobile.vue'

const router = useRouter()
//const cartStore = useCartStore()
const mobileMenuOpen = ref(false)
const openDropdown = ref(null)
const logo = ref(true)

const cartItemCount = computed(() => {
    return 0 // Valor temporal
})

const navItemsWithDropdowns = computed(() => {
    return [
        { label: 'Inicio', to: '/', icon: 'pi pi-home' },
        {
            label: 'Tienda',
            to: '/tienda',
            icon: 'pi pi-shopping-bag',
            children: [
                { label: 'Ver Tienda', to: '/tienda', icon: 'pi pi-store' },
                { label: 'Mi Carrito', to: '/carrito', icon: 'pi pi-shopping-cart' },
                { label: 'Mis Pedidos', to: '/pedidos', icon: 'pi pi-truck' }
            ]
        },
        {
            label: 'Blog',
            to: '/blog',
            icon: 'pi pi-book',
            children: [
                { label: 'Artículos', to: '/blog', icon: 'pi pi-bookmark' },
                { label: 'Actividad Reciente', to: '/blog/actividad', icon: 'pi pi-rss' }
            ]
        },
        {
            label: 'Agronomía',
            to: '/agronomia/programas',
            icon: 'pi pi-graduation-cap',
            children: [
                { label: 'Programas Académicos', to: '/agronomia/programas', icon: 'pi pi-list' },
                { label: 'Nuestros Profesores', to: '/agronomia/profesores', icon: 'pi pi-users' },
                { label: 'Información de Carrera', to: '/agronomia/carrera', icon: 'pi pi-info-circle' },
            ]
        },
        {
            label: 'Información',
            to: '/conocenos',
            icon: 'pi pi-info-circle',
            children: [
                { label: 'Sobre Nosotros', to: '/conocenos', icon: 'pi pi-building' },
                { label: 'Contacto', to: '/contacto', icon: 'pi pi-envelope' },
                { label: 'Preguntas Frecuentes', to: '/preguntas-frecuentes', icon: 'pi pi-question-circle' },
                { label: 'Privacidad', to: '/privacidad', icon: 'pi pi-shield' },
                { label: 'Términos', to: '/terminos', icon: 'pi pi-file' }
            ]
        }
    ]
})

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
    openDropdown.value = null
}

// Cerrar menú mobile al cambiar ruta
router.afterEach(() => {
    mobileMenuOpen.value = false
    openDropdown.value = null
})
</script>

<style scoped>
.nav-link {
    @apply flex items-center font-medium text-gray-700 transition-all duration-300 py-3 px-3 rounded-xl no-underline relative cursor-pointer;
}

.nav-link:hover {
    @apply text-primary-600 bg-primary-50 transform -translate-y-0.5;
}

.nav-link.router-link-active {
    @apply text-primary-600 bg-primary-50;
}

.nav-link.router-link-active::after {
    content: '';
    @apply absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-primary-600 rounded-full;
}

.dropdown-item {
    @apply flex items-center px-4 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors no-underline text-sm font-medium;
}

.dropdown-item.router-link-active {
    @apply bg-primary-50 text-primary-600 border-r-2 border-primary-600;
}

/* Mejoras visuales para el navbar sticky */
header {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}
</style>