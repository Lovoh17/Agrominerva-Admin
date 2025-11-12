<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-neutral-800 mb-2">Inventario</h1>
      <p class="text-neutral-600">Control de stock y productos disponibles</p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="(stat, index) in stats" :key="index" class="bg-white rounded-lg shadow-soft p-5 border border-emerald-100">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600 mb-1">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-neutral-800">{{ stat.value }}</p>
            <div v-if="stat.change" class="flex items-center gap-1 mt-1">
              <i :class="[
                'pi text-xs',
                stat.change > 0 ? 'pi-arrow-up text-emerald-600' : 'pi-arrow-down text-secondary-600'
              ]"></i>
              <span :class="[
                'text-xs font-medium',
                stat.change > 0 ? 'text-emerald-600' : 'text-secondary-600'
              ]">{{ Math.abs(stat.change) }}%</span>
              <span class="text-xs text-neutral-500">vs mes anterior</span>
            </div>
          </div>
          <div :class="`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`">
            <i :class="`pi ${stat.icon} text-white text-xl`"></i>
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
            placeholder="Buscar producto..."
            v-model="searchTerm"
            class="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>

        <!-- Filters -->
        <div class="flex items-center gap-3 flex-wrap">
          <!-- Category Filter -->
          <select
            v-model="selectedCategory"
            class="px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
          >
            <option value="all">Todas las categorías</option>
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>

          <!-- Stock Status Filter -->
          <select
            v-model="stockFilter"
            class="px-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
          >
            <option value="all">Todos los estados</option>
            <option value="high">Stock Alto</option>
            <option value="medium">Stock Medio</option>
            <option value="low">Stock Bajo</option>
            <option value="out">Sin Stock</option>
          </select>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <button class="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors">
            <i class="pi pi-download"></i>
            Exportar
          </button>
          <button class="flex items-center gap-2 px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md">
            <i class="pi pi-plus"></i>
            Agregar Producto
          </button>
        </div>
      </div>
    </div>

    <!-- Alerts -->
    <div v-if="lowStockProducts.length > 0" class="bg-secondary-50 border-l-4 border-secondary-500 p-4 mb-6 rounded-lg">
      <div class="flex items-start">
        <i class="pi pi-exclamation-triangle text-secondary-600 text-xl mr-3 mt-0.5"></i>
        <div>
          <h3 class="text-secondary-800 font-semibold mb-1">Alerta de Stock Bajo</h3>
          <p class="text-secondary-700 text-sm">
            {{ lowStockProducts.length }} producto(s) con stock bajo o agotado. Considera realizar un pedido.
          </p>
        </div>
      </div>
    </div>

    <!-- View Toggle -->
    <div class="flex justify-end mb-4">
      <div class="inline-flex rounded-lg border border-neutral-300 bg-white p-1">
        <button
          @click="viewMode = 'grid'"
          :class="[
            'px-4 py-2 rounded-md transition-colors',
            viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          ]"
        >
          <i class="pi pi-th-large"></i>
        </button>
        <button
          @click="viewMode = 'table'"
          :class="[
            'px-4 py-2 rounded-md transition-colors',
            viewMode === 'table' ? 'bg-primary-600 text-white' : 'text-neutral-600 hover:bg-neutral-100'
          ]"
        >
          <i class="pi pi-list"></i>
        </button>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden hover:shadow-lg transition-shadow"
      >
        <!-- Product Image -->
        <div class="relative h-48 bg-gradient-to-br from-emerald-100 to-primary-100 flex items-center justify-center">
          <i :class="`pi ${product.icon} text-6xl text-primary-600`"></i>
          <div :class="[
            'absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium',
            getStockStatusClass(product.stock, product.minStock)
          ]">
            {{ getStockStatus(product.stock, product.minStock) }}
          </div>
        </div>

        <!-- Product Info -->
        <div class="p-4">
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1">
              <h3 class="font-semibold text-neutral-800 mb-1">{{ product.name }}</h3>
              <p class="text-sm text-neutral-600">SKU: {{ product.sku }}</p>
            </div>
          </div>

          <div class="flex items-center gap-2 mb-3">
            <span class="inline-flex px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
              {{ product.category }}
            </span>
          </div>

          <!-- Stock Bar -->
          <div class="mb-3">
            <div class="flex justify-between text-xs text-neutral-600 mb-1">
              <span>Stock</span>
              <span class="font-medium">{{ product.stock }} {{ product.unit }}</span>
            </div>
            <div class="w-full bg-neutral-200 rounded-full h-2">
              <div
                :class="[
                  'h-2 rounded-full transition-all',
                  getStockBarColor(product.stock, product.minStock)
                ]"
                :style="{ width: `${Math.min((product.stock / (product.minStock * 3)) * 100, 100)}%` }"
              ></div>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Mínimo: {{ product.minStock }} {{ product.unit }}</p>
          </div>

          <!-- Price and Actions -->
          <div class="flex items-center justify-between pt-3 border-t border-neutral-200">
            <div>
              <p class="text-lg font-bold text-primary-600">${{ product.price.toFixed(2) }}</p>
              <p class="text-xs text-neutral-500">por {{ product.unit }}</p>
            </div>
            <div class="flex gap-2">
              <button class="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                <i class="pi pi-pencil"></i>
              </button>
              <button class="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                <i class="pi pi-eye"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table View -->
    <div v-else class="bg-white rounded-lg shadow-soft border border-emerald-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gradient-to-r from-emerald-600 to-primary-600">
            <tr>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Producto</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Categoría</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">SKU</th>
              <th class="text-right py-4 px-6 text-white font-semibold text-sm">Stock</th>
              <th class="text-right py-4 px-6 text-white font-semibold text-sm">Stock Mínimo</th>
              <th class="text-right py-4 px-6 text-white font-semibold text-sm">Precio</th>
              <th class="text-left py-4 px-6 text-white font-semibold text-sm">Estado</th>
              <th class="text-right py-4 px-6 text-white font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-emerald-50/50 transition-colors">
              <td class="py-4 px-6">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-primary-100 flex items-center justify-center">
                    <i :class="`pi ${product.icon} text-primary-600`"></i>
                  </div>
                  <div>
                    <p class="font-semibold text-neutral-800">{{ product.name }}</p>
                    <p class="text-xs text-neutral-500">{{ product.unit }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 px-6">
                <span class="inline-flex px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  {{ product.category }}
                </span>
              </td>
              <td class="py-4 px-6 text-neutral-700 font-mono text-sm">
                {{ product.sku }}
              </td>
              <td class="py-4 px-6 text-right">
                <span class="font-semibold text-neutral-800">{{ product.stock }}</span>
                <span class="text-neutral-500 text-sm ml-1">{{ product.unit }}</span>
              </td>
              <td class="py-4 px-6 text-right text-neutral-600">
                {{ product.minStock }} {{ product.unit }}
              </td>
              <td class="py-4 px-6 text-right">
                <span class="font-bold text-primary-600">${{ product.price.toFixed(2) }}</span>
              </td>
              <td class="py-4 px-6">
                <span :class="[
                  'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium',
                  getStockStatusClass(product.stock, product.minStock)
                ]">
                  <span :class="[
                    'w-2 h-2 rounded-full',
                    getStockDotColor(product.stock, product.minStock)
                  ]"></span>
                  {{ getStockStatus(product.stock, product.minStock) }}
                </span>
              </td>
              <td class="py-4 px-6">
                <div class="flex items-center justify-end gap-2">
                  <button class="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <i class="pi pi-pencil"></i>
                  </button>
                  <button class="p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                    <i class="pi pi-eye"></i>
                  </button>
                  <button class="p-2 text-secondary-600 hover:bg-secondary-50 rounded-lg transition-colors">
                    <i class="pi pi-trash"></i>
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
          Mostrando <span class="font-semibold">{{ filteredProducts.length }}</span> de <span class="font-semibold">{{ products.length }}</span> productos
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
const selectedCategory = ref('all')
const stockFilter = ref('all')
const viewMode = ref('grid')

