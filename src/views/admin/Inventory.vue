<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 p-4 md:p-6">
    <div class="max-w-7xl mx-auto space-y-6 md:space-y-8">
      <!-- Header Mejorado -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6 p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50">
        <div class="flex-1">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
              <i class="pi pi-box text-white text-xl"></i>
            </div>
            <div>
              <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 to-primary-700 bg-clip-text text-transparent">
                Gestión de Inventario
              </h1>
              <p class="text-slate-600 mt-1 text-sm md:text-base">Control y monitoreo de stock en tiempo real</p>
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <button class="group flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:shadow-lg transition-all duration-300 font-semibold shadow-sm">
            <i class="pi pi-download text-slate-500 group-hover:text-primary-600 transition-colors"></i>
            Exportar Reporte
            <i class="pi pi-chevron-down text-xs ml-1"></i>
          </button>
          <button class="group flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary-600 via-primary-500 to-emerald-600 text-white rounded-xl hover:from-primary-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold hover:scale-[1.02]">
            <i class="pi pi-plus group-hover:rotate-90 transition-transform duration-300"></i>
            Nuevo Producto
          </button>
        </div>
      </div>

      <!-- Stats Cards Mejoradas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div 
          v-for="(stat, index) in enhancedStats" 
          :key="index" 
          class="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-xl border border-white/50 transition-all duration-500 hover:-translate-y-1"
        >
          <!-- Background Gradient Effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-white to-slate-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="relative z-10 flex items-start justify-between">
            <div class="flex-1">
              <p class="text-sm font-semibold text-slate-500 mb-2">{{ stat.label }}</p>
              <p class="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{{ stat.value }}</p>
              <div v-if="stat.change" class="flex items-center gap-2">
                <div :class="[
                  'p-1 rounded-lg',
                  stat.change > 0 ? 'bg-emerald-100' : 'bg-red-100'
                ]">
                  <i :class="[
                    'pi text-xs',
                    stat.change > 0 ? 'pi-arrow-up text-emerald-600' : 'pi-arrow-down text-red-500'
                  ]"></i>
                </div>
                <span :class="[
                  'text-sm font-semibold',
                  stat.change > 0 ? 'text-emerald-600' : 'text-red-500'
                ]">{{ Math.abs(stat.change) }}%</span>
                <span class="text-xs text-slate-500">vs mes anterior</span>
              </div>
              <div v-else class="h-6"></div>
            </div>
            <div :class="[
              'p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300',
              stat.gradient
            ]">
              <i :class="`pi ${stat.icon} text-white text-xl md:text-2xl`"></i>
            </div>
          </div>
          
          <!-- Progress Bar for Stock Status -->
          <div v-if="stat.progress" class="relative z-10 mt-4">
            <div class="flex justify-between text-xs text-slate-500 mb-2">
              <span>Nivel de stock</span>
              <span>{{ stat.progress }}%</span>
            </div>
            <div class="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div 
                :class="stat.progressColor"
                class="h-2 rounded-full transition-all duration-1000 ease-out"
                :style="{ width: `${stat.progress}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Alert System Mejorado -->
      <div v-if="lowStockProducts.length > 0" class="relative overflow-hidden">
        <div class="bg-gradient-to-r from-red-50/80 via-orange-50/80 to-amber-50/80 backdrop-blur-sm border-l-4 border-red-500 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
          <div class="flex items-start gap-4">
            <div class="bg-gradient-to-br from-red-500 to-orange-500 p-3 rounded-xl flex-shrink-0 shadow-lg">
              <i class="pi pi-exclamation-triangle text-white text-xl"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-red-900 font-bold text-lg">Alerta de Stock Crítico</h3>
                <span class="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                  {{ lowStockProducts.length }} producto(s)
                </span>
              </div>
              <p class="text-red-800 mb-3 text-sm">
                {{ getCriticalProductsCount() }} producto(s) requieren atención inmediata. 
                {{ getLowStockCount() }} producto(s) están por debajo del nivel mínimo.
              </p>
              <div class="flex gap-3">
                <button class="text-sm font-semibold text-red-700 hover:text-red-900 underline underline-offset-2 transition-colors">
                  Ver productos afectados →
                </button>
                <button class="text-sm font-semibold text-primary-600 hover:text-primary-800 transition-colors">
                  Generar orden de compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters and Search Mejorado -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
        <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <!-- Search Bar Mejorada -->
          <div class="relative flex-1 max-w-md">
            <i class="pi pi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              placeholder="Buscar productos, SKU o categorías..."
              v-model="searchTerm"
              class="w-full pl-12 pr-4 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all hover:border-slate-400 bg-white/50 backdrop-blur"
            />
            <div v-if="searchTerm" class="absolute right-3 top-1/2 transform -translate-y-1/2">
              <button @click="searchTerm = ''" class="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                <i class="pi pi-times text-sm"></i>
              </button>
            </div>
          </div>

          <!-- Filters Mejorados -->
          <div class="flex items-center gap-3 flex-wrap">
            <!-- Category Filter -->
            <div class="relative">
              <i class="pi pi-tag absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10"></i>
              <select
                v-model="selectedCategory"
                class="pl-10 pr-8 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-white/50 backdrop-blur hover:border-slate-400 transition-colors font-medium text-slate-700 appearance-none"
              >
                <option value="all">Todas las categorías</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
              <i class="pi pi-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"></i>
            </div>

            <!-- Stock Status Filter -->
            <div class="relative">
              <i class="pi pi-chart-bar absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 z-10"></i>
              <select
                v-model="stockFilter"
                class="pl-10 pr-8 py-3.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none bg-white/50 backdrop-blur hover:border-slate-400 transition-colors font-medium text-slate-700 appearance-none"
              >
                <option value="all">Todos los estados</option>
                <option value="high">✅ Stock Alto</option>
                <option value="medium">📈 Stock Medio</option>
                <option value="low">⚠️ Stock Bajo</option>
                <option value="out">❌ Sin Stock</option>
              </select>
              <i class="pi pi-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none"></i>
            </div>
          </div>

          <!-- View Toggle Mejorado -->
          <div class="inline-flex rounded-xl border border-slate-300 bg-white/50 backdrop-blur p-1 shadow-sm">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'px-4 py-2 rounded-lg transition-all duration-300 font-semibold flex items-center gap-2',
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-primary-600 to-emerald-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              ]"
            >
              <i class="pi pi-th-large"></i>
              <span class="hidden sm:inline">Grid</span>
            </button>
            <button
              @click="viewMode = 'table'"
              :class="[
                'px-4 py-2 rounded-lg transition-all duration-300 font-semibold flex items-center gap-2',
                viewMode === 'table' 
                  ? 'bg-gradient-to-r from-primary-600 to-emerald-600 text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100'
              ]"
            >
              <i class="pi pi-list"></i>
              <span class="hidden sm:inline">Tabla</span>
            </button>
          </div>
        </div>

        <!-- Active Filters Display -->
        <div v-if="hasActiveFilters" class="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200">
          <span class="text-sm text-slate-500 font-medium">Filtros activos:</span>
          <div class="flex flex-wrap gap-2">
            <span 
              v-if="searchTerm"
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium"
            >
              "{{ searchTerm }}"
              <button @click="searchTerm = ''" class="hover:text-primary-900">
                <i class="pi pi-times text-xs"></i>
              </button>
            </span>
            <span 
              v-if="selectedCategory !== 'all'"
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
            >
              {{ selectedCategory }}
              <button @click="selectedCategory = 'all'" class="hover:text-slate-900">
                <i class="pi pi-times text-xs"></i>
              </button>
            </span>
            <span 
              v-if="stockFilter !== 'all'"
              class="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
            >
              {{ getStockFilterLabel(stockFilter) }}
              <button @click="stockFilter = 'all'" class="hover:text-slate-900">
                <i class="pi pi-times text-xs"></i>
              </button>
            </span>
            <button 
              @click="clearAllFilters"
              class="text-sm text-slate-500 hover:text-slate-700 font-medium underline underline-offset-2"
            >
              Limpiar todos
            </button>
          </div>
        </div>
      </div>

      <!-- Content Header -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-bold text-slate-900">Productos en Inventario</h2>
          <p class="text-slate-600 text-sm mt-1">
            {{ filteredProducts.length }} de {{ products.length }} productos mostrados
          </p>
        </div>
        <div class="flex items-center gap-3 text-slate-500 text-sm">
          <i class="pi pi-info-circle"></i>
          <span>Última actualización: {{ lastUpdate }}</span>
        </div>
      </div>

      <!-- Grid View Mejorado -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
        >
          <!-- Product Image/Icon -->
          <div class="relative h-40 bg-gradient-to-br from-primary-50 via-emerald-50 to-green-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <i :class="`pi ${product.icon} text-6xl text-primary-600/80 group-hover:scale-110 group-hover:text-primary-600 transition-all duration-500`"></i>
            
            <!-- Stock Status Badge -->
            <div :class="[
              'absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border transition-all duration-300',
              getStockStatusClass(product.stock, product.minStock)
            ]">
              <span class="flex items-center gap-1.5">
                <span :class="[
                  'w-2 h-2 rounded-full animate-pulse',
                  getStockDotColor(product.stock, product.minStock)
                ]"></span>
                {{ getStockStatus(product.stock, product.minStock) }}
              </span>
            </div>
          </div>

          <!-- Product Info -->
          <div class="p-5 relative">
            <!-- Background Pattern -->
            <div class="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div class="relative z-10">
              <div class="mb-3">
                <h3 class="font-bold text-slate-900 mb-1 text-lg group-hover:text-primary-700 transition-colors line-clamp-2 leading-tight">
                  {{ product.name }}
                </h3>
                <p class="text-sm text-slate-500 font-mono">SKU: {{ product.sku }}</p>
              </div>

              <div class="flex items-center gap-2 mb-4">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-full text-xs font-semibold border border-emerald-200">
                  <i class="pi pi-tag text-xs"></i>
                  {{ product.category }}
                </span>
              </div>

              <!-- Stock Bar Mejorado -->
              <div class="mb-4">
                <div class="flex justify-between text-sm text-slate-600 mb-2">
                  <span class="font-medium flex items-center gap-1.5">
                    <i class="pi pi-chart-line text-xs"></i>
                    Stock Actual
                  </span>
                  <span class="font-bold text-slate-900">{{ product.stock }} {{ product.unit }}</span>
                </div>
                <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                  <div
                    :class="[
                      'h-2.5 rounded-full transition-all duration-1000 ease-out shadow-sm',
                      getStockBarColor(product.stock, product.minStock)
                    ]"
                    :style="{ width: `${Math.min((product.stock / (product.minStock * 3)) * 100, 100)}%` }"
                  ></div>
                </div>
                <p class="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                  <i class="pi pi-info-circle text-xs"></i>
                  Mínimo: {{ product.minStock }} {{ product.unit }}
                </p>
              </div>

              <!-- Price and Actions -->
              <div class="flex items-center justify-between pt-4 border-t border-slate-200/50">
                <div>
                  <p class="text-2xl font-bold bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent">
                    ${{ product.price.toFixed(2) }}
                  </p>
                  <p class="text-xs text-slate-500">por {{ product.unit }}</p>
                </div>
                <div class="flex gap-1">
                  <button class="p-2.5 text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md">
                    <i class="pi pi-pencil text-lg"></i>
                  </button>
                  <button class="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md">
                    <i class="pi pi-eye text-lg"></i>
                  </button>
                  <button class="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-md">
                    <i class="pi pi-ellipsis-h text-lg"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Table View Mejorado -->
      <div v-else class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-primary-600 via-primary-500 to-emerald-600">
                <th class="text-left py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">
                  <div class="flex items-center gap-2">
                    <i class="pi pi-box"></i>
                    Producto
                  </div>
                </th>
                <th class="text-left py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">
                  <div class="flex items-center gap-2">
                    <i class="pi pi-tag"></i>
                    Categoría
                  </div>
                </th>
                <th class="text-left py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">SKU</th>
                <th class="text-right py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">
                  <div class="flex items-center gap-2 justify-end">
                    <i class="pi pi-chart-line"></i>
                    Stock
                  </div>
                </th>
                <th class="text-right py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Mínimo</th>
                <th class="text-right py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Precio</th>
                <th class="text-left py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Estado</th>
                <th class="text-right py-4 px-6 text-white font-bold text-sm uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200/50">
              <tr 
                v-for="product in filteredProducts" 
                :key="product.id" 
                class="hover:bg-gradient-to-r hover:from-primary-50/30 hover:to-emerald-50/30 transition-all duration-300 group"
              >
                <td class="py-4 px-6">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-emerald-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                      <i :class="`pi ${product.icon} text-primary-600 text-xl`"></i>
                    </div>
                    <div>
                      <p class="font-bold text-slate-900 group-hover:text-primary-700 transition-colors">{{ product.name }}</p>
                      <p class="text-xs text-slate-500">{{ product.unit }}</p>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-6">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 rounded-full text-sm font-semibold border border-emerald-200">
                    <i class="pi pi-tag text-xs"></i>
                    {{ product.category }}
                  </span>
                </td>
                <td class="py-4 px-6">
                  <code class="text-slate-700 font-mono text-sm font-medium bg-slate-100 px-2 py-1 rounded-lg">
                    {{ product.sku }}
                  </code>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="font-bold text-slate-900 text-lg">{{ product.stock }}</span>
                  <span class="text-slate-500 text-sm ml-1">{{ product.unit }}</span>
                </td>
                <td class="py-4 px-6 text-right text-slate-600 font-medium">
                  {{ product.minStock }} {{ product.unit }}
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="font-bold bg-gradient-to-r from-primary-600 to-emerald-600 bg-clip-text text-transparent text-lg">
                    ${{ product.price.toFixed(2) }}
                  </span>
                </td>
                <td class="py-4 px-6">
                  <span :class="[
                    'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold shadow-sm border transition-colors',
                    getStockStatusClass(product.stock, product.minStock)
                  ]">
                    <span :class="[
                      'w-2 h-2 rounded-full animate-pulse',
                      getStockDotColor(product.stock, product.minStock)
                    ]"></span>
                    {{ getStockStatus(product.stock, product.minStock) }}
                  </span>
                </td>
                <td class="py-4 px-6">
                  <div class="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button class="p-2.5 text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-110">
                      <i class="pi pi-pencil"></i>
                    </button>
                    <button class="p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-110">
                      <i class="pi pi-eye"></i>
                    </button>
                    <button class="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110">
                      <i class="pi pi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination Mejorada -->
        <div class="flex flex-col sm:flex-row items-center justify-between px-6 py-5 border-t border-slate-200/50 bg-gradient-to-r from-slate-50/50 to-white/50">
          <p class="text-sm text-slate-600 font-medium mb-4 sm:mb-0">
            Mostrando <span class="font-bold text-slate-900">{{ filteredProducts.length }}</span> de 
            <span class="font-bold text-slate-900">{{ products.length }}</span> productos
          </p>
          <div class="flex gap-2">
            <button class="flex items-center gap-2 px-5 py-2.5 border border-slate-300 rounded-xl text-slate-700 hover:bg-white hover:shadow-md transition-all duration-300 font-medium hover:border-slate-400">
              <i class="pi pi-chevron-left"></i>
              Anterior
            </button>
            <button class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-md hover:shadow-lg font-medium">
              Siguiente
              <i class="pi pi-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        v-if="filteredProducts.length === 0" 
        class="text-center py-16 px-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50"
      >
        <div class="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="pi pi-inbox text-slate-500 text-4xl"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-900 mb-2">No se encontraron productos</h3>
        <p class="text-slate-600 mb-6 max-w-md mx-auto">
          No hay productos que coincidan con los filtros aplicados. Intenta ajustar los criterios de búsqueda.
        </p>
        <button 
          @click="clearAllFilters"
          class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-emerald-600 text-white rounded-xl hover:from-primary-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
        >
          <i class="pi pi-refresh"></i>
          Limpiar filtros
        </button>
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
    icon: 'pi-seedling'
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
    icon: 'pi-flask'
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
    icon: 'pi-recycle'
  }
])

