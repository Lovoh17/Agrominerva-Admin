<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="bg-tertiary-600 text-white py-20 border-b-4 border-accent-500">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Blog Agrícola
          </h1>
          <p class="text-xl text-primary-100 leading-relaxed">
            Descubre las últimas tendencias, técnicas innovadoras y consejos expertos
            para optimizar tu producción agrícola.
          </p>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="container mx-auto px-4 py-8">
      <div class="bg-gray-50 border-2 border-gray-200 p-6 mb-8">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div class="flex flex-wrap gap-3">
            <Button v-for="category in categories" :key="category.id" :label="category.name"
              :severity="selectedCategory === category.id ? 'success' : 'secondary'"
              :outlined="selectedCategory !== category.id" @click="selectedCategory = category.id"
              class="filter-button" />
          </div>
          <div class="flex items-center gap-3 w-full md:w-auto border-2 border-gray-300 bg-white px-4 py-2">
            <span class="pi pi-search text-gray-400"></span>
            <input v-model="searchQuery" placeholder="Buscar artículos..." class="w-full md:w-64 outline-none" />
          </div>
        </div>
      </div>

      <!-- Componente NoPostsFound -->
      <NoPostsFound v-if="filteredArticles.length === 0" :search-query="searchQuery"
        :selected-category="selectedCategory" :category-name="currentCategoryName" @clear-filters="clearFilters" />

      <!-- Grid de Artículos usando PostCard -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <PostCard v-for="article in paginatedArticles" :key="article.id" :article="article" @read-more="goToArticle"
          @tag-click="handleTagClick" />
      </div>

      <!-- Paginación (solo mostrar si hay artículos) -->
      <div v-if="filteredArticles.length > 0" class="flex justify-center">
        <Paginator v-model:first="first" :rows="rows" :totalRecords="filteredArticles.length"
          :rowsPerPageOptions="[4, 8, 12]" class="custom-paginator" @page="onPageChange" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'
import PostCard from '@/components/public/blog/PostCard.vue'
import NoPostsFound from '@/components/public/blog/NoPostFound.vue'

const toast = useToast()

// Estado
const selectedCategory = ref('todos')
const searchQuery = ref('')
const first = ref(0)
const rows = ref(4)

// Categorías
const categories = [
  { id: 'todos', name: 'Todos' },
  { id: 'cultivos', name: 'Cultivos' },
  { id: 'tecnologia', name: 'Tecnología' },
  { id: 'sostenibilidad', name: 'Sostenibilidad' },
  { id: 'consejos', name: 'Consejos' }
]

// Artículos de ejemplo (mismos datos)
const articles = ref([
  {
    id: 1,
    title: 'Técnicas Avanzadas de Riego por Goteo para Maximizar Rendimientos',
    description: 'Descubre cómo implementar sistemas de riego por goteo inteligentes que pueden aumentar tu productividad hasta un 40% mientras reduces el consumo de agua significativamente.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800',
    category: 'Tecnología',
    categoryId: 'tecnologia',
    date: '15 Oct 2024',
    author: {
      name: 'Dr. Carlos Méndez',
      role: 'Ingeniero Agrónomo',
      avatar: 'https://i.pravatar.cc/150?img=12'
    },
    tags: ['riego', 'tecnología', 'ahorro-agua']
  },
  {
    id: 2,
    title: 'Agricultura Regenerativa: El Futuro de la Producción Sostenible',
    description: 'Explora las prácticas agrícolas que no solo producen alimentos, sino que también restauran la salud del suelo y mejoran los ecosistemas locales para las futuras generaciones.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800',
    category: 'Sostenibilidad',
    categoryId: 'sostenibilidad',
    date: '12 Oct 2024',
    author: {
      name: 'Ing. María Torres',
      role: 'Especialista en Sostenibilidad',
      avatar: 'https://i.pravatar.cc/150?img=5'
    },
    tags: ['sostenibilidad', 'suelo', 'regenerativo']
  },
  {
    id: 3,
    title: 'Optimización del Cultivo de Maíz: De la Siembra a la Cosecha',
    description: 'Una guía completa sobre las mejores prácticas para cultivar maíz de alta calidad, desde la selección de semillas hasta las técnicas de cosecha más eficientes.',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800',
    category: 'Cultivos',
    categoryId: 'cultivos',
    date: '08 Oct 2024',
    author: {
      name: 'Ing. Roberto Campos',
      role: 'Especialista en Cereales',
      avatar: 'https://i.pravatar.cc/150?img=8'
    },
    tags: ['maíz', 'cultivos', 'siembra']
  },
  {
    id: 4,
    title: '10 Consejos para Combatir Plagas de Forma Natural y Efectiva',
    description: 'Aprende métodos orgánicos y ecológicos para proteger tus cultivos de las plagas más comunes, sin comprometer la salud de tu producción ni del medio ambiente.',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800',
    category: 'Consejos',
    categoryId: 'consejos',
    date: '05 Oct 2024',
    author: {
      name: 'Dra. Ana Rodríguez',
      role: 'Fitopatóloga',
      avatar: 'https://i.pravatar.cc/150?img=9'
    },
    tags: ['plagas', 'orgánico', 'control']
  }
])

// Computed
const filteredArticles = computed(() => {
  let filtered = articles.value

  // Filtrar por categoría
  if (selectedCategory.value !== 'todos') {
    filtered = filtered.filter(article => article.categoryId === selectedCategory.value)
  }

  // Filtrar por búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(article =>
      article.title.toLowerCase().includes(query) ||
      article.description.toLowerCase().includes(query) ||
      article.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  return filtered
})

const paginatedArticles = computed(() => {
  const start = first.value
  const end = start + rows.value
  return filteredArticles.value.slice(start, end)
})

// Nombre de la categoría actual para el componente NoPostsFound
const currentCategoryName = computed(() => {
  if (selectedCategory.value === 'todos') return ''
  const category = categories.find(cat => cat.id === selectedCategory.value)
  return category ? category.name : ''
})

// Métodos
const goToArticle = (id) => {
  toast.add({
    severity: 'info',
    summary: 'Navegando al artículo',
    detail: `Abriendo artículo #${id}`,
    life: 3000
  })
  // Aquí puedes agregar la navegación real al artículo
}

const handleTagClick = (tag) => {
  searchQuery.value = tag
  first.value = 0 // Resetear paginación
}

const onPageChange = (event) => {
  first.value = event.first
  rows.value = event.rows
}

const clearFilters = () => {
  selectedCategory.value = 'todos'
  searchQuery.value = ''
  first.value = 0
  toast.add({
    severity: 'success',
    summary: 'Filtros limpiados',
    detail: 'Todos los filtros han sido restablecidos',
    life: 3000
  })
}
</script>

<style scoped>
.filter-button {
  transition: all 0.3s ease;
}

:deep(.custom-paginator) {
  background: white;
  border: 2px solid #e5e7eb;
  padding: 1rem;
}

:deep(.custom-paginator .p-paginator-pages .p-paginator-page.p-highlight) {
  background: #8BC34A;
  border-color: #8BC34A;
}

:deep(.p-button) {
  font-weight: 600;
  transition: all 0.3s ease;
}
</style>