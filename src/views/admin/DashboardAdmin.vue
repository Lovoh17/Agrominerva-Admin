<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-emerald-900">Dashboard</h1>
        <p class="text-emerald-600 mt-1">Bienvenido al panel de administración</p>
      </div>
      <div class="mt-4 md:mt-0">
        <Button label="Generar Reporte" icon="pi pi-file-pdf" 
          class="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 shadow-lg" />
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Card 1: Ventas Totales -->
      <div class="bg-white border border-emerald-200 p-6 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-emerald-600">Ventas Totales</p>
            <p class="text-3xl font-bold text-emerald-900 mt-2">${{ stats.totalSales.toLocaleString() }}</p>
            <div class="flex items-center mt-2">
              <i class="pi pi-arrow-up text-green-600 text-sm mr-1"></i>
              <span class="text-sm font-semibold text-green-600">+12.5%</span>
              <span class="text-xs text-emerald-500 ml-2">vs mes anterior</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-emerald-100 flex items-center justify-center">
            <i class="pi pi-shopping-cart text-emerald-600 text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Card 2: Ingresos -->
      <div class="bg-white border border-emerald-200 p-6 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-emerald-600">Ingresos</p>
            <p class="text-3xl font-bold text-emerald-900 mt-2">${{ stats.income.toLocaleString() }}</p>
            <div class="flex items-center mt-2">
              <i class="pi pi-arrow-up text-green-600 text-sm mr-1"></i>
              <span class="text-sm font-semibold text-green-600">+8.2%</span>
              <span class="text-xs text-emerald-500 ml-2">vs mes anterior</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-green-100 flex items-center justify-center">
            <i class="pi pi-dollar text-green-600 text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Card 3: Egresos -->
      <div class="bg-white border border-emerald-200 p-6 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-emerald-600">Egresos</p>
            <p class="text-3xl font-bold text-emerald-900 mt-2">${{ stats.expenses.toLocaleString() }}</p>
            <div class="flex items-center mt-2">
              <i class="pi pi-arrow-down text-orange-600 text-sm mr-1"></i>
              <span class="text-sm font-semibold text-orange-600">-3.1%</span>
              <span class="text-xs text-emerald-500 ml-2">vs mes anterior</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-orange-100 flex items-center justify-center">
            <i class="pi pi-money-bill text-orange-600 text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Card 4: Clientes Activos -->
      <div class="bg-white border border-emerald-200 p-6 shadow-lg">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-emerald-600">Clientes Activos</p>
            <p class="text-3xl font-bold text-emerald-900 mt-2">{{ stats.activeClients }}</p>
            <div class="flex items-center mt-2">
              <i class="pi pi-arrow-up text-green-600 text-sm mr-1"></i>
              <span class="text-sm font-semibold text-green-600">+15</span>
              <span class="text-xs text-emerald-500 ml-2">nuevos este mes</span>
            </div>
          </div>
          <div class="w-12 h-12 bg-emerald-100 flex items-center justify-center">
            <i class="pi pi-users text-emerald-600 text-2xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Ventas Mensuales Chart -->
      <div class="lg:col-span-2 bg-white border border-emerald-200 p-6 shadow-lg">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-emerald-900">Ventas Mensuales</h2>
          <Dropdown v-model="selectedPeriod" :options="periods" optionLabel="label" 
            class="border-emerald-300" />
        </div>
        <Chart type="line" :data="salesChartData" :options="chartOptions" class="h-80" />
      </div>

      <!-- Distribución por Categoría -->
      <div class="bg-white border border-emerald-200 p-6 shadow-lg">
        <h2 class="text-xl font-bold text-emerald-900 mb-6">Categorías Populares</h2>
        <Chart type="doughnut" :data="categoryChartData" :options="doughnutOptions" class="h-80" />
      </div>
    </div>

    <!-- Tables Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Últimos Pedidos -->
      <div class="bg-white border border-emerald-200 p-6 shadow-lg">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-emerald-900">Últimos Pedidos</h2>
          <Button label="Ver Todos" text class="text-emerald-600 hover:text-green-600 font-semibold" />
        </div>
        <DataTable :value="recentOrders" class="border-0">
          <Column field="id" header="ID" class="text-emerald-700 font-semibold">
            <template #body="slotProps">
              <span class="text-emerald-600 font-mono">#{{ slotProps.data.id }}</span>
            </template>
          </Column>
          <Column field="customer" header="Cliente" class="text-emerald-700 font-semibold">
            <template #body="slotProps">
              <div class="flex items-center gap-2">
                <Avatar :label="slotProps.data.customer[0]" shape="circle" size="small" 
                  class="bg-emerald-100 text-emerald-700" />
                <span>{{ slotProps.data.customer }}</span>
              </div>
            </template>
          </Column>
          <Column field="amount" header="Monto" class="text-emerald-700 font-semibold">
            <template #body="slotProps">
              <span class="font-bold text-emerald-900">${{ slotProps.data.amount }}</span>
            </template>
          </Column>
          <Column field="status" header="Estado" class="text-emerald-700 font-semibold">
            <template #body="slotProps">
              <Tag :value="slotProps.data.status" 
                :severity="getStatusSeverity(slotProps.data.status)" />
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- Productos Más Vendidos -->
      <div class="bg-white border border-emerald-200 p-6 shadow-lg">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-emerald-900">Productos Más Vendidos</h2>
          <Button label="Ver Todos" text class="text-emerald-600 hover:text-green-600 font-semibold" />
        </div>
        <div class="space-y-4">
          <div v-for="product in topProducts" :key="product.id" 
            class="flex items-center justify-between p-4 border border-emerald-100 hover:border-emerald-300 transition-colors">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-emerald-100 flex items-center justify-center">
                <i class="pi pi-box text-emerald-600 text-xl"></i>
              </div>
              <div>
                <p class="font-semibold text-emerald-900">{{ product.name }}</p>
                <p class="text-sm text-emerald-600">{{ product.sales }} vendidos</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-emerald-900">${{ product.revenue }}</p>
              <div class="w-24 bg-emerald-100 h-2 mt-2">
                <div class="bg-green-600 h-2" :style="{ width: product.percentage + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Activity Feed -->
    <div class="bg-white border border-emerald-200 p-6 shadow-lg">
      <h2 class="text-xl font-bold text-emerald-900 mb-4">Actividad Reciente</h2>
      <Timeline :value="activities" class="customized-timeline">
        <template #marker="slotProps">
          <span class="flex w-8 h-8 items-center justify-center text-white border-2 z-10"
            :class="getActivityColor(slotProps.item.type)">
            <i :class="slotProps.item.icon"></i>
          </span>
        </template>
        <template #content="slotProps">
          <div class="py-2">
            <p class="font-semibold text-emerald-900">{{ slotProps.item.title }}</p>
            <p class="text-sm text-emerald-600 mt-1">{{ slotProps.item.description }}</p>
            <p class="text-xs text-emerald-500 mt-2">{{ slotProps.item.time }}</p>
          </div>
        </template>
      </Timeline>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import Chart from 'primevue/chart'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
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
        color: '#047857',
        font: {
          weight: 'bold'
        }
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#059669'
      },
      grid: {
        color: '#d1fae5'
      }
    },
    y: {
      ticks: {
        color: '#059669'
      },
      grid: {
        color: '#d1fae5'
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
      backgroundColor: ['#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
      borderWidth: 0
    }
  ]
})

