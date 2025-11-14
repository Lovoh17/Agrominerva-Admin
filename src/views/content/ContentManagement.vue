<template>
    <div class="min-h-screen bg-neutral-50 p-6">
        <!-- Header -->
        <div class="mb-6">
            <div class="flex justify-between items-center">
                <div>
                    <h1 class="text-3xl font-bold text-neutral-900">Gestor de Contenido</h1>
                    <p class="text-neutral-600 mt-2">Administra noticias y artículos de AgroMinerva</p>
                </div>
                <router-link to="/admin/contenido/crear"
                    class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-200 flex items-center gap-2">
                    <i class="pi pi-plus"></i>
                    Crear Contenido
                </router-link>
            </div>
        </div>

        <!-- Filtros y Búsqueda -->
        <div class="bg-white rounded-md p-6 shadow-soft border border-neutral-200 mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <!-- Búsqueda -->
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Buscar contenido</label>
                    <div class="relative">
                        <input type="text" v-model="filters.search"
                            placeholder="Buscar por título, autor o contenido..."
                            class="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors" />
                        <i class="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400"></i>
                    </div>
                </div>

                <!-- Tipo de Contenido -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Tipo</label>
                    <select v-model="filters.type"
                        class="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white transition-colors">
                        <option value="">Todos los tipos</option>
                        <option value="article">Artículos</option>
                        <option value="news">Noticias</option>
                    </select>
                </div>

                <!-- Categoría -->
                <div>
                    <label class="block text-sm font-medium text-neutral-700 mb-2">Categoría</label>
                    <select v-model="filters.category"
                        class="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white transition-colors">
                        <option value="">Todas las categorías</option>
                        <option value="cultivos">Manejo de Cultivos</option>
                        <option value="suelos">Suelos y Fertilización</option>
                        <option value="tecnologia">Tecnología Agrícola</option>
                        <option value="sostenibilidad">Agricultura Sostenible</option>
                        <option value="mercados">Análisis de Mercados</option>
                        <option value="ganaderia">Producción Animal</option>
                        <option value="agroindustria">Agroindustria</option>
                    </select>
                </div>
            </div>

            <!-- Acciones de filtros -->
            <div class="flex justify-between items-center mt-4">
                <p class="text-sm text-neutral-600">
                    Mostrando {{ filteredContent.length }} de {{ content.length }} elementos
                </p>
                <div class="flex gap-2">
                    <button @click="resetFilters"
                        class="px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors duration-200">
                        Limpiar Filtros
                    </button>
                    <button @click="exportContent"
                        class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200 flex items-center gap-2">
                        <i class="pi pi-download"></i>
                        Exportar
                    </button>
                </div>
            </div>
        </div>

        <!-- Lista de Contenido -->
        <div class="bg-white rounded-md shadow-soft border border-neutral-200 overflow-hidden">
            <!-- Header de la tabla -->
            <div class="border-b border-neutral-200 bg-neutral-50 px-6 py-4">
                <div class="flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-neutral-900">Contenido</h3>
                    <div class="flex items-center gap-4">
                        <select v-model="itemsPerPage"
                            class="px-3 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white text-sm">
                            <option value="10">10 por página</option>
                            <option value="25">25 por página</option>
                            <option value="50">50 por página</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Contenido -->
            <div class="divide-y divide-neutral-200">
                <div v-for="item in paginatedContent" :key="item.id"
                    class="p-6 hover:bg-neutral-50 transition-colors duration-200">
                    <div class="flex gap-4">
                        <!-- Imagen -->
                        <div class="flex-shrink-0">
                            <img :src="item.featuredImage || '/api/placeholder/120/80'" :alt="item.title"
                                class="w-20 h-20 object-cover rounded-md border border-neutral-200" />
                        </div>

                        <!-- Información del contenido -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-start justify-between mb-2">
                                <h4 class="text-lg font-semibold text-neutral-900 truncate">{{ item.title }}</h4>
                                <div class="flex items-center gap-2 ml-4">
                                    <span :class="[
                                        'px-2 py-1 rounded-full text-xs font-medium',
                                        item.type === 'article'
                                            ? 'bg-primary-100 text-primary-700 border border-primary-200'
                                            : 'bg-accent-100 text-accent-700 border border-accent-200'
                                    ]">
                                        {{ item.type === 'article' ? 'Artículo' : 'Noticia' }}
                                    </span>
                                    <span :class="[
                                        'px-2 py-1 rounded-full text-xs font-medium',
                                        item.status === 'published'
                                            ? 'bg-primary-100 text-primary-700 border border-primary-200'
                                            : item.status === 'draft'
                                                ? 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                                                : 'bg-accent-100 text-accent-700 border border-accent-200'
                                    ]">
                                        {{ getStatusText(item.status) }}
                                    </span>
                                </div>
                            </div>

                            <p class="text-neutral-600 text-sm mb-3 line-clamp-2">{{ item.excerpt }}</p>

                            <div class="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
                                <span class="flex items-center gap-1">
                                    <i class="pi pi-tag"></i>
                                    {{ getCategoryText(item.category) }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i class="pi pi-user"></i>
                                    {{ item.author }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i class="pi pi-calendar"></i>
                                    {{ formatDate(item.createdAt) }}
                                </span>
                                <span class="flex items-center gap-1">
                                    <i class="pi pi-eye"></i>
                                    {{ item.views || 0 }} vistas
                                </span>
                                <span v-if="item.tags && item.tags.length > 0" class="flex items-center gap-1">
                                    <i class="pi pi-hashtag"></i>
                                    {{ item.tags.slice(0, 2).join(', ') }}
                                    <span v-if="item.tags.length > 2" class="text-xs">+{{ item.tags.length - 2 }}</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Acciones -->
                    <div class="flex justify-between items-center mt-4 pt-4 border-t border-neutral-200">
                        <div class="flex items-center gap-2 text-sm text-neutral-500">
                            <span>Última actualización: {{ formatDate(item.updatedAt) }}</span>
                        </div>
                        <div class="flex gap-2">
                            <button @click="previewContent(item)"
                                class="px-3 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors duration-200 text-sm flex items-center gap-2">
                                <i class="pi pi-eye"></i>
                                Vista Previa
                            </button>
                            <router-link :to="`/admin/contenido/editar/${item.id}`"
                                class="px-3 py-2 border border-primary-500 text-primary-700 rounded-md hover:bg-primary-50 transition-colors duration-200 text-sm flex items-center gap-2">
                                <i class="pi pi-pencil"></i>
                                Editar
                            </router-link>
                            <button @click="deleteContent(item)"
                                class="px-3 py-2 border border-secondary-500 text-secondary-700 rounded-md hover:bg-secondary-50 transition-colors duration-200 text-sm flex items-center gap-2">
                                <i class="pi pi-trash"></i>
                                Eliminar
                            </button>
                            <button v-if="item.status === 'draft'" @click="publishContent(item)"
                                class="px-3 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200 text-sm flex items-center gap-2">
                                <i class="pi pi-send"></i>
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredContent.length === 0" class="p-12 text-center">
                <i class="pi pi-inbox text-4xl text-neutral-400 mb-4"></i>
                <h4 class="text-lg font-semibold text-neutral-900 mb-2">No se encontró contenido</h4>
                <p class="text-neutral-600 mb-4">No hay contenido que coincida con los filtros aplicados.</p>
                <button @click="resetFilters"
                    class="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200">
                    Limpiar filtros
                </button>
            </div>

            <!-- Paginación -->
            <div v-if="filteredContent.length > 0" class="border-t border-neutral-200 px-6 py-4 bg-neutral-50">
                <div class="flex justify-between items-center">
                    <p class="text-sm text-neutral-600">
                        Mostrando {{ startIndex + 1 }} - {{ endIndex }} de {{ filteredContent.length }} elementos
                    </p>
                    <div class="flex gap-2">
                        <button @click="previousPage" :disabled="currentPage === 1" :class="[
                            'px-3 py-2 border border-neutral-300 rounded-md text-sm',
                            currentPage === 1
                                ? 'text-neutral-400 cursor-not-allowed'
                                : 'text-neutral-700 hover:bg-neutral-50'
                        ]">
                            Anterior
                        </button>
                        <span class="px-3 py-2 text-sm text-neutral-700">
                            Página {{ currentPage }} de {{ totalPages }}
                        </span>
                        <button @click="nextPage" :disabled="currentPage === totalPages" :class="[
                            'px-3 py-2 border border-neutral-300 rounded-md text-sm',
                            currentPage === totalPages
                                ? 'text-neutral-400 cursor-not-allowed'
                                : 'text-neutral-700 hover:bg-neutral-50'
                        ]">
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Estado
const content = ref([])
const filters = reactive({
    search: '',
    type: '',
    category: ''
})
const itemsPerPage = ref(10)
const currentPage = ref(1)

