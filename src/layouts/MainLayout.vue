<template>
    <router-view />
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(() => route.path, (newPath) => {
    console.log(`[Router] Navegando a: ${newPath}`)
    console.log(`[Router] Meta:`, route.meta)
}, { immediate: true })
</script>