const doughnutOptions = ref({
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#047857',
        font: {
          weight: 'bold'
        }
      },
      position: 'bottom'
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
      return 'bg-green-600 border-green-600'
    case 'customer':
      return 'bg-emerald-600 border-emerald-600'
    case 'inventory':
      return 'bg-orange-600 border-orange-600'
    case 'report':
      return 'bg-emerald-700 border-emerald-700'
    default:
      return 'bg-emerald-600 border-emerald-600'
  }
}
</script>

<style scoped>
/* Custom Tag Styles */
:deep(.p-tag) {
  font-weight: 600;
}

:deep(.p-tag.p-tag-success) {
  background-color: #10b981;
}

:deep(.p-tag.p-tag-warning) {
  background-color: #f59e0b;
}

:deep(.p-tag.p-tag-info) {
  background-color: #059669;
}

/* DataTable Styles */
:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #d1fae5;
  color: #047857;
  font-weight: bold;
  border-bottom: 2px solid #10b981;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  transition: background-color 0.2s;
}

:deep(.p-datatable .p-datatable-tbody > tr:hover) {
  background-color: #d1fae5;
}

/* Timeline Styles */
:deep(.p-timeline .p-timeline-event-connector) {
  background-color: #d1fae5;
}

:deep(.p-timeline .p-timeline-event-marker) {
  border: none;
}

/* Dropdown Styles */
:deep(.p-dropdown) {
  border-color: #a7f3d0;
}

:deep(.p-dropdown:hover) {
  border-color: #10b981;
}

:deep(.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight) {
  background-color: #d1fae5;
  color: #047857;
}
</style>