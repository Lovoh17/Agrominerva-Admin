<template>
  <header class="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-4 py-3 h-16">
    <div class="flex items-center justify-between h-full">
      <!-- Left Section -->
      <div class="flex items-center space-x-4 h-full">
        <Button icon="pi pi-bars" text rounded
          class="text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 h-10 w-10 flex items-center justify-center"
          @click="$emit('toggle-sidebar')" />
      </div>
      
      <!-- Right Section -->
      <div class="flex items-center space-x-3 h-full">
        <!-- Search -->
        <span class="p-input-icon-left flex items-center">
          <InputText v-model="searchQuery" placeholder="Buscar..." class="w-40 md:w-56 h-10" />
        </span>

        <!-- Notifications -->
        <Button icon="pi pi-bell" text rounded
          class="text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 relative h-10 w-10 flex items-center justify-center"
          @click="toggleNotifications">
          <Badge v-if="unreadNotifications > 0" :value="unreadNotifications" severity="danger"
            class="absolute -top-1 -right-1" />
        </Button>

        <!-- User Menu -->
        <Menu ref="userMenu" :model="userMenuItems" :popup="true">
          <template #start>
            <div class="px-4 py-2 border-b border-neutral-200 dark:border-neutral-700">
              <p class="font-semibold text-neutral-900 dark:text-white">Amy Elsner</p>
              <p class="text-sm text-neutral-500 dark:text-neutral-400">amy.elsner@example.com</p>
            </div>
          </template>
        </Menu>

        <Button :label="userDisplayName" icon="pi pi-user" text
          class="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 h-10 flex items-center"
          @click="toggleUserMenu">
          <template #icon>
            <Avatar image="/demo/images/avatar/amyelsner.png" shape="circle" size="normal" class="mr-2 h-8 w-8" />
          </template>
        </Button>

        <!-- Dark Mode Toggle -->
        <Button :icon="darkMode ? 'pi pi-sun' : 'pi pi-moon'" text rounded
          class="text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 h-10 w-10 flex items-center justify-center"
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
import Avatar from 'primevue/avatar'
import Badge from 'primevue/badge'

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