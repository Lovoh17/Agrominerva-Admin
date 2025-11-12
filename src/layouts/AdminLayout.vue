<template>
    <div class="flex h-screen bg-emerald-50">
        <AppSidebar 
            :minimized="isSidebarMinimized"
            class="transition-all duration-300 ease-in-out"
        />

        <div class="flex-1 flex flex-col overflow-hidden">
            <AppTopbar @toggle-sidebar="toggleSidebar" />

            <main class="flex-1 overflow-y-auto p-6">
                <router-view />
            </main>

            <AppFooter />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import AppSidebar from '@/components/admin/AdminSidebar.vue'
import AppTopbar from '@/components/admin/Topbar.vue'
import AppFooter from '@/components/admin/AppFooter.vue'

const isSidebarMinimized = ref(false)

const toggleSidebar = () => {
    isSidebarMinimized.value = !isSidebarMinimized.value
}
</script>

<style scoped>
/* Scrollbar personalizado */
main::-webkit-scrollbar {
    width: 8px;
}

main::-webkit-scrollbar-track {
    background: #d1fae5;
}

main::-webkit-scrollbar-thumb {
    background: #10b981;
    border-radius: 4px;
}

main::-webkit-scrollbar-thumb:hover {
    background: #059669;
}

/* Soporte para Firefox */
main {
    scrollbar-width: thin;
    scrollbar-color: #10b981 #d1fae5;
}
</style>