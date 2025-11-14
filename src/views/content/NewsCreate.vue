<template>
    <div class="min-h-screen bg-neutral-50 p-6">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-neutral-900">{{ isEditing ? 'Editar' : 'Crear Nueva' }} Noticia</h1>
            <p class="text-neutral-600 mt-2">Redacta y publica contenido para el blog de AgroMinerva</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <!-- Columna Principal - Editor -->
            <div class="lg:col-span-3 space-y-6">
                <!-- Información Básica -->
                <div class="bg-white rounded-lg p-6 shadow-soft border border-neutral-200">
                    <h3 class="text-lg font-semibold text-neutral-900 mb-4">Información de la Noticia</h3>
                    <div class="space-y-4">
                        <!-- Título -->
                        <div>
                            <label class="block text-sm font-medium text-neutral-700 mb-2">Título *</label>
                            <input type="text" v-model="article.title" placeholder="Ingresa el título de la noticia..."
                                class="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                                :class="{ 'border-secondary-500': errors.title }" />
                            <p v-if="errors.title" class="text-secondary-600 text-sm mt-1">{{ errors.title }}</p>
                        </div>

                        <!-- Descripción Corta -->
                        <div>
                            <label class="block text-sm font-medium text-neutral-700 mb-2">Descripción Corta *</label>
                            <textarea v-model="article.excerpt"
                                placeholder="Breve descripción que aparecerá en la vista previa..." rows="3"
                                class="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-colors"
                                :class="{ 'border-secondary-500': errors.excerpt }"></textarea>
                            <p v-if="errors.excerpt" class="text-secondary-600 text-sm mt-1">{{ errors.excerpt }}</p>
                            <p class="text-xs text-neutral-500 mt-1">{{ article.excerpt.length }}/200 caracteres</p>
                        </div>

                        <!-- Categoría y Etiquetas -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-neutral-700 mb-2">Categoría *</label>
                                <select v-model="article.category"
                                    class="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white transition-colors"
                                    :class="{ 'border-secondary-500': errors.category }">
                                    <option value="">Seleccionar categoría</option>
                                    <option value="agricultura">Agricultura</option>
                                    <option value="tecnologia">Tecnología Agrícola</option>
                                    <option value="sostenibilidad">Sostenibilidad</option>
                                    <option value="mercados">Mercados</option>
                                    <option value="consejos">Consejos Prácticos</option>
                                    <option value="noticias">Noticias</option>
                                </select>
                                <p v-if="errors.category" class="text-secondary-600 text-sm mt-1">{{ errors.category }}
                                </p>
                            </div>

                            <div>
                                <label class="block text-sm font-medium text-neutral-700 mb-2">Etiquetas</label>
                                <div class="flex gap-2">
                                    <input type="text" v-model="tagInput" @keydown.enter.prevent="addTag"
                                        placeholder="Escribe y presiona Enter..."
                                        class="flex-1 px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors" />
                                    <button @click="addTag"
                                        class="px-4 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center">
                                        <i class="pi pi-plus"></i>
                                    </button>
                                </div>
                                <div class="flex flex-wrap gap-2 mt-2">
                                    <span v-for="(tag, index) in article.tags" :key="index"
                                        class="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm border border-primary-200">
                                        {{ tag }}
                                        <button @click="removeTag(index)"
                                            class="hover:text-primary-900 transition-colors duration-200">
                                            <i class="pi pi-times text-xs"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Editor de Contenido -->
                <div class="bg-white rounded-lg shadow-soft overflow-hidden border border-neutral-200">
                    <div class="p-4 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
                        <h3 class="text-lg font-semibold text-neutral-900">Contenido *</h3>
                        <button @click="previewContent"
                            class="flex items-center gap-2 px-3 py-2 text-sm border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors duration-200">
                            <i class="pi pi-eye"></i>
                            Vista Previa
                        </button>
                    </div>
                    <TiptapEditor v-model="article.content" :onImageUpload="handleImageUpload"
                        @imageUpload="handleEditorImageUpload"
                        :placeholder="'Comienza a escribir tu noticia aquí... Puedes usar el botón de imagen para agregar fotos, crear listas, citas y más.'" />
                    <p v-if="errors.content" class="text-secondary-600 text-sm mt-1 px-6 pb-4">{{ errors.content }}</p>
                </div>
            </div>

            <!-- Columna Lateral - Configuración -->
            <div class="space-y-6">
                <!-- Imagen Destacada -->
                <div class="bg-white rounded-lg p-6 shadow-soft border border-neutral-200">
                    <h3 class="text-lg font-semibold text-neutral-900 mb-4">Imagen Destacada</h3>

                    <div @click="openFeaturedImageUpload"
                        class="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary-400 transition-colors duration-200 group bg-neutral-50">
                        <div v-if="!article.featuredImage" class="space-y-2">
                            <i
                                class="pi pi-image text-4xl text-neutral-400 group-hover:text-primary-400 transition-colors"></i>
                            <p class="text-sm text-neutral-600">Haz clic para subir una imagen destacada</p>
                            <p class="text-xs text-neutral-500">Recomendado: 1200x630px</p>
                        </div>
                        <div v-else class="space-y-2">
                            <img :src="article.featuredImage" alt="Imagen destacada"
                                class="mx-auto h-32 w-full object-cover rounded-md border border-neutral-200">
                            <p class="text-sm text-primary-600 font-medium">Imagen destacada seleccionada</p>
                            <button @click.stop="removeFeaturedImage"
                                class="text-secondary-600 hover:text-secondary-700 text-sm transition-colors duration-200 flex items-center justify-center mx-auto">
                                <i class="pi pi-trash mr-1"></i>
                                Remover
                            </button>
                        </div>
                    </div>

                    <input type="file" ref="featuredImageInput" @change="handleFeaturedImageUpload" accept="image/*"
                        class="hidden" />
                </div>

                <!-- Acciones -->
                <div class="bg-white rounded-lg p-6 shadow-soft border border-neutral-200 sticky top-6">
                    <div class="space-y-3">
                        <button @click="saveArticle('published')" :disabled="!canSave || isSaving" :class="[
                            'w-full py-3 rounded-md font-semibold transition-colors duration-200 text-base flex items-center justify-center',
                            canSave && !isSaving
                                ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-md hover:shadow-lg'
                                : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                        ]">
                            <i class="pi pi-spin pi-spinner mr-2" v-if="isSaving"></i>
                            <i class="pi pi-save mr-2" v-else></i>
                            {{ isSaving ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Publicar') }}
                        </button>

                        <button @click="previewContent" :disabled="!article.content" :class="[
                            'w-full py-2 border rounded-md transition-colors duration-200 text-base flex items-center justify-center',
                            article.content
                                ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-50 hover:border-neutral-400'
                                : 'border-neutral-200 text-neutral-400 cursor-not-allowed'
                        ]">
                            <i class="pi pi-eye mr-2"></i>
                            Vista Previa
                        </button>

                        <button v-if="isEditing" @click="deleteArticle"
                            class="w-full py-2 border border-secondary-300 text-secondary-700 rounded-md hover:bg-secondary-50 transition-colors duration-200 text-base flex items-center justify-center">
                            <i class="pi pi-trash mr-2"></i>
                            Eliminar Noticia
                        </button>
                    </div>

                    <!-- Información de guardado -->
                    <div v-if="lastSaved" class="mt-4 p-3 bg-primary-50 border border-primary-200 rounded-md">
                        <p class="text-primary-700 text-sm flex items-center">
                            <i class="pi pi-check-circle mr-2"></i>
                            Guardado: {{ lastSaved }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import TiptapEditor from '@/components/content/TiptapEditor.vue'
import { generateContentPreview, validateContentForPreview } from '@/utils/contentPreview'

const router = useRouter()
const route = useRoute()

// Refs
const featuredImageInput = ref(null)
const tagInput = ref('')
const isSaving = ref(false)
const lastSaved = ref(null)

// Estado del artículo
const article = reactive({
    id: null,
    title: '',
    excerpt: '',
    content: '',
    featuredImage: '',
    category: '',
    tags: [],
    status: 'draft',
    scheduledDate: '',
    author: 'Amy Elsner',
    slug: '',
    createdAt: null,
    updatedAt: null
})

const errors = reactive({
    title: '',
    excerpt: '',
    content: '',
    category: ''
})

// Computed
const isEditing = computed(() => !!article.id)

const canSave = computed(() => {
    return article.title.trim() !== '' &&
        article.excerpt.trim() !== '' &&
        article.content.trim() !== '' &&
        article.category.trim() !== ''
})

// Métodos
const validateForm = () => {
    let isValid = true

    errors.title = article.title.trim() ? '' : 'El título es requerido'
    errors.excerpt = article.excerpt.trim() ? '' : 'La descripción corta es requerida'
    errors.content = article.content.trim() ? '' : 'El contenido es requerido'
    errors.category = article.category.trim() ? '' : 'La categoría es requerida'

    if (errors.title || errors.excerpt || errors.content || errors.category) {
        isValid = false
    }

    return isValid
}

const addTag = () => {
    const tag = tagInput.value.trim()
    if (tag && !article.tags.includes(tag)) {
        article.tags.push(tag)
        tagInput.value = ''
    }
}

const removeTag = (index) => {
    article.tags.splice(index, 1)
}

const openFeaturedImageUpload = () => {
    featuredImageInput.value?.click()
}

const handleFeaturedImageUpload = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
            alert('La imagen es demasiado grande. Máximo 5MB.')
            return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
            article.featuredImage = e.target.result
        }
        reader.readAsDataURL(file)
    }
    event.target.value = ''
}

