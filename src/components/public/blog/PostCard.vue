<template>
    <article
        class="bg-white border-2 border-gray-200 overflow-hidden hover:border-accent-500 transition-all duration-300 group">
        <!-- Imagen -->
        <div class="relative overflow-hidden h-64">
            <img :src="article.image" :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute top-0 left-0">
                <span class="bg-accent-500 text-white px-4 py-2 text-sm font-semibold">
                    {{ article.category }}
                </span>
            </div>
        </div>

        <!-- Contenido -->
        <div class="p-6">
            <!-- Metadata -->
            <div class="flex items-center text-sm text-gray-500 mb-3 pb-3 border-b border-gray-200">
                <div class="flex items-center gap-2">
                    <i class="pi pi-calendar text-accent-500"></i>
                    <span>{{ article.date }}</span>
                </div>
            </div>

            <!-- Título -->
            <h2
                class="text-2xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors">
                {{ article.title }}
            </h2>

            <!-- Descripción -->
            <p class="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {{ article.description }}
            </p>

            <!-- Autor -->
            <div class="flex items-center justify-between pt-4 border-t-2 border-gray-200">
                <div class="flex items-center gap-3">
                    <div
                        class="w-10 h-10 bg-accent-500 text-white flex items-center justify-center font-bold rounded-full">
                        {{ article.author.name[0] }}
                    </div>
                    <div>
                        <p class="text-sm font-semibold text-gray-800">{{ article.author.name }}</p>
                        <p class="text-xs text-gray-500">{{ article.author.role }}</p>
                    </div>
                </div>
                <Button label="Leer más" icon="pi pi-arrow-right" iconPos="right" text
                    class="text-accent-600 hover:text-accent-700 font-semibold hover:underline"
                    @click="handleReadMore" />
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mt-4">
                <span v-for="tag in article.tags" :key="tag"
                    class="px-3 py-1 border border-gray-300 text-gray-700 text-xs font-medium hover:border-accent-500 hover:text-accent-600 transition-colors cursor-pointer"
                    @click="handleTagClick(tag)">
                    #{{ tag }}
                </span>
            </div>
        </div>
    </article>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import Button from 'primevue/button'

// Props
const props = defineProps({
    article: {
        type: Object,
        required: true,
        validator: (value) => {
            return [
                'id',
                'title',
                'description',
                'image',
                'category',
                'date',
                'author',
                'tags'
            ].every(key => key in value)
        }
    }
})

// Emits
const emit = defineEmits(['read-more', 'tag-click'])

// Métodos
const handleReadMore = () => {
    emit('read-more', props.article.id)
}

const handleTagClick = (tag) => {
    emit('tag-click', tag)
}
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>