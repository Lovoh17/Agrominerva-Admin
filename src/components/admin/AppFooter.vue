<template>
  <footer class="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 px-4 py-4 h-15">
    <div class="flex flex-col md:flex-row items-center justify-between h-full">
      <!-- Copyright -->
      <div class="text-sm text-neutral-600 dark:text-neutral-400 mb-2 md:mb-0">
        &copy; {{ currentYear }} AgroMinerva.
      </div>

      <!-- Links -->
      <div class="flex items-center space-x-4">
        <router-link to="/admin/privacy"
          class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          Privacidad
        </router-link>
        <router-link to="/admin/terms"
          class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          Términos
        </router-link>
        <router-link to="/admin/help"
          class="text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
          Ayuda
        </router-link>

        <!-- Version Info -->
        <span class="text-xs text-neutral-500 dark:text-neutral-500">
          v{{ appVersion }}
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
const appVersion = ref('1.0.0')
</script>