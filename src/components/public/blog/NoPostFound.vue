<template>
    <div class="text-center py-16">
        <div class="max-w-md mx-auto">
            <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <i class="pi pi-inbox text-4xl text-gray-400"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-700 mb-3">
                {{ title }}
            </h3>
            <p class="text-gray-500 mb-6 leading-relaxed">
                {{ message }}
            </p>
            <Button v-if="showClearButton" label="Limpiar filtros" icon="pi pi-refresh" severity="secondary"
                @click="$emit('clear-filters')" class="px-6" />
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import Button from 'primevue/button'

// Props
const props = defineProps({
    searchQuery: {
        type: String,
        default: ''
    },
    selectedCategory: {
        type: String,
        default: 'todos'
    },
    categoryName: {
        type: String,
        default: ''
    },
    showClearButton: {
        type: Boolean,
        default: true
    }
})

// Emits
const emit = defineEmits(['clear-filters'])

// Computed properties reactivas
import { computed } from 'vue'

const title = computed(() => {
    return 'No se encontraron artículos'
})

const message = computed(() => {
    if (props.searchQuery) {
        return `No se encontraron artículos que coincidan con "${props.searchQuery}". Intenta con otros términos de búsqueda.`
    }
    if (props.selectedCategory !== 'todos') {
        return `No hay artículos disponibles en la categoría "${props.categoryName}". Próximamente agregaremos contenido aquí.`
    }
    return 'No hay artículos disponibles en este momento. Vuelve pronto para ver nuevo contenido.'
})
</script>

<style scoped>
/* Estilos específicos del componente si son necesarios */
</style>