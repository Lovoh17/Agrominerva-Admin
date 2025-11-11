<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header del artículo -->
    <article-header :article="article" />
    
    <!-- Contenido principal -->
    <div class="container mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Contenido del artículo -->
        <div class="lg:col-span-3">
          <article-content :content="article.content" />
          <article-gallery :gallery="article.gallery" />
          <article-downloads :downloads="article.downloads" />
          <article-cta :call-to-action="article.callToAction" />
        </div>
        
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <author-card :author="article.author" />
          <article-metadata :metadata="article.metadata" />
          <related-articles :article-ids="article.relatedArticles" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
 * @purpose: Mostrar un artículo completo del blog.
 * @tasks:
 * - [ ] Obtener el slug del post desde la ruta (usar `useRoute()`).
 * - [ ] Cargar datos del post (GET /api/blog/:slug).
 * - [ ] Mostrar el título, imagen principal, autor y fecha.
 * - [ ] Renderizar el contenido del post (usar `v-html` si es seguro).
 */
</script>
