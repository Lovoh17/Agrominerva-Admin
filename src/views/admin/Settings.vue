<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-neutral-800 mb-2">Configuración</h1>
      <p class="text-neutral-600">Gestiona las preferencias y ajustes del sistema</p>
    </div>

    <!-- Settings Categories -->
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Sidebar Menu -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden sticky top-6">
          <div class="p-4 bg-gradient-to-r from-emerald-600 to-primary-600">
            <h3 class="text-white font-semibold flex items-center gap-2">
              <i class="pi pi-cog"></i>
              Categorías
            </h3>
          </div>
          <nav class="p-2">
            <button
              v-for="category in categories"
              :key="category.id"
              @click="activeCategory = category.id"
              :class="[
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left',
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'text-neutral-700 hover:bg-emerald-50'
              ]"
            >
              <i :class="`pi ${category.icon} text-lg`"></i>
              <span class="font-medium">{{ category.label }}</span>
            </button>
          </nav>
        </div>
      </div>

      <!-- Settings Content -->
      <div class="lg:col-span-3 space-y-6">
        <!-- General Settings -->
        <div v-if="activeCategory === 'general'" class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
          <div class="p-6 border-b border-neutral-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-building text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-neutral-800">Configuración General</h3>
                <p class="text-sm text-neutral-600">Información básica de la empresa</p>
              </div>
            </div>
          </div>
          <div class="p-6 space-y-6">
            <!-- Company Name -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Nombre de la Empresa</label>
              <input
                type="text"
                v-model="settings.companyName"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Email de Contacto</label>
              <input
                type="email"
                v-model="settings.companyEmail"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <!-- Phone -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Teléfono</label>
              <input
                type="tel"
                v-model="settings.companyPhone"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Dirección</label>
              <textarea
                v-model="settings.companyAddress"
                rows="3"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              ></textarea>
            </div>

            <!-- Language -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Idioma del Sistema</label>
              <select
                v-model="settings.language"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            <!-- Currency -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Moneda</label>
              <select
                v-model="settings.currency"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                <option value="USD">USD - Dólar Estadounidense</option>
                <option value="EUR">EUR - Euro</option>
                <option value="MXN">MXN - Peso Mexicano</option>
              </select>
            </div>

            <!-- Save Button -->
            <div class="flex justify-end pt-4">
              <button class="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>

        <!-- Notifications Settings -->
        <div v-if="activeCategory === 'notifications'" class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
          <div class="p-6 border-b border-neutral-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-bell text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-neutral-800">Notificaciones</h3>
                <p class="text-sm text-neutral-600">Configura las alertas del sistema</p>
              </div>
            </div>
          </div>
          <div class="p-6 space-y-4">
            <!-- Email Notifications -->
            <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="pi pi-envelope text-primary-600 text-xl"></i>
                <div>
                  <p class="font-medium text-neutral-800">Notificaciones por Email</p>
                  <p class="text-sm text-neutral-600">Recibe alertas en tu correo</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.emailNotifications" class="sr-only peer">
                <div class="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <!-- Push Notifications -->
            <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="pi pi-mobile text-primary-600 text-xl"></i>
                <div>
                  <p class="font-medium text-neutral-800">Notificaciones Push</p>
                  <p class="text-sm text-neutral-600">Alertas en tiempo real</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.pushNotifications" class="sr-only peer">
                <div class="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <!-- Low Stock Alerts -->
            <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="pi pi-exclamation-triangle text-accent-600 text-xl"></i>
                <div>
                  <p class="font-medium text-neutral-800">Alertas de Stock Bajo</p>
                  <p class="text-sm text-neutral-600">Notificación de inventario bajo</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.lowStockAlerts" class="sr-only peer">
                <div class="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <!-- Order Updates -->
            <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="pi pi-shopping-cart text-primary-600 text-xl"></i>
                <div>
                  <p class="font-medium text-neutral-800">Actualizaciones de Pedidos</p>
                  <p class="text-sm text-neutral-600">Cambios de estado en pedidos</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.orderUpdates" class="sr-only peer">
                <div class="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <div class="flex justify-end pt-4">
              <button class="px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md">
                Guardar Preferencias
              </button>
            </div>
          </div>
        </div>

        <!-- Security Settings -->
        <div v-if="activeCategory === 'security'" class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
          <div class="p-6 border-b border-neutral-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-shield text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-neutral-800">Seguridad</h3>
                <p class="text-sm text-neutral-600">Protege tu cuenta</p>
              </div>
            </div>
          </div>
          <div class="p-6 space-y-6">
            <!-- Change Password -->
            <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h4 class="font-semibold text-neutral-800 mb-4">Cambiar Contraseña</h4>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-neutral-700 mb-2">Contraseña Actual</label>
                  <input
                    type="password"
                    v-model="security.currentPassword"
                    class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-neutral-700 mb-2">Nueva Contraseña</label>
                  <input
                    type="password"
                    v-model="security.newPassword"
                    class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-neutral-700 mb-2">Confirmar Contraseña</label>
                  <input
                    type="password"
                    v-model="security.confirmPassword"
                    class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                  />
                </div>
                <button class="w-full px-6 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md">
                  Actualizar Contraseña
                </button>
              </div>
            </div>

            <!-- Two Factor Authentication -->
            <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="pi pi-lock text-primary-600 text-xl"></i>
                <div>
                  <p class="font-medium text-neutral-800">Autenticación de Dos Factores</p>
                  <p class="text-sm text-neutral-600">Capa extra de seguridad</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.twoFactorAuth" class="sr-only peer">
                <div class="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>

            <!-- Session Timeout -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Tiempo de Sesión (minutos)</label>
              <select
                v-model="settings.sessionTimeout"
                class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                <option value="15">15 minutos</option>
                <option value="30">30 minutos</option>
                <option value="60">1 hora</option>
                <option value="120">2 horas</option>
              </select>
            </div>
          </div>
        </div>

        <!-- System Settings -->
        <div v-if="activeCategory === 'system'" class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
          <div class="p-6 border-b border-neutral-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                <i class="pi pi-server text-white text-xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold text-neutral-800">Sistema</h3>
                <p class="text-sm text-neutral-600">Configuración técnica</p>
              </div>
            </div>
          </div>
          <div class="p-6 space-y-6">
            <!-- System Info -->
            <div class="grid grid-cols-2 gap-4">
              <div class="p-4 bg-neutral-50 rounded-lg">
                <p class="text-sm text-neutral-600 mb-1">Versión del Sistema</p>
                <p class="text-lg font-bold text-neutral-800">v1.0.0</p>
              </div>
              <div class="p-4 bg-neutral-50 rounded-lg">
                <p class="text-sm text-neutral-600 mb-1">Última Actualización</p>
                <p class="text-lg font-bold text-neutral-800">11 Nov 2024</p>
              </div>
              <div class="p-4 bg-neutral-50 rounded-lg">
                <p class="text-sm text-neutral-600 mb-1">Base de Datos</p>
                <p class="text-lg font-bold text-neutral-800">PostgreSQL</p>
              </div>
              <div class="p-4 bg-neutral-50 rounded-lg">
                <p class="text-sm text-neutral-600 mb-1">Usuarios Activos</p>
                <p class="text-lg font-bold text-neutral-800">6</p>
              </div>
            </div>

            <!-- Backup -->
            <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h4 class="font-semibold text-neutral-800">Respaldo Automático</h4>
                  <p class="text-sm text-neutral-600">Última copia: Hace 2 horas</p>
                </div>
                <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                  Respaldar Ahora
                </button>
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">Frecuencia de Respaldo</label>
                <select
                  v-model="settings.backupFrequency"
                  class="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="daily">Diario</option>
                  <option value="weekly">Semanal</option>
                  <option value="monthly">Mensual</option>
                </select>
              </div>
            </div>

            <!-- Maintenance Mode -->
            <div class="flex items-center justify-between p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
              <div class="flex items-center gap-3">
                <i class="pi pi-wrench text-secondary-600 text-xl"></i>
                <div>
                  <p class="font-medium text-neutral-800">Modo Mantenimiento</p>
                  <p class="text-sm text-neutral-600">Desactiva temporalmente el sistema</p>
                </div>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="settings.maintenanceMode" class="sr-only peer">
                <div class="w-11 h-6 bg-neutral-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-600"></div>
              </label>
            </div>

            <!-- Clear Cache -->
            <div class="flex gap-3">
              <button class="flex-1 px-4 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
                <i class="pi pi-trash"></i>
                Limpiar Caché
              </button>
              <button class="flex-1 px-4 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center gap-2">
                <i class="pi pi-refresh"></i>
                Reiniciar Sistema
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeCategory = ref('general')

const categories = [
  { id: 'general', label: 'General', icon: 'pi-building' },
  { id: 'notifications', label: 'Notificaciones', icon: 'pi-bell' },
  { id: 'security', label: 'Seguridad', icon: 'pi-shield' },
  { id: 'system', label: 'Sistema', icon: 'pi-server' }
]

const settings = ref({
  companyName: 'AgroMinerva',
  companyEmail: 'contacto@agrominerva.com',
  companyPhone: '+503 2234-5678',
  companyAddress: 'Apopa, San Salvador, El Salvador',
  language: 'es',
  currency: 'USD',
  emailNotifications: true,
  pushNotifications: true,
  lowStockAlerts: true,
  orderUpdates: true,
  twoFactorAuth: false,
  sessionTimeout: '30',
  backupFrequency: 'daily',
  maintenanceMode: false
})

const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
</script>