<template>
  <!-- 
    Toast de PrimeVue.
    Usamos la propiedad 'pt' (Pass Through) para aplicar clases 
    de Tailwind CSS que sobreescriben la apariencia del tema Aura.
  -->
  <Toast group="app" :pt="{
    // 1. Contenedor principal del Toast 
    root: 'p-4 top-0 right-0 z-[1000]',

    // 2. Contenedor de cada mensaje individual
    message: ({ props }) => [
      'shadow-2xl rounded-xl p-4 my-2 border-l-4',

      // Estilos condicionales basados en el tipo de notificación
      { 'bg-green-50 border-primary-500': props.message.severity === 'success' },
      { 'bg-yellow-50 border-color-accent': props.message.severity === 'warn' },
      { 'bg-red-50 border-color-secondary': props.message.severity === 'error' },
      { 'bg-blue-50 border-blue-500': props.message.severity === 'info' },
    ],

    // 3. Contenido del mensaje (ícono, título, cuerpo)
    content: 'flex items-center space-x-3',

    // 4. Ícono del mensaje
    icon: 'text-2xl',

    // 5. Título (summary) y Cuerpo (detail)
    text: 'flex-1 space-y-0.5',
    summary: 'font-bold text-base text-surface-900',
    detail: 'text-sm text-surface-700',

    // 6. Botón de cerrar
    closeButton: 'w-8 h-8 rounded-full ml-auto hover:bg-surface-100 transition-colors duration-200',
    closeIcon: 'text-lg',
  }" />
</template>

<script setup>
import Toast from 'primevue/toast';
/****
 * uso en demas vistas 
 const toast = useToast()
toast.add({
  group: 'app',
  severity: 'success',
  summary: 'Éxito',
  detail: 'Operación completada correctamente',
  life: 3000
})
 */

</script>
