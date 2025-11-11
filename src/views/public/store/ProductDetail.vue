<template>
  <div class="p-6">
    <h1>Detalle de Producto (ProductDetail.vue)</h1>
    <p>Esta página mostrará el producto con ID: {{ $route.params.id }}</p>
  </div>
</template>

<script setup>
/*
 * @purpose: Vista detallada de un producto específico.
 * @tasks:
 * - [ ] Obtener el ID del producto desde la ruta (usar `useRoute()`).
 * - [ ] Cargar datos del producto (GET /api/products/:id).
 * - [ ] Implementar galería de imágenes del producto.
 * - [ ] Mostrar descripción, precio, y especificaciones.
 * - [ ] Implementar selector de cantidad.
 * - [ ] Implementar botón "Añadir al Carrito" (que llame al store de Pinia).
 */
</script>