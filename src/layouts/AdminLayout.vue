<template>
    <div class="flex h-screen bg-neutral-100 dark:bg-neutral-900">
        <AppSidebar :minimized="isSidebarMinimized" />

        <div class="flex-1 flex flex-col overflow-hidden">
            <AppTopbar @toggle-sidebar="toggleSidebar" />

            <main class="flex-1 overflow-y-auto p-4 md:p-6">
                <slot />
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