// Contenido de ejemplo (en producción vendría de una API)
const sampleContent = [
    {
        id: 1,
        title: 'Innovaciones en Agricultura de Precisión para el 2024',
        excerpt: 'Exploramos las últimas tecnologías en agricultura de precisión que están revolucionando la producción agrícola.',
        content: 'Contenido completo del artículo...',
        type: 'article',
        category: 'tecnologia',
        status: 'published',
        author: 'Carlos Mendoza',
        featuredImage: '/api/placeholder/400/300',
        tags: ['agricultura de precisión', 'tecnología', 'drones'],
        views: 1245,
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
    },
    {
        id: 2,
        title: 'Nuevas Políticas de Sostenibilidad Agrícola',
        excerpt: 'El gobierno anuncia nuevas medidas para promover prácticas agrícolas sostenibles.',
        type: 'news',
        category: 'sostenibilidad',
        status: 'published',
        author: 'Ana López',
        featuredImage: '/api/placeholder/400/300',
        tags: ['políticas', 'sostenibilidad', 'gobierno'],
        views: 892,
        createdAt: '2024-01-10',
        updatedAt: '2024-01-12'
    },
    {
        id: 3,
        title: 'Guía Completa de Manejo de Suelos',
        excerpt: 'Una guía práctica para el manejo y conservación de suelos agrícolas.',
        type: 'article',
        category: 'suelos',
        status: 'draft',
        author: 'Miguel Torres',
        featuredImage: '/api/placeholder/400/300',
        tags: ['suelos', 'conservación', 'guía práctica'],
        views: 0,
        createdAt: '2024-01-08',
        updatedAt: '2024-01-14'
    }
]