// Computed properties
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

const hasActiveFilters = computed(() => {
  return searchTerm.value !== '' || selectedCategory.value !== 'all' || stockFilter.value !== 'all'
})

const lastUpdate = computed(() => {
  return new Date().toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  })
})

// Enhanced stats with more meaningful data
const enhancedStats = computed(() => {
  const totalValue = products.value.reduce((sum, p) => sum + (p.stock * p.price), 0)
  const avgStockLevel = products.value.reduce((sum, p) => sum + (p.stock / p.minStock), 0) / products.value.length * 100
  
  return [
    { 
      label: 'Total Productos', 
      value: products.value.length, 
      gradient: 'bg-gradient-to-br from-primary-500 to-primary-600',
      icon: 'pi-box',
      change: 5.2
    },
    { 
      label: 'Valor Inventario', 
      value: `$${totalValue.toLocaleString()}`, 
      gradient: 'bg-gradient-to-br from-emerald-500 to-green-600',
      icon: 'pi-dollar',
      change: 12.5
    },
    { 
      label: 'Stock Bajo', 
      value: lowStockProducts.value.length, 
      gradient: 'bg-gradient-to-br from-red-500 to-orange-500',
      icon: 'pi-exclamation-triangle',
      change: -3.1
    },
    { 
      label: 'Nivel Promedio', 
      value: `${Math.round(avgStockLevel)}%`, 
      gradient: 'bg-gradient-to-br from-amber-500 to-yellow-500',
      icon: 'pi-chart-line',
      progress: Math.round(avgStockLevel),
      progressColor: avgStockLevel > 100 ? 'bg-gradient-to-r from-emerald-500 to-green-500' : 
                    avgStockLevel > 50 ? 'bg-gradient-to-r from-amber-500 to-yellow-500' : 
                    'bg-gradient-to-r from-red-500 to-orange-500'
    }
  ]
})