const products = ref([
  {
    id: 1,
    name: 'Semillas de Maíz Premium',
    sku: 'SM-001',
    category: 'Semillas',
    stock: 250,
    minStock: 50,
    price: 45.99,
    unit: 'kg',
    icon: 'pi-box'
  },
  {
    id: 2,
    name: 'Fertilizante NPK 15-15-15',
    sku: 'FT-102',
    category: 'Fertilizantes',
    stock: 180,
    minStock: 100,
    price: 32.50,
    unit: 'kg',
    icon: 'pi-sparkles'
  },
  {
    id: 3,
    name: 'Insecticida Orgánico',
    sku: 'IN-203',
    category: 'Herramientas',
    stock: 25,
    minStock: 30,
    price: 78.00,
    unit: 'lt',
    icon: 'pi-shield'
  },
  {
    id: 4,
    name: 'Herbicida Selectivo',
    sku: 'HB-304',
    category: 'Herramientas',
    stock: 5,
    minStock: 20,
    price: 65.25,
    unit: 'lt',
    icon: 'pi-leaf'
  },
  {
    id: 5,
    name: 'Tractor Agrícola 50HP',
    sku: 'EQ-405',
    category: 'Equipos',
    stock: 3,
    minStock: 2,
    price: 15000.00,
    unit: 'unidad',
    icon: 'pi-cog'
  },
  {
    id: 6,
    name: 'Sistema de Riego por Goteo',
    sku: 'EQ-506',
    category: 'Equipos',
    stock: 45,
    minStock: 15,
    price: 350.00,
    unit: 'mts',
    icon: 'pi-filter'
  },
  {
    id: 7,
    name: 'Semillas de Tomate Híbrido',
    sku: 'SM-607',
    category: 'Semillas',
    stock: 120,
    minStock: 40,
    price: 52.00,
    unit: 'kg',
    icon: 'pi-sun'
  },
  {
    id: 8,
    name: 'Fertilizante Orgánico Compost',
    sku: 'FT-708',
    category: 'Fertilizantes',
    stock: 0,
    minStock: 80,
    price: 28.75,
    unit: 'kg',
    icon: 'pi-globe'
  }
])