// Computed
const filteredContent = computed(() => {
    return content.value.filter(item => {
        const matchesSearch = !filters.search ||
            item.title.toLowerCase().includes(filters.search.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(filters.search.toLowerCase()) ||
            item.author.toLowerCase().includes(filters.search.toLowerCase())

        const matchesType = !filters.type || item.type === filters.type
        const matchesCategory = !filters.category || item.category === filters.category

        return matchesSearch && matchesType && matchesCategory
    })
})

const totalPages = computed(() => Math.ceil(filteredContent.value.length / itemsPerPage.value))

const paginatedContent = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredContent.value.slice(start, end)
})

const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage.value)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage.value, filteredContent.value.length))

// Métodos
const getStatusText = (status) => {
    const statusMap = {
        published: 'Publicado',
        draft: 'Borrador',
        scheduled: 'Programado'
    }
    return statusMap[status] || status
}

const getCategoryText = (category) => {
    const categoryMap = {
        cultivos: 'Manejo de Cultivos',
        suelos: 'Suelos y Fertilización',
        tecnologia: 'Tecnología Agrícola',
        sostenibilidad: 'Agricultura Sostenible',
        mercados: 'Análisis de Mercados',
        ganaderia: 'Producción Animal',
        agroindustria: 'Agroindustria'
    }
    return categoryMap[category] || category
}

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const resetFilters = () => {
    filters.search = ''
    filters.type = ''
    filters.category = ''
    currentPage.value = 1
}

const exportContent = () => {
    // Implementar exportación
    alert('Funcionalidad de exportación en desarrollo')
}

const previewContent = (item) => {
    const previewWindow = window.open('', '_blank')
    previewWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Vista Previa: ${item.title}</title>
        <style>
          body { font-family: sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          .content { line-height: 1.6; }
        </style>
      </head>
      <body>
        <h1>${item.title}</h1>
        <p><em>${item.excerpt}</em></p>
        <div class="content">${item.content}</div>
      </body>
    </html>
  `)
    previewWindow.document.close()
}

const deleteContent = (item) => {
    if (confirm(`¿Estás seguro de que deseas eliminar "${item.title}"?`)) {
        content.value = content.value.filter(c => c.id !== item.id)
    }
}

const publishContent = (item) => {
    item.status = 'published'
    item.updatedAt = new Date().toISOString().split('T')[0]
}

const previousPage = () => {
    if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
}

// Lifecycle
onMounted(() => {
    // Simular carga de datos
    content.value = sampleContent
})
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>