<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
    <div class="max-w-7xl mx-auto space-y-6">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p class="text-gray-600">Bienvenido al panel de administración de AgroMinerva</p>
        </div>
        <Button 
          label="Generar Reporte" 
          icon="pi pi-download"
          class="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0" 
        />
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Card 1: Ventas Totales -->
        <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600 mb-2">Ventas Totales</p>
              <p class="text-3xl font-bold text-gray-900 mb-3">${{ stats.totalSales.toLocaleString() }}</p>
              <div class="flex items-center gap-2">
                <i class="pi pi-arrow-up text-emerald-600 text-sm"></i>
                <span class="text-sm font-semibold text-emerald-600">+12.5%</span>
                <span class="text-xs text-gray-500">vs mes anterior</span>
              </div>
            </div>
            <div class="bg-green-100 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <i class="pi pi-shopping-cart text-green-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <!-- Card 2: Ingresos -->
        <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600 mb-2">Ingresos</p>
              <p class="text-3xl font-bold text-gray-900 mb-3">${{ stats.income.toLocaleString() }}</p>
              <div class="flex items-center gap-2">
                <i class="pi pi-arrow-up text-emerald-600 text-sm"></i>
                <span class="text-sm font-semibold text-emerald-600">+8.2%</span>
                <span class="text-xs text-gray-500">vs mes anterior</span>
              </div>
            </div>
            <div class="bg-emerald-100 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <i class="pi pi-dollar text-emerald-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <!-- Card 3: Egresos -->
        <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600 mb-2">Egresos</p>
              <p class="text-3xl font-bold text-gray-900 mb-3">${{ stats.expenses.toLocaleString() }}</p>
              <div class="flex items-center gap-2">
                <i class="pi pi-arrow-down text-red-500 text-sm"></i>
                <span class="text-sm font-semibold text-red-500">-3.1%</span>
                <span class="text-xs text-gray-500">vs mes anterior</span>
              </div>
            </div>
            <div class="bg-amber-100 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <i class="pi pi-money-bill text-amber-600 text-2xl"></i>
            </div>
          </div>
        </div>

        <!-- Card 4: Clientes Activos -->
        <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600 mb-2">Clientes Activos</p>
              <p class="text-3xl font-bold text-gray-900 mb-3">{{ stats.activeClients }}</p>
              <div class="flex items-center gap-2">
                <i class="pi pi-arrow-up text-emerald-600 text-sm"></i>
                <span class="text-sm font-semibold text-emerald-600">+15</span>
                <span class="text-xs text-gray-500">nuevos este mes</span>
              </div>
            </div>
            <div class="bg-green-100 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <i class="pi pi-users text-green-600 text-2xl"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Ventas Mensuales Chart -->
        <div class="lg:col-span-2 bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Ventas Mensuales</h2>
            <Dropdown 
              v-model="selectedPeriod" 
              :options="periods" 
              optionLabel="label" 
              class="border-gray-300 rounded-lg hover:border-green-400"
            />
          </div>
          <Chart type="line" :data="salesChartData" :options="chartOptions" class="h-80" />
        </div>

        <!-- Distribución por Categoría -->
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Categorías Populares</h2>
          <Chart type="doughnut" :data="categoryChartData" :options="doughnutOptions" class="h-64" />
          
          <!-- Category Legend with Progress -->
          <div class="space-y-3 mt-6">
            <div v-for="(cat, idx) in categories" :key="idx">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-700">{{ cat.name }}</span>
                <span class="text-sm font-bold text-gray-900">{{ cat.value }}%</span>
              </div>
              <div class="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div 
                  :class="cat.color"
                  class="h-2 rounded-full transition-all duration-500"
                  :style="{ width: cat.value + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tables Row -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Últimos Pedidos -->
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Últimos Pedidos</h2>
            <Button 
              label="Ver Todos" 
              text 
              class="text-green-600 hover:text-green-700 font-semibold p-0" 
            />
          </div>
          <div class="space-y-1">
            <div 
              v-for="order in recentOrders" 
              :key="order.id"
              class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-0"
            >
              <div class="flex items-center gap-4 flex-1">
                <Avatar 
                  :label="order.customer[0]" 
                  shape="circle" 
                  size="large"
                  class="bg-green-100 text-green-700 font-bold"
                />
                <div>
                  <p class="font-semibold text-gray-900">{{ order.customer }}</p>
                  <p class="text-sm text-gray-500">Pedido #{{ order.id }}</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <p class="font-bold text-gray-900">${{ order.amount.toLocaleString() }}</p>
                <Tag 
                  :value="order.status" 
                  :severity="getStatusSeverity(order.status)"
                  class="font-semibold"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Productos Más Vendidos -->
        <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold text-gray-900">Productos Más Vendidos</h2>
            <Button 
              label="Ver Todos" 
              text 
              class="text-green-600 hover:text-green-700 font-semibold p-0" 
            />
          </div>
          <div class="space-y-4">
            <div 
              v-for="product in topProducts" 
              :key="product.id"
              class="p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
            >
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i class="pi pi-box text-green-600 text-2xl"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-semibold text-gray-900 truncate">{{ product.name }}</p>
                  <p class="text-sm text-gray-600">{{ product.sales }} vendidos</p>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <p class="text-lg font-bold text-green-600">${{ product.revenue.toLocaleString() }}</p>
                <div class="w-24 bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
                    :style="{ width: product.percentage + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="bg-white rounded-xl p-6 shadow-md border border-gray-100">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Actividad Reciente</h2>
        <Timeline :value="activities" class="customized-timeline">
          <template #marker="slotProps">
            <span 
              class="flex w-10 h-10 items-center justify-center text-white rounded-xl shadow-lg z-10"
              :class="getActivityColor(slotProps.item.type)"
            >
              <i :class="slotProps.item.icon"></i>
            </span>
          </template>
          <template #content="slotProps">
            <div class="py-2 pl-4">
              <p class="font-semibold text-gray-900 mb-1">{{ slotProps.item.title }}</p>
              <p class="text-sm text-gray-600 mb-2">{{ slotProps.item.description }}</p>
              <p class="text-xs text-gray-400 flex items-center gap-1">
                <i class="pi pi-clock"></i>
                {{ slotProps.item.time }}
              </p>
            </div>
          </template>
        </Timeline>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Chart from 'primevue/chart'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import Timeline from 'primevue/timeline'
