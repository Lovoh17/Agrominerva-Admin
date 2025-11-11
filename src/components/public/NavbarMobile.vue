<template>
    <transition enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-300 ease-in" enter-from-class="opacity-0 max-h-0"
        enter-to-class="opacity-100 max-h-screen" leave-from-class="opacity-100 max-h-screen"
        leave-to-class="opacity-0 max-h-0">
        <div v-if="mobileMenuOpen" class="lg:!hidden py-6 border-t border-gray-200 bg-white shadow-lg">
            <nav class="flex flex-col space-y-4 px-4">
                <router-link v-for="item in navItems" :key="item.label" :to="item.to" class="mobile-nav-link group"
                    @click="$emit('close-menu')">
                    <i :class="item.icon" class="mr-4 text-lg transition-transform group-hover:scale-110"></i>
                    <span class="font-semibold">{{ item.label }}</span>
                </router-link>

                <div class="pt-6 border-t border-gray-200">
                    <span class="p-input-icon-left w-full">
                        <i class="pi pi-search text-gray-400" />
                        <InputText v-model="searchQuery" placeholder="Buscar productos..."
                            class="w-full bg-gray-50 border-gray-200" />
                    </span>
                </div>

            </nav>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const props = defineProps({
    mobileMenuOpen: {
        type: Boolean,
        required: true
    },
    navItems: {
        type: Array,
        required: true
    }
})

const emit = defineEmits(['close-menu'])

const handleAuthClick = (route) => {
    emit('close-menu')
    router.push(route)
}
</script>

<style scoped>
.mobile-nav-link {
    @apply flex items-center font-medium text-gray-700 transition-all duration-300 py-4 px-6 rounded-xl no-underline;
}

.mobile-nav-link:hover {
    @apply text-primary-600 bg-primary-50 transform -translate-y-0.5;
}

.mobile-nav-link.router-link-active {
    @apply text-primary-600 bg-primary-100 border-l-4 border-primary-600;
}
</style>