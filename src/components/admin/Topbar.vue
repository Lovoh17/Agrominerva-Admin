<template>
  <header class="bg-emerald-800 border-b border-emerald-700 px-4 py-3 h-16">
    <div class="flex items-center justify-between h-full">
      <!-- Left Section -->
      <div class="flex items-center space-x-4 h-full">
        <Button icon="pi pi-bars" text
          class="text-white hover:bg-emerald-700 h-10 w-10 flex items-center justify-center"
          @click="$emit('toggle-sidebar')" />
      </div>
      
      <!-- Right Section -->
      <div class="flex items-center space-x-3 h-full">
        <!-- Search -->
        <span class="p-input-icon-left flex items-center">
          <i class="pi pi-search text-emerald-600" />
          <InputText v-model="searchQuery" placeholder="Buscar..." 
            class="w-40 md:w-56 h-10 bg-white border-emerald-300 focus:border-green-500 focus:ring-green-500" />
        </span>

        <!-- Notifications -->
        <Button icon="pi pi-bell" text
          class="text-white hover:bg-emerald-700 relative h-10 w-10 flex items-center justify-center"
          @click="toggleNotifications">
          <Badge v-if="unreadNotifications > 0" :value="unreadNotifications" severity="danger"
            class="absolute -top-1 -right-1 bg-orange-600" />
        </Button>

        <!-- User Menu -->
        <Menu ref="userMenu" :model="userMenuItems" :popup="true">
          <template #start>
            <div class="px-4 py-2 border-b border-emerald-200 bg-emerald-50">
              <p class="font-semibold text-emerald-900">Amy Elsner</p>
              <p class="text-sm text-emerald-700">amy.elsner@ues.edu.sv</p>
            </div>
          </template>
        </Menu>

        <Button :label="userDisplayName" text
          class="text-white hover:bg-emerald-700 h-10 flex items-center"
          @click="toggleUserMenu">
          <template #icon>
            <img :src="avatarImage" alt="Avatar" class="mr-2 h-8 w-8 rounded-full ring-2 ring-green-400 object-cover" />
          </template>
        </Button>

        <!-- Dark Mode Toggle -->
        <Button :icon="darkMode ? 'pi pi-sun' : 'pi pi-moon'" text
          class="text-white hover:bg-emerald-700 h-10 w-10 flex items-center justify-center"
          @click="toggleDarkMode" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Menu from 'primevue/menu'
import Badge from 'primevue/badge'

// Importar la imagen del avatar
import avatarImage from '../../assets/images/DefaultAvatar.jpg'

const emit = defineEmits(['toggle-sidebar'])

const route = useRoute()
const searchQuery = ref('')
const userMenu = ref()
const darkMode = ref(false)
const unreadNotifications = ref(3)

const userDisplayName = computed(() => {
  return window.innerWidth >= 768 ? 'Amy Elsner' : ''
})

const userMenuItems = [
  {
    label: 'Perfil',
    icon: 'pi pi-user',
    command: () => {
      // Navegar al perfil
    }
  },
  {
    label: 'Configuración',
    icon: 'pi pi-cog',
    command: () => {
      // Navegar a configuración
    }
  },
  { separator: true },
  {
    label: 'Cerrar Sesión',
    icon: 'pi pi-sign-out',
    command: () => {
      // Lógica de logout
      window.location.href = '/login'
    }
  }
]

const toggleUserMenu = (event) => {
  userMenu.value.toggle(event)
}

const toggleNotifications = () => {
  // Lógica para mostrar notificaciones
  console.log('Mostrar notificaciones')
}

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  if (darkMode.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<style scoped>
/* Estilos personalizados para PrimeVue Components */
:deep(.p-button.p-button-text) {
  color: inherit;
}

:deep(.p-button.p-button-text:hover) {
  background-color: rgba(5, 150, 105, 0.3);
}

:deep(.p-button.p-button-text:focus) {
  box-shadow: none;
}

:deep(.p-inputtext) {
  border-width: 1px;
}

:deep(.p-inputtext:focus) {
  outline: none;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.2);
}

:deep(.p-badge) {
  min-width: 1.25rem;
  height: 1.25rem;
  line-height: 1.25rem;
  font-size: 0.65rem;
}

/* Estilos para el menú de usuario */
:deep(.p-menu) {
  border-color: #d1fae5;
}

:deep(.p-menu .p-menuitem-link) {
  color: #047857;
}

:deep(.p-menu .p-menuitem-link:hover) {
  background-color: #d1fae5;
  color: #065f46;
}

:deep(.p-menu .p-menuitem-icon) {
  color: #10b981;
}
</style>