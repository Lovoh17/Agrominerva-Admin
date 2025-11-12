<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-neutral-800 mb-2">Reportes</h1>
      <p class="text-neutral-600">Análisis y estadísticas del sistema</p>
    </div>

    <!-- Date Range Selector -->
    <div class="bg-white rounded-lg shadow-soft p-6 mb-6 border border-emerald-100">
      <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div class="flex items-center gap-4 flex-wrap">
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">Período</label>
            <select
              v-model="selectedPeriod"
              @change="updateDateRange"
              class="px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
            >
              <option value="today">Hoy</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mes</option>
              <option value="quarter">Este Trimestre</option>
              <option value="year">Este Año</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>

          <div v-if="selectedPeriod === 'custom'" class="flex items-center gap-3">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Desde</label>
              <input
                type="date"
                v-model="startDate"
                class="px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Hasta</label>
              <input
                type="date"
                v-model="endDate"
                class="px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
            <i class="pi pi-refresh"></i>
            Actualizar
          </button>
          <button class="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md">
            <i class="pi pi-download"></i>
            Exportar Todo
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="(stat, index) in quickStats" :key="index" class="bg-white rounded-lg shadow-soft p-5 border border-emerald-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600 mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-neutral-800">{{ stat.value }}</p>
            <div class="flex items-center gap-1 mt-1">
              <i :class="[
                'pi text-xs',
                stat.trend === 'up' ? 'pi-arrow-up text-emerald-600' : 'pi-arrow-down text-secondary-600'
              ]"></i>
              <span :class="[
                'text-xs font-medium',
                stat.trend === 'up' ? 'text-emerald-600' : 'text-secondary-600'
              ]">{{ stat.change }}%</span>
            </div>
          </div>
          <div :class="`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`">
            <i :class="`pi ${stat.icon} text-white text-xl`"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Categories -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <!-- Sales Reports -->
      <div class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
        <div class="bg-gradient-to-r from-primary-600 to-emerald-600 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i class="pi pi-chart-line text-white text-xl"></i>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg">Reportes de Ventas</h3>
              <p class="text-emerald-100 text-sm">Análisis de ingresos</p>
            </div>
          </div>
        </div>
        <div class="p-4 space-y-2">
          <button
            v-for="report in salesReports"
            :key="report.id"
            @click="generateReport(report)"
            class="w-full flex items-center justify-between p-3 hover:bg-emerald-50 rounded-lg transition-colors group"
          >
            <div class="flex items-center gap-3">
              <i :class="`pi ${report.icon} text-primary-600`"></i>
              <div class="text-left">
                <p class="font-medium text-neutral-800">{{ report.name }}</p>
                <p class="text-xs text-neutral-500">{{ report.description }}</p>
              </div>
            </div>
            <i class="pi pi-chevron-right text-neutral-400 group-hover:text-primary-600 transition-colors"></i>
          </button>
        </div>
      </div>

      <!-- Inventory Reports -->
      <div class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
        <div class="bg-gradient-to-r from-emerald-600 to-primary-600 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i class="pi pi-box text-white text-xl"></i>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg">Reportes de Inventario</h3>
              <p class="text-emerald-100 text-sm">Control de stock</p>
            </div>
          </div>
        </div>
        <div class="p-4 space-y-2">
          <button
            v-for="report in inventoryReports"
            :key="report.id"
            @click="generateReport(report)"
            class="w-full flex items-center justify-between p-3 hover:bg-emerald-50 rounded-lg transition-colors group"
          >
            <div class="flex items-center gap-3">
              <i :class="`pi ${report.icon} text-emerald-600`"></i>
              <div class="text-left">
                <p class="font-medium text-neutral-800">{{ report.name }}</p>
                <p class="text-xs text-neutral-500">{{ report.description }}</p>
              </div>
            </div>
            <i class="pi pi-chevron-right text-neutral-400 group-hover:text-emerald-600 transition-colors"></i>
          </button>
        </div>
      </div>

      <!-- Financial Reports -->
      <div class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
        <div class="bg-gradient-to-r from-accent-500 to-accent-600 p-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <i class="pi pi-dollar text-white text-xl"></i>
            </div>
            <div>
              <h3 class="text-white font-semibold text-lg">Reportes Financieros</h3>
              <p class="text-accent-100 text-sm">Estado de cuentas</p>
            </div>
          </div>
        </div>
        <div class="p-4 space-y-2">
          <button
            v-for="report in financialReports"
            :key="report.id"
            @click="generateReport(report)"
            class="w-full flex items-center justify-between p-3 hover:bg-accent-50 rounded-lg transition-colors group"
          >
            <div class="flex items-center gap-3">
              <i :class="`pi ${report.icon} text-accent-600`"></i>
              <div class="text-left">
                <p class="font-medium text-neutral-800">{{ report.name }}</p>
                <p class="text-xs text-neutral-500">{{ report.description }}</p>
              </div>
            </div>
            <i class="pi pi-chevron-right text-neutral-400 group-hover:text-accent-600 transition-colors"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
      <div class="p-6 border-b border-neutral-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg font-semibold text-neutral-800">Reportes Recientes</h3>
            <p class="text-sm text-neutral-600">Últimos reportes generados</p>
          </div>
          <button class="text-primary-600 hover:text-primary-700 font-medium text-sm">
            Ver todos
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-neutral-50">
            <tr>
              <th class="text-left py-3 px-6 text-neutral-600 font-medium text-sm">Reporte</th>
              <th class="text-left py-3 px-6 text-neutral-600 font-medium text-sm">Categoría</th>
              <th class="text-left py-3 px-6 text-neutral-600 font-medium text-sm">Período</th>
              <th class="text-left py-3 px-6 text-neutral-600 font-medium text-sm">Generado</th>
              <th class="text-left py-3 px-6 text-neutral-600 font-medium text-sm">Generado Por</th>
              <th class="text-right py-3 px-6 text-neutral-600 font-medium text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr v-for="report in recentReports" :key="report.id" class="hover:bg-emerald-50/50 transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div :class="`w-10 h-10 ${report.categoryColor} rounded-lg flex items-center justify-center`">
                    <i :class="`pi ${report.icon} text-white`"></i>
                  </div>
                  <div>
                    <p class="font-medium text-neutral-800">{{ report.name }}</p>
                    <p class="text-xs text-neutral-500">{{ report.size }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <span :class="`inline-flex px-3 py-1 rounded-full text-sm font-medium ${report.categoryBadge}`">
                  {{ report.category }}
                </span>
              </td>
              <td class="py-4 px-6 text-neutral-700">
                {{ report.period }}
              </td>
              <td class="py-4 px-6 text-neutral-700">
                {{ report.generated }}
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center text-white text-xs font-semibold">
                    {{ report.userInitials }}
                  </div>
                  <span class="text-neutral-700">{{ report.user }}</span>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center justify-end gap-2">
                  <button class="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors" title="Ver">
                    <i class="pi pi-eye"></i>
                  </button>
                  <button class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors" title="Descargar">
                    <i class="pi pi-download"></i>
                  </button>
                  <button class="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors" title="Compartir">
                    <i class="pi pi-share-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Loading Modal -->
    <div v-if="isGenerating" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <div class="w-16 h-16 bg-gradient-to-r from-primary-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
          <i class="pi pi-file text-white text-2xl"></i>
        </div>
        <h3 class="text-xl font-semibold text-neutral-800 mb-2">Generando Reporte</h3>
        <p class="text-neutral-600 mb-4">{{ generatingReport }}</p>
        <div class="w-full bg-neutral-200 rounded-full h-2">
          <div class="bg-gradient-to-r from-primary-600 to-emerald-600 h-2 rounded-full transition-all duration-500" :style="{ width: `${progress}%` }"></div>
        </div>
        <p class="text-sm text-neutral-500 mt-2">{{ progress }}% completado</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedPeriod = ref('month')
const startDate = ref('')
const endDate = ref('')
const isGenerating = ref(false)
const generatingReport = ref('')
const progress = ref(0)

const quickStats = ref([
  {
    label: 'Reportes Generados',
    value: '245',
    change: 12.5,
    trend: 'up',
    color: 'bg-primary-500',
    icon: 'pi-file'
  },
  {
    label: 'Ventas del Período',
    value: '$45,890',
    change: 8.2,
    trend: 'up',
    color: 'bg-emerald-500',
    icon: 'pi-chart-line'
  },
  {
    label: 'Ingresos Netos',
    value: '$38,420',
    change: 3.1,
    trend: 'down',
    color: 'bg-accent-500',
    icon: 'pi-dollar'
  },
  {
    label: 'Productos Vendidos',
    value: '1,234',
    change: 15.7,
    trend: 'up',
    color: 'bg-secondary-500',
    icon: 'pi-shopping-cart'
  }
])

const salesReports = ref([
  {
    id: 1,
    name: 'Ventas por Período',
    description: 'Resumen de ventas diarias, semanales o mensuales',
    icon: 'pi-chart-line'
  },
  {
    id: 2,
    name: 'Top Productos',
    description: 'Productos más vendidos',
    icon: 'pi-star'
  },
  {
    id: 3,
    name: 'Ventas por Categoría',
    description: 'Distribución de ventas por categoría',
    icon: 'pi-tags'
  },
  {
    id: 4,
    name: 'Análisis de Clientes',
    description: 'Clientes más frecuentes y valoración',
    icon: 'pi-users'
  }
])

const inventoryReports = ref([
  {
    id: 5,
    name: 'Estado de Inventario',
    description: 'Stock actual de todos los productos',
    icon: 'pi-list'
  },
  {
    id: 6,
    name: 'Productos con Stock Bajo',
    description: 'Alerta de productos a reponer',
    icon: 'pi-exclamation-triangle'
  },
  {
    id: 7,
    name: 'Movimientos de Inventario',
    description: 'Entradas y salidas de stock',
    icon: 'pi-arrows-h'
  },
  {
    id: 8,
    name: 'Valor del Inventario',
    description: 'Valoración total del stock',
    icon: 'pi-money-bill'
  }
])

const financialReports = ref([
  {
    id: 9,
    name: 'Estado de Resultados',
    description: 'Ingresos y gastos del período',
    icon: 'pi-chart-bar'
  },
  {
    id: 10,
    name: 'Flujo de Caja',
    description: 'Movimientos de efectivo',
    icon: 'pi-wallet'
  },
  {
    id: 11,
    name: 'Cuentas por Cobrar',
    description: 'Pagos pendientes de clientes',
    icon: 'pi-clock'
  },
  {
    id: 12,
    name: 'Cuentas por Pagar',
    description: 'Deudas con proveedores',
    icon: 'pi-credit-card'
  }
])

const recentReports = ref([
  {
    id: 1,
    name: 'Ventas Octubre 2024',
    category: 'Ventas',
    categoryColor: 'bg-primary-500',
    categoryBadge: 'bg-primary-100 text-primary-700',
    icon: 'pi-chart-line',
    period: '01-31 Oct',
    generated: 'Hace 2 horas',
    user: 'Amy Elsner',
    userInitials: 'AE',
    size: '2.4 MB'
  },
  {
    id: 2,
    name: 'Stock Bajo',
    category: 'Inventario',
    categoryColor: 'bg-emerald-500',
    categoryBadge: 'bg-emerald-100 text-emerald-700',
    icon: 'pi-exclamation-triangle',
    period: 'Hoy',
    generated: 'Hace 5 horas',
    user: 'Carlos Martínez',
    userInitials: 'CM',
    size: '856 KB'
  },
  {
    id: 3,
    name: 'Estado Financiero Q3',
    category: 'Financiero',
    categoryColor: 'bg-accent-500',
    categoryBadge: 'bg-accent-100 text-accent-700',
    icon: 'pi-dollar',
    period: 'Jul-Sep 2024',
    generated: 'Hace 1 día',
    user: 'María Rodríguez',
    userInitials: 'MR',
    size: '3.1 MB'
  }
])

const updateDateRange = () => {
  // Lógica para actualizar el rango de fechas
  console.log('Período seleccionado:', selectedPeriod.value)
}

const generateReport = (report) => {
  isGenerating.value = true
  generatingReport.value = report.name
  progress.value = 0
  
  // Simular generación de reporte
  const interval = setInterval(() => {
    progress.value += 10
    if (progress.value >= 100) {
      clearInterval(interval)
      setTimeout(() => {
        isGenerating.value = false
        progress.value = 0
        // Aquí iría la lógica para descargar el reporte
        alert(`Reporte "${report.name}" generado exitosamente`)
      }, 500)
    }
  }, 200)
}
</script>