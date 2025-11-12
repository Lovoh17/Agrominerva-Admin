<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-neutral-800 mb-2">Lista de Empleados</h1>
      <p class="text-neutral-600">Gestiona el equipo de AgroMinerva</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white rounded-lg shadow-soft p-5 border border-emerald-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600 mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-neutral-800">{{ stat.value }}</p>
          </div>
          <div :class="`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`">
            <div class="w-6 h-6 bg-white/30 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="bg-white rounded-lg shadow-soft p-6 mb-6 border border-emerald-100">
      <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <!-- Search -->
        <div class="relative flex-1 max-w-md">
          <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"></i>
          <input
            type="text"
            placeholder="Buscar empleado..."
            v-model="searchTerm"
            class="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>

        <!-- Department Filter -->
        <div class="flex items-center gap-3">
          <i class="pi pi-filter text-neutral-500"></i>
          <select
            v-model="selectedDepartment"
            class="px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
          >
            <option value="all">Todos los departamentos</option>
            <option v-for="dept in departments.filter(d => d !== 'all')" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
            <i class="pi pi-download"></i>
            Exportar
          </button>
          <button class="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md">
            <i class="pi pi-user-plus"></i>
            Agregar Empleado
          </button>
        </div>
      </div>
    </div>

    <!-- Employee Table -->
    <div class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-emerald-600 to-primary-600">
            <tr>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Empleado</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Contacto</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Departamento</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Cargo</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Estado</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Fecha Ingreso</th>
              <th class="text-right py-4 px-6 text-white font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr v-for="employee in filteredEmployees" :key="employee.id" class="hover:bg-emerald-50/50 transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
                    {{ employee.avatar }}
                  </div>
                  <div>
                    <p class="font-semibold text-neutral-800">{{ employee.name }}</p>
                    <p class="text-sm text-neutral-500">ID: {{ employee.id }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="space-y-1">
                  <div class="flex items-center gap-2 text-sm text-neutral-600">
                    <i class="pi pi-envelope text-neutral-400 text-xs"></i>
                    {{ employee.email }}
                  </div>
                  <div class="flex items-center gap-2 text-sm text-neutral-600">
                    <i class="pi pi-phone text-neutral-400 text-xs"></i>
                    {{ employee.phone }}
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <span class="inline-flex px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  {{ employee.department }}
                </span>
              </td>
              <td class="py-4 px-6">
                <p class="text-neutral-700">{{ employee.position }}</p>
              </td>
              <td class="py-4 px-6">
                <span :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
                  employee.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-secondary-100 text-secondary-700'
                ]">
                  <span :class="[
                    'w-2 h-2 rounded-full',
                    employee.status === 'active' ? 'bg-emerald-500' : 'bg-secondary-500'
                  ]"></span>
                  {{ employee.status === 'active' ? 'Activo' : 'Inactivo' }}
                </span>
              </td>
              <td class="py-4 px-6 text-neutral-600">
                {{ formatDate(employee.joinDate) }}
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center justify-end gap-2">
                  <button class="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button class="p-2 text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors">
                    <i class="pi pi-trash"></i>
                  </button>
                  <button class="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                    <i class="pi pi-ellipsis-v"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between px-6 py-4 border-t border-neutral-200 bg-neutral-50">
        <p class="text-sm text-neutral-600">
          Mostrando <span class="font-semibold">{{ filteredEmployees.length }}</span> de <span class="font-semibold">{{ employees.length }}</span> empleados
        </p>
        <div class="flex gap-2">
          <button class="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-white transition-colors">
            Anterior
          </button>
          <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
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

// Datos de ejemplo
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
    department: 'Inventario',
    position: 'Supervisor de Inventario',
    status: 'active',
    avatar: 'MR',
    joinDate: '2023-05-10'
  },
  {
    id: 4,
    name: 'José García',
    email: 'jose.garcia@agrominerva.com',
    phone: '+503 7456-7890',
    department: 'Producción',
    position: 'Coordinador de Campo',
    status: 'inactive',
    avatar: 'JG',
    joinDate: '2022-11-05'
  },
  {
    id: 5,
    name: 'Ana López',
    email: 'ana.lopez@agrominerva.com',
    phone: '+503 7567-8901',
    department: 'Contabilidad',
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
    department: 'Logística',
    position: 'Jefe de Bodega',
    status: 'active',
    avatar: 'RF',
    joinDate: '2023-02-18'
  }
])

const departments = ['all', 'Administración', 'Ventas', 'Inventario', 'Producción', 'Contabilidad', 'Logística']

const filteredEmployees = computed(() => {
  return employees.value.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         emp.email.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesDepartment = selectedDepartment.value === 'all' || emp.department === selectedDepartment.value
    return matchesSearch && matchesDepartment
  })
})

const stats = computed(() => [
  { label: 'Total Empleados', value: employees.value.length, color: 'bg-primary-500' },
  { label: 'Activos', value: employees.value.filter(e => e.status === 'active').length, color: 'bg-emerald-500' },
  { label: 'Inactivos', value: employees.value.filter(e => e.status === 'inactive').length, color: 'bg-secondary-500' },
  { label: 'Nuevos (Este Mes)', value: 2, color: 'bg-accent-500' }
])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('es-SV', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}
</script>