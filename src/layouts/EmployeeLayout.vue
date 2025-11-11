<template>
  <div class="employee-layout min-h-screen bg-gray-50 dark:bg-neutral-900 flex">
    <!-- Employee Sidebar -->
    <EmployeeSidebar :minimized="sidebarMinimized" />
    
    <!-- Main Content Area -->
    <div class="main-content flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out" 
         :class="sidebarMinimized ? 'ml-20' : 'ml-64'">
      
      <!-- Employee Topbar -->
      <EmployeeTopbar @toggle-sidebar="toggleSidebar" />
      
      <!-- Page Content -->
      <main class="page-content flex-1 p-6 overflow-auto">
        <router-view />
      </main>
      
      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EmployeeSidebar from '@/components/employee/EmployeeSidebar.vue'
import EmployeeTopbar from '@/components/admin/Topbar.vue'
import AppFooter from '@/components/admin/AppFooter.vue'

const sidebarMinimized = ref(false)

const toggleSidebar = () => {
  sidebarMinimized.value = !sidebarMinimized.value
}
</script>

<style scoped>
.employee-layout {
  min-height: 100vh;
}

.main-content {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
}
</style>