const removeFeaturedImage = () => {
    article.featuredImage = ''
}

// Manejo de imágenes del editor
const handleEditorImageUpload = async (file) => {
    try {
        // En una implementación real, aquí subirías la imagen a tu servidor
        const formData = new FormData()
        formData.append('image', file)

        // Simulación de upload
        const response = await fetch('/api/articles/upload-image', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })

        if (!response.ok) throw new Error('Upload failed')

        const data = await response.json()
        return data.url

    } catch (error) {
        console.error('Error subiendo imagen:', error)
        throw error
    }
}

const handleImageUpload = async (file) => {
    return handleEditorImageUpload(file)
}

const saveArticle = async (status = 'draft') => {
    if (!validateForm()) {
        alert('Por favor, completa todos los campos requeridos.')
        return
    }

    isSaving.value = true
    article.status = status

    try {
        // Simular guardado en base de datos
        console.log('Guardando artículo:', article)

        // Aquí iría tu llamada a la API
        // const response = await fetch('/api/articles', {
        //   method: article.id ? 'PUT' : 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   },
        //   body: JSON.stringify(article)
        // })

        // if (!response.ok) throw new Error('Error al guardar')

        // const savedArticle = await response.json()

        // Simulación de éxito
        await new Promise(resolve => setTimeout(resolve, 1000))

        lastSaved.value = new Date().toLocaleTimeString()

        const message = article.id
            ? 'Artículo actualizado exitosamente'
            : status === 'published'
                ? 'Artículo publicado exitosamente'
                : 'Borrador guardado exitosamente'

        alert(message)

        if (status === 'published') {
            router.push('/admin/contenido')
        }

    } catch (error) {
        console.error('Error al guardar:', error)
        alert('Error al guardar el artículo. Por favor, intenta nuevamente.')
    } finally {
        isSaving.value = false
    }
}

const previewContent = () => {
    generateContentPreview({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        featuredImage: article.featuredImage,
        author: article.author,
        category: article.category,
        type: 'news' // o 'article' según corresponda
    })
}

const deleteArticle = () => {
    if (confirm('¿Estás seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer.')) {
        // Simular eliminación
        console.log('Eliminando artículo:', article.id)
        alert('Noticia eliminada exitosamente')
        router.push('/admin/contenido')
    }
}

// Generar slug automáticamente desde el título
const generateSlug = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
}

// Cargar artículo si estamos editando
onMounted(() => {
    if (route.params.id) {
        loadArticle(route.params.id)
    }
})

const loadArticle = async (id) => {
    try {
        // Simular carga de artículo
        // const response = await fetch(`/api/articles/${id}`)
        // const data = await response.json()
        // Object.assign(article, data)

        console.log('Cargando artículo:', id)

    } catch (error) {
        console.error('Error cargando artículo:', error)
        alert('Error al cargar el artículo')
        router.push('/admin/contenido')
    }
}
</script>