<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Lista de Empleados</h1>
      <p class="text-gray-600 mt-2">Gestiona el equipo de AgroMinerva</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white rounded-md p-5 shadow-soft">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-600 mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
          </div>
          <div :class="`${stat.color} w-12 h-12 rounded-md flex items-center justify-center`">
            <div class="w-6 h-6 bg-white/30 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="bg-white rounded-md p-4 shadow-soft mb-6">
      <div class="flex flex-col lg:flex-row gap-3 items-start lg:items-center justify-between">
        <!-- Search -->
        <div class="flex-1">
          <div class="flex gap-3">
            <div class="flex-1">
              <input
                type="text"
                placeholder="Buscar empleado..."
                v-model="searchTerm"
                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md transition-colors">
              <i class="pi pi-search"></i>
            </button>
          </div>
        </div>

        <!-- Department Filter -->
        <div class="flex items-center gap-3">
          <select
            v-model="selectedDepartment"
            class="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
          >
            <option value="all">Todos los departamentos</option>
            <option v-for="dept in departments.filter(d => d !== 'all')" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button class="flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            <i class="pi pi-download"></i>
            Exportar
          </button>
          <button class="flex items-center gap-2 px-4 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            <i class="pi pi-user-plus"></i>
            Agregar Empleado
          </button>
        </div>
      </div>
    </div>

    <!-- Employee Table -->
    <div class="bg-white rounded-md p-4 shadow-soft">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Empleados Registrados</h3>
      <div class="max-h-[600px] overflow-y-auto">
        <table class="w-full">
          <thead class="sticky top-0 bg-white z-10">
            <tr class="border-b border-gray-200">
              <th class="text-left py-3 px-4 text-gray-700 font-semibold">Empleado</th>
              <th class="text-left py-3 px-4 text-gray-700 font-semibold">Contacto</th>
              <th class="text-left py-3 px-4 text-gray-700 font-semibold">Departamento</th>
              <th class="text-left py-3 px-4 text-gray-700 font-semibold">Cargo</th>
              <th class="text-left py-3 px-4 text-gray-700 font-semibold">Estado</th>
              <th class="text-left py-3 px-4 text-gray-700 font-semibold">Fecha Ingreso</th>
              <th class="text-left py-3 px-4 text-gray-700 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in filteredEmployees" :key="employee.id"
                class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td class="py-4 px-4">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                    <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm">
                      {{ employee.avatar }}
                    </div>
                  </div>
                  <div>
                    <span class="font-medium text-gray-900 text-lg">{{ employee.name }}</span>
                    <p class="text-sm text-gray-500">ID: {{ employee.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4">
                <div class="space-y-1">
                  <div class="text-base text-gray-600">{{ employee.email }}</div>
                  <div class="text-base text-gray-500">{{ employee.phone }}</div>
                </div>
              </td>
              <td class="py-4 px-4">
                <span class="text-base font-medium text-gray-700">{{ employee.department }}</span>
              </td>
              <td class="py-4 px-4">
                <span class="text-base text-gray-600">{{ employee.position }}</span>
              </td>
              <td class="py-4 px-4">
                <span :class="[
                  'px-4 py-2 rounded-md font-medium transition-colors text-base',
                  employee.status === 'active'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                ]">
                  {{ employee.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="py-4 px-4">
                <span class="text-base text-gray-500">{{ formatDate(employee.joinDate) }}</span>
              </td>
              <td class="py-4 px-4">
                <div class="flex items-center gap-2">
                  <button class="p-2 text-primary-600 hover:bg-primary-50 rounded-md transition-colors">
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button class="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors">
                    <i class="pi pi-trash"></i>
                  </button>
                  <button class="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors">
                    <i class="pi pi-ellipsis-v"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-4 py-4 border-t border-gray-200">
        <p class="text-sm text-gray-600">
          Mostrando <span class="font-semibold">{{ filteredEmployees.length }}</span> de <span class="font-semibold">{{ employees.length }}</span> empleados
        </p>
        <div class="flex gap-2">
          <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
            Anterior
          </button>
          <button class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const selectedDepartment = ref('all')

// Datos de ejemplo - Solo Administración y Ventas
const employees = ref([
  {
    id: 1,
    name: 'Amy Elsner',
    email: 'amy.elsner@agrominerva.com',
    phone: '+503 7123-4567',
    department: 'Administración',
    position: 'Administrador',
    status: 'active',
    avatar: 'AE',
    joinDate: '2023-01-15'
  },
  {
    id: 2,
    name: 'Carlos Martínez',
    email: 'carlos.martinez@agrominerva.com',
    phone: '+503 7234-5678',
    department: 'Ventas',
    position: 'Gerente de Ventas',
    status: 'active',
    avatar: 'CM',
    joinDate: '2023-03-20'
  },
  {
    id: 3,
    name: 'María Rodríguez',
    email: 'maria.rodriguez@agrominerva.com',
    phone: '+503 7345-6789',
    department: 'Administración',
    position: 'Asistente Administrativa',
    status: 'active',
    avatar: 'MR',
    joinDate: '2023-05-10'
  },
  {
    id: 4,
    name: 'José García',
    email: 'jose.garcia@agrominerva.com',
    phone: '+503 7456-7890',
    department: 'Ventas',
    position: 'Ejecutivo de Ventas',
    status: 'inactive',
    avatar: 'JG',
    joinDate: '2022-11-05'
  },
  {
    id: 5,
    name: 'Ana López',
    email: 'ana.lopez@agrominerva.com',
    phone: '+503 7567-8901',
    department: 'Administración',
    position: 'Contador',
    status: 'active',
    avatar: 'AL',
    joinDate: '2023-07-01'
  },
  {
    id: 6,
    name: 'Roberto Flores',
    email: 'roberto.flores@agrominerva.com',
    phone: '+503 7678-9012',
    department: 'Ventas',
    position: 'Representante Comercial',
    status: 'active',
    avatar: 'RF',
    joinDate: '2023-02-18'
  }
])

// Solo departamentos de Administración y Ventas
const departments = ['all', 'Administración', 'Ventas']

const filteredEmployees = computed(() => {
  return employees.value.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesDepartment = selectedDepartment.value === 'all' || emp.department === selectedDepartment.value
    return matchesSearch && matchesDepartment
  })
})

// Stats sin "Nuevos (Este Mes)"
const stats = computed(() => [
  { label: 'Total Empleados', value: employees.value.length, color: 'bg-primary-500' },
  { label: 'Activos', value: employees.value.filter(e => e.status === 'active').length, color: 'bg-emerald-500' },
  { label: 'Inactivos', value: employees.value.filter(e => e.status === 'inactive').length, color: 'bg-red-500' }
])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-SV', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}
</script>