// Methods
const getStockStatus = (stock, minStock) => {
  if (stock === 0) return 'Sin Stock'
  if (stock <= minStock * 0.5) return 'Crítico'
  if (stock <= minStock) return 'Bajo'
  if (stock <= minStock * 1.5) return 'Medio'
  return 'Alto'
}

const getStockStatusClass = (stock, minStock) => {
  if (stock === 0) return 'bg-slate-200 text-slate-800 border-slate-300'
  if (stock <= minStock * 0.5) return 'bg-red-100 text-red-700 border-red-300'
  if (stock <= minStock) return 'bg-amber-100 text-amber-700 border-amber-300'
  if (stock <= minStock * 1.5) return 'bg-blue-100 text-blue-700 border-blue-300'
  return 'bg-emerald-100 text-emerald-700 border-emerald-300'
}

const getStockBarColor = (stock, minStock) => {
  if (stock === 0) return 'bg-gradient-to-r from-slate-400 to-slate-500'
  if (stock <= minStock * 0.5) return 'bg-gradient-to-r from-red-500 to-red-600'
  if (stock <= minStock) return 'bg-gradient-to-r from-amber-500 to-amber-600'
  if (stock <= minStock * 1.5) return 'bg-gradient-to-r from-blue-500 to-blue-600'
  return 'bg-gradient-to-r from-emerald-500 to-green-600'
}

