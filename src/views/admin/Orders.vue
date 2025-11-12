<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-neutral-800 mb-2">Gestión de Pedidos</h1>
      <p class="text-neutral-600">Administra y procesa los pedidos de clientes</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white rounded-lg shadow-soft p-5 border border-emerald-100">
        <div class="flex items-center justify-between mb-3">
          <div :class="`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`">
            <i :class="`pi ${stat.icon} text-white text-xl`"></i>
          </div>
          <span :class="`text-xs font-medium px-2 py-1 rounded-full ${stat.badgeClass}`">
            {{ stat.badge }}
          </span>
        </div>
        <p class="text-sm text-neutral-600 mb-1">{{ stat.label }}</p>
        <p class="text-2xl font-bold text-neutral-800">{{ stat.value }}</p>
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
            placeholder="Buscar por cliente, pedido..."
            v-model="searchTerm"
            class="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>

        <!-- Filters -->
        <div class="flex items-center gap-3 flex-wrap">
          <!-- Status Filter -->
          <select
            v-model="selectedStatus"
            class="px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
          >
            <option value="all">Todos los estados</option>
            <option value="pending">Pendiente</option>
            <option value="confirmed">Confirmado</option>
            <option value="processing">En Proceso</option>
            <option value="shipped">Enviado</option>
            <option value="delivered">Entregado</option>
            <option value="cancelled">Cancelado</option>
          </select>

          <!-- Date Filter -->
          <select
            v-model="dateFilter"
            class="px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
          >
            <option value="all">Todas las fechas</option>
            <option value="today">Hoy</option>
            <option value="week">Esta semana</option>
            <option value="month">Este mes</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
            <i class="pi pi-download"></i>
            Exportar
          </button>
          <button 
            @click="showNewOrderModal = true"
            class="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md"
          >
            <i class="pi pi-plus"></i>
            Nuevo Pedido
          </button>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-emerald-600 to-primary-600">
            <tr>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">ID Pedido</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Cliente</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Productos</th>
              <th class="text-right py-4 px-6 text-white font-semibold text-sm">Total</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Estado</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Fecha</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Entrega</th>
              <th class="text-right py-4 px-6 text-white font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-emerald-50/50 transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-emerald-600 flex items-center justify-center">
                    <i class="pi pi-shopping-cart text-white"></i>
                  </div>
                  <div>
                    <p class="font-semibold text-neutral-800">#{{ order.id }}</p>
                    <p class="text-xs text-neutral-500">{{ order.orderNumber }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <div>
                  <p class="font-medium text-neutral-800">{{ order.customer }}</p>
                  <p class="text-sm text-neutral-500">{{ order.customerEmail }}</p>
                  <p class="text-xs text-neutral-400 flex items-center gap-1 mt-1">
                    <i class="pi pi-phone text-[10px]"></i>
                    {{ order.customerPhone }}
                  </p>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex flex-col gap-1">
                  <p class="text-neutral-700">{{ order.itemCount }} producto(s)</p>
                  <p class="text-xs text-neutral-500">{{ order.mainProduct }}{{ order.itemCount > 1 ? ', +' + (order.itemCount - 1) : '' }}</p>
                </div>
              </td>
              <td class="py-4 px-6 text-right">
                <p class="font-bold text-primary-600 text-lg">${{ order.total.toFixed(2) }}</p>
              </td>
              <td class="py-4 px-6">
                <span :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
                  getStatusClass(order.status)
                ]">
                  <span :class="['w-2 h-2 rounded-full', getStatusDotColor(order.status)]"></span>
                  {{ getStatusText(order.status) }}
                </span>
              </td>
              <td class="py-4 px-6 text-neutral-700">
                <div class="flex flex-col gap-1">
                  <p class="font-medium">{{ order.date }}</p>
                  <p class="text-xs text-neutral-500">{{ order.time }}</p>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex flex-col gap-1">
                  <p class="text-neutral-700">{{ order.deliveryDate }}</p>
                  <p class="text-xs text-neutral-500">{{ order.deliveryMethod }}</p>
                </div>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center justify-end gap-2">
                  <button 
                    @click="viewOrderDetails(order)"
                    class="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    title="Ver detalles"
                  >
                    <i class="pi pi-eye"></i>
                  </button>
                  <button 
                    class="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Editar estado"
                  >
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button 
                    class="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
                    title="Imprimir"
                  >
                    <i class="pi pi-print"></i>
                  </button>
                  <button 
                    class="p-2 text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors"
                    title="Cancelar"
                  >
                    <i class="pi pi-times"></i>
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
          Mostrando <span class="font-semibold">{{ filteredOrders.length }}</span> de <span class="font-semibold">{{ orders.length }}</span> pedidos
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

    <!-- Order Details Modal -->
    <div v-if="selectedOrder" @click="selectedOrder = null" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Modal Header -->
        <div class="sticky top-0 bg-gradient-to-r from-emerald-600 to-primary-600 p-6 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <i class="pi pi-shopping-cart text-white text-xl"></i>
            </div>
            <div>
              <h3 class="text-white font-semibold text-xl">Pedido #{{ selectedOrder.id }}</h3>
              <p class="text-emerald-100 text-sm">{{ selectedOrder.orderNumber }}</p>
            </div>
          </div>
          <button @click="selectedOrder = null" class="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-6">
          <!-- Customer Info -->
          <div class="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
            <h4 class="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
              <i class="pi pi-user text-primary-600"></i>
              Información del Cliente
            </h4>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-neutral-600">Nombre</p>
                <p class="font-medium text-neutral-800">{{ selectedOrder.customer }}</p>
              </div>
              <div>
                <p class="text-sm text-neutral-600">Email</p>
                <p class="font-medium text-neutral-800">{{ selectedOrder.customerEmail }}</p>
              </div>
              <div>
                <p class="text-sm text-neutral-600">Teléfono</p>
                <p class="font-medium text-neutral-800">{{ selectedOrder.customerPhone }}</p>
              </div>
              <div>
                <p class="text-sm text-neutral-600">Dirección</p>
                <p class="font-medium text-neutral-800">{{ selectedOrder.address || 'No especificada' }}</p>
              </div>
            </div>
          </div>

          <!-- Order Items -->
          <div>
            <h4 class="font-semibold text-neutral-800 mb-3 flex items-center gap-2">
              <i class="pi pi-list text-primary-600"></i>
              Productos del Pedido
            </h4>
            <div class="border border-neutral-200 rounded-lg overflow-hidden">
              <table class="w-full">
                <thead class="bg-neutral-50">
                  <tr>
                    <th class="text-left py-3 px-4 text-neutral-600 text-sm font-medium">Producto</th>
                    <th class="text-center py-3 px-4 text-neutral-600 text-sm font-medium">Cantidad</th>
                    <th class="text-right py-3 px-4 text-neutral-600 text-sm font-medium">Precio</th>
                    <th class="text-right py-3 px-4 text-neutral-600 text-sm font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-neutral-200">
                  <tr v-for="item in selectedOrder.items" :key="item.id">
                    <td class="py-3 px-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <i class="pi pi-box text-primary-600"></i>
                        </div>
                        <div>
                          <p class="font-medium text-neutral-800">{{ item.name }}</p>
                          <p class="text-xs text-neutral-500">SKU: {{ item.sku }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="py-3 px-4 text-center font-medium text-neutral-800">{{ item.quantity }}</td>
                    <td class="py-3 px-4 text-right text-neutral-700">${{ item.price.toFixed(2) }}</td>
                    <td class="py-3 px-4 text-right font-semibold text-primary-600">${{ (item.quantity * item.price).toFixed(2) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="bg-neutral-50 rounded-lg p-4 space-y-2">
            <div class="flex justify-between text-neutral-700">
              <span>Subtotal</span>
              <span class="font-medium">${{ selectedOrder.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-neutral-700">
              <span>IVA (13%)</span>
              <span class="font-medium">${{ selectedOrder.tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-neutral-700">
              <span>Envío</span>
              <span class="font-medium">${{ selectedOrder.shipping.toFixed(2) }}</span>
            </div>
            <div class="border-t border-neutral-300 pt-2 flex justify-between text-lg font-bold text-neutral-800">
              <span>Total</span>
              <span class="text-primary-600">${{ selectedOrder.total.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Order Status and Actions -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <i class="pi pi-check"></i>
              Confirmar Pedido
            </button>
            <button class="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
              <i class="pi pi-print"></i>
              Imprimir Factura
            </button>
            <button class="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
              <i class="pi pi-times-circle"></i>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- New Order Modal Placeholder -->
    <div v-if="showNewOrderModal" @click="showNewOrderModal = false" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div @click.stop class="bg-white rounded-lg max-w-4xl w-full p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-2xl font-bold text-neutral-800">Nuevo Pedido</h3>
          <button @click="showNewOrderModal = false" class="text-neutral-400 hover:text-neutral-600">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
        <p class="text-neutral-600 text-center py-8">Formulario de nuevo pedido (por implementar)</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const selectedStatus = ref('all')
const dateFilter = ref('all')
const selectedOrder = ref(null)
const showNewOrderModal = ref(false)

const stats = ref([
  {
    label: 'Total Pedidos',
    value: '156',
    badge: 'Hoy',
    badgeClass: 'bg-primary-100 text-primary-700',
    color: 'bg-primary-500',
    icon: 'pi-shopping-cart'
  },
  {
    label: 'Pendientes',
    value: '23',
    badge: 'Procesar',
    badgeClass: 'bg-accent-100 text-accent-700',
    color: 'bg-accent-500',
    icon: 'pi-clock'
  },
  {
    label: 'En Proceso',
    value: '45',
    badge: 'Activos',
    badgeClass: 'bg-blue-100 text-blue-700',
    color: 'bg-blue-500',
    icon: 'pi-sync'
  },
  {
    label: 'Entregados',
    value: '78',
    badge: 'Este mes',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    color: 'bg-emerald-500',
    icon: 'pi-check-circle'
  },
  {
    label: 'Ventas Totales',
    value: '$12,450',
    badge: '+15%',
    badgeClass: 'bg-emerald-100 text-emerald-700',
    color: 'bg-primary-600',
    icon: 'pi-dollar'
  }
])

const orders = ref([
  {
    id: 1001,
    orderNumber: 'ORD-2024-1001',
    customer: 'Juan Pérez',
    customerEmail: 'juan.perez@email.com',
    customerPhone: '+503 7123-4567',
    address: 'San Salvador, El Salvador',
    itemCount: 3,
    mainProduct: 'Fertilizante NPK',
    total: 245.50,
    subtotal: 217.26,
    tax: 28.24,
    shipping: 0,
    status: 'pending',
    date: '11 Nov 2024',
    time: '10:30 AM',
    deliveryDate: '13 Nov 2024',
    deliveryMethod: 'Retiro en tienda',
    items: [
      { id: 1, name: 'Fertilizante NPK 15-15-15', sku: 'FT-102', quantity: 5, price: 32.50 },
      { id: 2, name: 'Semillas de Maíz Premium', sku: 'SM-001', quantity: 2, price: 45.99 },
      { id: 3, name: 'Insecticida Orgánico', sku: 'IN-203', quantity: 1, price: 78.00 }
    ]
  },
  {
    id: 1002,
    orderNumber: 'ORD-2024-1002',
    customer: 'María González',
    customerEmail: 'maria.gonzalez@email.com',
    customerPhone: '+503 7234-5678',
    address: 'Santa Ana, El Salvador',
    itemCount: 2,
    mainProduct: 'Semillas de Tomate',
    total: 184.75,
    subtotal: 163.50,
    tax: 21.25,
    shipping: 0,
    status: 'confirmed',
    date: '11 Nov 2024',
    time: '09:15 AM',
    deliveryDate: '12 Nov 2024',
    deliveryMethod: 'Envío a domicilio',
    items: [
      { id: 1, name: 'Semillas de Tomate Híbrido', sku: 'SM-607', quantity: 3, price: 52.00 },
      { id: 2, name: 'Sistema de Riego por Goteo', sku: 'EQ-506', quantity: 1, price: 350.00 }
    ]
  },
  {
    id: 1003,
    orderNumber: 'ORD-2024-1003',
    customer: 'Carlos Martínez',
    customerEmail: 'carlos.martinez@email.com',
    customerPhone: '+503 7345-6789',
    address: 'La Libertad, El Salvador',
    itemCount: 1,
    mainProduct: 'Tractor Agrícola',
    total: 15000.00,
    subtotal: 13274.34,
    tax: 1725.66,
    shipping: 0,
    status: 'processing',
    date: '10 Nov 2024',
    time: '02:45 PM',
    deliveryDate: '20 Nov 2024',
    deliveryMethod: 'Envío especializado',
    items: [
      { id: 1, name: 'Tractor Agrícola 50HP', sku: 'EQ-405', quantity: 1, price: 15000.00 }
    ]
  },
  {
    id: 1004,
    orderNumber: 'ORD-2024-1004',
    customer: 'Ana López',
    customerEmail: 'ana.lopez@email.com',
    customerPhone: '+503 7456-7890',
    address: 'San Miguel, El Salvador',
    itemCount: 4,
    mainProduct: 'Herbicida Selectivo',
    total: 367.25,
    subtotal: 325.00,
    tax: 42.25,
    shipping: 0,
    status: 'shipped',
    date: '09 Nov 2024',
    time: '11:20 AM',
    deliveryDate: '11 Nov 2024',
    deliveryMethod: 'Envío express',
    items: [
      { id: 1, name: 'Herbicida Selectivo', sku: 'HB-304', quantity: 5, price: 65.25 }
    ]
  },
  {
    id: 1005,
    orderNumber: 'ORD-2024-1005',
    customer: 'Roberto Flores',
    customerEmail: 'roberto.flores@email.com',
    customerPhone: '+503 7567-8901',
    address: 'Sonsonate, El Salvador',
    itemCount: 2,
    mainProduct: 'Fertilizante Orgánico',
    total: 128.50,
    subtotal: 113.72,
    tax: 14.78,
    shipping: 0,
    status: 'delivered',
    date: '08 Nov 2024',
    time: '03:30 PM',
    deliveryDate: '10 Nov 2024',
    deliveryMethod: 'Retiro en tienda',
    items: [
      { id: 1, name: 'Fertilizante Orgánico Compost', sku: 'FT-708', quantity: 4, price: 28.75 }
    ]
  },
  {
    id: 1006,
    orderNumber: 'ORD-2024-1006',
    customer: 'Luis Ramírez',
    customerEmail: 'luis.ramirez@email.com',
    customerPhone: '+503 7678-9012',
    address: 'Ahuachapán, El Salvador',
    itemCount: 1,
    mainProduct: 'Semillas de Maíz',
    total: 91.98,
    subtotal: 81.40,
    tax: 10.58,
    shipping: 0,
    status: 'cancelled',
    date: '07 Nov 2024',
    time: '08:00 AM',
    deliveryDate: 'Cancelado',
    deliveryMethod: 'N/A',
    items: [
      { id: 1, name: 'Semillas de Maíz Premium', sku: 'SM-001', quantity: 2, price: 45.99 }
    ]
  }
])

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      order.id.toString().includes(searchTerm.value)
    
    const matchesStatus = selectedStatus.value === 'all' || order.status === selectedStatus.value
    
    return matchesSearch && matchesStatus
  })
})

const getStatusText = (status) => {
  const statusMap = {
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    processing: 'En Proceso',
    shipped: 'Enviado',
    delivered: 'Entregado',
    cancelled: 'Cancelado'
  }
  return statusMap[status] || status
}

const getStatusClass = (status) => {
  const classMap = {
    pending: 'bg-accent-100 text-accent-700',
    confirmed: 'bg-blue-100 text-blue-700',
    processing: 'bg-primary-100 text-primary-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-emerald-100 text-emerald-700',
    cancelled: 'bg-secondary-100 text-secondary-700'
  }
  return classMap[status] || 'bg-neutral-100 text-neutral-700'
}

const getStatusDotColor = (status) => {
  const colorMap = {
    pending: 'bg-accent-500',
    confirmed: 'bg-blue-500',
    processing: 'bg-primary-500',
    shipped: 'bg-purple-500',
    delivered: 'bg-emerald-500',
    cancelled: 'bg-secondary-500'
  }
  return colorMap[status] || 'bg-neutral-500'
}

const viewOrderDetails = (order) => {
  selectedOrder.value = order
}
</script>