import Dropdown from 'primevue/dropdown'

// Stats Data
const stats = ref({
  totalSales: 45890,
  income: 38420,
  expenses: 12340,
  activeClients: 234
})

// Period Selection
const selectedPeriod = ref({ label: 'Último Mes', value: 'month' })
const periods = ref([
  { label: 'Última Semana', value: 'week' },
  { label: 'Último Mes', value: 'month' },
  { label: 'Último Año', value: 'year' }
])

// Categories for legend
const categories = ref([
  { name: 'Semillas', value: 35, color: 'bg-green-500' },
  { name: 'Fertilizantes', value: 28, color: 'bg-emerald-500' },
  { name: 'Herramientas', value: 18, color: 'bg-emerald-700' },
  { name: 'Equipos', value: 12, color: 'bg-amber-500' },
  { name: 'Otros', value: 7, color: 'bg-gray-400' }
])

// Sales Chart Data
const salesChartData = ref({
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  datasets: [
    {
      label: 'Ventas 2024',
      data: [3200, 3800, 4100, 4500, 3900, 4200, 4800, 5100, 4700, 5200, 5500, 5800],
      fill: true,
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      borderWidth: 3
    },
    {
      label: 'Ventas 2023',
      data: [2800, 3200, 3500, 3800, 3400, 3700, 4000, 4300, 4000, 4400, 4600, 4800],
      fill: false,
      borderColor: '#d1fae5',
      backgroundColor: 'rgba(209, 250, 229, 0.2)',
      tension: 0.4,
      borderWidth: 2,
      borderDash: [5, 5]
    }
  ]
})

const chartOptions = ref({
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#1f2937',
        font: {
          weight: 'bold'
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#6b7280'
      },
      grid: {
        color: '#f3f4f6'
      }
    },
    y: {
      ticks: {
        color: '#6b7280'
      },
      grid: {
        color: '#f3f4f6'
      }
    }
  }
})