const categories = computed(() => {
  return [...new Set(products.value.map(p => p.category))]
})

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'all' || product.category === selectedCategory.value
    
    let matchesStock = true
    if (stockFilter.value !== 'all') {
      const stockPercentage = (product.stock / product.minStock) * 100
      if (stockFilter.value === 'high') matchesStock = stockPercentage > 150
      else if (stockFilter.value === 'medium') matchesStock = stockPercentage > 100 && stockPercentage <= 150
      else if (stockFilter.value === 'low') matchesStock = stockPercentage > 0 && stockPercentage <= 100
      else if (stockFilter.value === 'out') matchesStock = product.stock === 0
    }
    
    return matchesSearch && matchesCategory && matchesStock
  })
})

const lowStockProducts = computed(() => {
  return products.value.filter(p => p.stock <= p.minStock)
})

const stats = computed(() => {
  const totalValue = products.value.reduce((sum, p) => sum + (p.stock * p.price), 0)
  return [
    { 
      label: 'Total Productos', 
      value: products.value.length, 
      color: 'bg-primary-500',
      icon: 'pi-box',
      change: 5.2
    },
    { 
      label: 'Valor Inventario', 
      value: `$${totalValue.toFixed(0)}`, 
      color: 'bg-emerald-500',
      icon: 'pi-dollar',
      change: 12.5
    },
    { 
      label: 'Stock Bajo', 
      value: lowStockProducts.value.length, 
      color: 'bg-secondary-500',
      icon: 'pi-exclamation-triangle',
      change: -3.1
    },
    { 
      label: 'Categorías', 
      value: categories.value.length, 
      color: 'bg-accent-500',
      icon: 'pi-tag'
    }
  ]
})

const getStockStatus = (stock, minStock) => {
  if (stock === 0) return 'Sin Stock'
  if (stock <= minStock * 0.5) return 'Crítico'
  if (stock <= minStock) return 'Bajo'
  if (stock <= minStock * 1.5) return 'Medio'
  return 'Alto'
}

const getStockStatusClass = (stock, minStock) => {
  if (stock === 0) return 'bg-neutral-100 text-neutral-700'
  if (stock <= minStock * 0.5) return 'bg-secondary-100 text-secondary-700'
  if (stock <= minStock) return 'bg-accent-100 text-accent-700'
  if (stock <= minStock * 1.5) return 'bg-blue-100 text-blue-700'
  return 'bg-emerald-100 text-emerald-700'
}

const getStockBarColor = (stock, minStock) => {
  if (stock === 0) return 'bg-neutral-400'
  if (stock <= minStock * 0.5) return 'bg-secondary-500'
  if (stock <= minStock) return 'bg-accent-500'
  if (stock <= minStock * 1.5) return 'bg-blue-500'
  return 'bg-emerald-500'
}

const getStockDotColor = (stock, minStock) => {
  if (stock === 0) return 'bg-neutral-500'
  if (stock <= minStock * 0.5) return 'bg-secondary-500'
  if (stock <= minStock) return 'bg-accent-500'
  if (stock <= minStock * 1.5) return 'bg-blue-500'
  return 'bg-emerald-500'
}
</script>