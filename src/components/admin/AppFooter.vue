<template>
  <footer class="bg-white border-t border-emerald-200 px-4 py-4 h-15">
    <div class="flex flex-col md:flex-row items-center justify-between h-full">
      <!-- Copyright -->
      <div class="text-sm text-emerald-700 mb-2 md:mb-0 font-medium">
        &copy; {{ currentYear }} AgroMinerva - Departamento de Agronomía, UES
      </div>

      <!-- Links -->
      <div class="flex items-center space-x-4">
        <router-link to="/admin/privacy"
          class="text-sm text-emerald-600 hover:text-green-600 transition-colors font-medium">
          Privacidad
        </router-link>
        <router-link to="/admin/terms"
          class="text-sm text-emerald-600 hover:text-green-600 transition-colors font-medium">
          Términos
        </router-link>
        <router-link to="/admin/help"
          class="text-sm text-emerald-600 hover:text-green-600 transition-colors font-medium">
          Ayuda
        </router-link>

        <!-- Version Info -->
        <span class="text-xs text-emerald-500 bg-emerald-50 px-2 py-1 font-semibold">
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

<style scoped>
/* Estilos adicionales para hover suave */
a {
  position: relative;
}

a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background-color: #10b981;
  transition: width 0.3s ease;
}

a:hover::after {
  width: 100%;
}
</style>