const getStockDotColor = (stock, minStock) => {
  if (stock === 0) return 'bg-slate-500'
  if (stock <= minStock * 0.5) return 'bg-red-500'
  if (stock <= minStock) return 'bg-amber-500'
  if (stock <= minStock * 1.5) return 'bg-blue-500'
  return 'bg-emerald-500'
}

const getCriticalProductsCount = () => {
  return products.value.filter(p => p.stock <= p.minStock * 0.5).length
}

const getLowStockCount = () => {
  return products.value.filter(p => p.stock > p.minStock * 0.5 && p.stock <= p.minStock).length
}

const getStockFilterLabel = (filter) => {
  const labels = {
    high: 'Stock Alto',
    medium: 'Stock Medio',
    low: 'Stock Bajo',
    out: 'Sin Stock'
  }
  return labels[filter] || filter
}

const clearAllFilters = () => {
  searchTerm.value = ''
  selectedCategory.value = 'all'
  stockFilter.value = 'all'
}
</script>

<style scoped>
/* Custom utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Smooth scroll for table */
.overflow-x-auto {
  scrollbar-width: thin;
  scrollbar-color: theme('colors.slate.300') theme('colors.slate.100');
}

.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: theme('colors.slate.100');
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: theme('colors.slate.300');
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: theme('colors.slate.400');
}

/* Backdrop blur support */
@supports not (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    background-color: theme('colors.white');
  }
}

/* Animations */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Enhanced focus states */
button:focus-visible,
select:focus-visible,
input:focus-visible {
  outline: 2px solid theme('colors.primary.500');
  outline-offset: 2px;
}

/* Smooth transitions for all interactive elements */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>