// Category Chart Data
const categoryChartData = ref({
  labels: ['Semillas', 'Fertilizantes', 'Herramientas', 'Equipos', 'Otros'],
  datasets: [
    {
      data: [35, 28, 18, 12, 7],
      backgroundColor: ['#10b981', '#059669', '#047857', '#f59e0b', '#9ca3af'],
      borderWidth: 0
    }
  ]
})

const doughnutOptions = ref({
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  }
})

// Recent Orders
const recentOrders = ref([
  { id: '1001', customer: 'Juan Pérez', amount: 1250, status: 'Completado' },
  { id: '1002', customer: 'María García', amount: 890, status: 'Pendiente' },
  { id: '1003', customer: 'Carlos López', amount: 2340, status: 'Completado' },
  { id: '1004', customer: 'Ana Martínez', amount: 670, status: 'En Proceso' },
  { id: '1005', customer: 'Luis Rodríguez', amount: 1580, status: 'Completado' }
])

// Top Products
const topProducts = ref([
  { id: 1, name: 'Fertilizante Orgánico Premium', sales: 245, revenue: 12250, percentage: 95 },
  { id: 2, name: 'Semillas de Maíz Híbrido', sales: 198, revenue: 9900, percentage: 78 },
  { id: 3, name: 'Sistema de Riego Automatizado', sales: 156, revenue: 15600, percentage: 62 },
  { id: 4, name: 'Herbicida Ecológico', sales: 134, revenue: 6700, percentage: 53 }
])

// Activities
const activities = ref([
  { 
    title: 'Nueva venta registrada', 
    description: 'Pedido #1005 por $1,580', 
    time: 'Hace 5 minutos',
    icon: 'pi pi-shopping-cart',
    type: 'sale'
  },
  { 
    title: 'Nuevo cliente registrado', 
    description: 'Roberto Sánchez se unió a la plataforma', 
    time: 'Hace 1 hora',
    icon: 'pi pi-user-plus',
    type: 'customer'
  },
  { 
    title: 'Inventario actualizado', 
    description: 'Se agregaron 50 unidades de Fertilizante Premium', 
    time: 'Hace 3 horas',
    icon: 'pi pi-box',
    type: 'inventory'
  },
  { 
    title: 'Reporte generado', 
    description: 'Reporte mensual de ventas completado', 
    time: 'Hace 5 horas',
    icon: 'pi pi-file',
    type: 'report'
  }
])

const getStatusSeverity = (status) => {
  switch (status) {
    case 'Completado':
      return 'success'
    case 'Pendiente':
      return 'warning'
    case 'En Proceso':
      return 'info'
    default:
      return null
  }
}

const getActivityColor = (type) => {
  switch (type) {
    case 'sale':
      return 'bg-emerald-500'
    case 'customer':
      return 'bg-green-600'
    case 'inventory':
      return 'bg-amber-500'
    case 'report':
      return 'bg-emerald-700'
    default:
      return 'bg-green-600'
  }
}
</script>

<style scoped>
/* Custom Tag Styles */
:deep(.p-tag) {
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
}

:deep(.p-tag.p-tag-success) {
  background-color: #10b981;
  color: white;
}

:deep(.p-tag.p-tag-warning) {
  background-color: #f59e0b;
  color: white;
}

:deep(.p-tag.p-tag-info) {
  background-color: #3b82f6;
  color: white;
}

/* Timeline Styles */
:deep(.p-timeline .p-timeline-event-connector) {
  background-color: #e5e7eb;
  width: 2px;
}

:deep(.p-timeline .p-timeline-event-marker) {
  border: none;
}

:deep(.p-timeline .p-timeline-event-content) {
  padding-left: 1rem;
}

/* Dropdown Styles */
:deep(.p-dropdown) {
  border-color: #d1d5db;
  border-radius: 0.5rem;
  transition: all 0.2s;
}

:deep(.p-dropdown:hover) {
  border-color: #10b981;
}

:deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight) {
  background-color: #d1fae5;
  color: #047857;
}

/* Button Styles */
:deep(.p-button.p-button-text) {
  padding: 0;
}

/* Avatar Styles */
:deep(.p-avatar) {
  font-weight: 700;
}
</style>