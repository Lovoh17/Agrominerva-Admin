<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-extrabold mb-8 text-gray-900">
      Tienda (Catálogo Principal)
    </h1>
    <p>
      * - [ ] Conectar al API de productos (GET /api/products) e inicializar la lista `products`. <br>
      * - [ ] Maquetar la cuadrícula de productos (usando el componente `ProductCard.vue`).<br>
      * - [ ] Implementar la lógica de filtros (por categoría, precio, etc.).<br>
      * - [ ] Implementar la lógica de ordenamiento (por precio, por popularidad).<br>
      * - [ ] Implementar paginación si hay muchos productos.<br>
    </p>

    <div class="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <div class="mt-10 flex justify-center">
    </div>
  </div>
</template>

<script setup>
/*
 * @purpose: Catálogo principal de productos. Gestiona la carga de datos, el filtrado y la visualización de las tarjetas de producto.
 * @tasks:
 * - [ ] Conectar al API de productos (GET /api/products) e inicializar la lista `products`.
 * - [ ] Maquetar la cuadrícula de productos (usando el componente `ProductCard.vue`).
 * - [ ] Implementar la lógica de filtros (por categoría, precio, etc.).
 * - [ ] Implementar la lógica de ordenamiento (por precio, por popularidad).
 * - [ ] Implementar paginación si hay muchos productos.
 */

import { ref } from 'vue';
//import ProductCard from '@/components/public/store/ProductCard.vue';

// Datos de prueba (Reemplazar con la llamada a la API)
const products = ref([
  { id: 1, name: 'Producto A', price: 10.00, category: 'Semillas' },
  { id: 2, name: 'Producto B', price: 20.00, category: 'Fertilizantes' },
  { id: 3, name: 'Producto C', price: 55.00, category: 'Herramientas' },
  { id: 4, name: 'Producto D', price: 8.50, category: 'Semillas' },
  // ... más productos para llenar la cuadrícula ...
]);

// ... lógica restante ...
</script>