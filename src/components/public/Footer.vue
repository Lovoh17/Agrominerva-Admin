<template>
    <footer class="bg-tertiary-500 text-white mt-auto">
        <!-- Secciones Principales -->
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">

                <!-- Columna 1: Logo y Descripción -->
                <div class="lg:col-span-5">
                    <div class="mb-6">
                        <img src="../../assets/images/AGRO-MINERVA-VERTICAL-SIN-FONDO.png" alt="Logo AgroMinerva"
                            class="h-32 w-auto" v-if="logo" />
                    </div>
                    <p class="text-primary-100 mb-6 leading-relaxed">
                        Líderes en soluciones agrícolas innovadoras. Ofrecemos productos de calidad, asesoramiento
                        experto y el mejor servicio para el crecimiento de tu negocio agropecuario.
                    </p>

                    <!-- Redes Sociales -->
                    <div class="flex space-x-2">
                        <Button v-for="social in socialLinks" :key="social.name" :icon="social.icon" text
                            class="text-white hover:text-accent-400 hover:bg-white/10 rounded-full transition-all duration-300 w-10 h-10"
                            severity="secondary" />
                    </div>
                </div>

                <!-- Columna 2: Navegación -->
                <div class="lg:col-span-3">
                    <h4 class="text-lg font-bold mb-6 text-white border-b-2 border-accent-500 pb-2 inline-block">
                        Navegación
                    </h4>
                    <ul class="space-y-2">
                        <li v-for="item in navItems" :key="item.label">
                            <router-link :to="item.to" class="footer-link group">
                                <i :class="item.icon"
                                    class="text-accent-400 group-hover:text-accent-300 transition-colors"></i>
                                <span>{{ item.label }}</span>
                            </router-link>
                        </li>
                    </ul>
                </div>

                <!-- Columna 3: Contacto -->
                <div class="lg:col-span-4">
                    <h4 class="text-lg font-bold mb-6 text-white border-b-2 border-accent-500 pb-2 inline-block">
                        Contacto
                    </h4>
                    <div class="space-y-4 mb-6">
                        <div class="flex items-start space-x-3 group">
                            <i class="pi pi-map-marker text-accent-400 mt-1 text-lg"></i>
                            <span class="text-primary-100 text-sm leading-relaxed">Calle Principal #123, Ciudad
                                Agrícola, País</span>
                        </div>
                        <div class="flex items-center space-x-3 group">
                            <i class="pi pi-phone text-accent-400 text-lg"></i>
                            <span class="text-primary-100 text-sm">+503 1234-5678</span>
                        </div>
                        <div class="flex items-center space-x-3 group">
                            <i class="pi pi-envelope text-accent-400 text-lg"></i>
                            <span class="text-primary-100 text-sm">contacto@agrominerva.com</span>
                        </div>
                        <div class="flex items-start space-x-3 group">
                            <i class="pi pi-clock text-accent-400 mt-1 text-lg"></i>
                            <span class="text-primary-100 text-sm">Lun - Vie: 8:00 AM - 5:00 PM<br>Sáb: 8:00 AM - 12:00
                                PM</span>
                        </div>
                    </div>

                    <!-- Newsletter -->
                    <div class="mt-6 pt-6 border-t border-primary-600/50">
                        <h5 class="text-base font-semibold text-white mb-3">
                            Newsletter Agrícola
                        </h5>
                        <p class="text-sm text-primary-200 mb-3">
                            Recibe tips agrícolas y ofertas exclusivas
                        </p>
                        <div class="flex space-x-2">
                            <InputText v-model="email" placeholder="Tu email"
                                class="flex-1 bg-tertiary-600 border-tertiary-400 text-white placeholder-primary-300 focus:border-accent-500" />
                            <Button icon="pi pi-send"
                                class="bg-accent-500 hover:bg-accent-600 border-accent-500 text-white shadow-lg"
                                @click="subscribeNewsletter" :disabled="!email" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Barra Inferior -->
        <div class="border-t border-primary-600/30 bg-tertiary-600/50">
            <div class="container mx-auto px-4 py-6">
                <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <!-- Copyright -->
                    <p class="text-primary-200 text-sm">
                        &copy; {{ currentYear }} <span class="font-semibold text-white">AgroMinerva</span>. Cultivando
                        el futuro de la agricultura.
                    </p>

                    <!-- Enlaces Legales -->
                    <div class="flex flex-wrap justify-center gap-x-6 gap-y-2">
                        <router-link v-for="link in legalLinks" :key="link.label" :to="link.to" class="legal-link">
                            {{ link.label }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const email = ref('')
const logo = ref(true)
const currentYear = ref(new Date().getFullYear())

const navItems = [
    { label: 'Inicio', to: '/', icon: 'pi pi-home' },
    { label: 'Tienda', to: '/tienda', icon: 'pi pi-shopping-bag' },
    { label: 'Blog Agrícola', to: '/blog', icon: 'pi pi-book' },
    { label: 'Conócenos', to: '/conocenos', icon: 'pi pi-info-circle' }
]

const socialLinks = [
    { name: 'Facebook', icon: 'pi pi-facebook' },
    { name: 'Twitter', icon: 'pi pi-twitter' },
    { name: 'Instagram', icon: 'pi pi-instagram' },
    { name: 'LinkedIn', icon: 'pi pi-linkedin' },
    { name: 'YouTube', icon: 'pi pi-youtube' }
]

const legalLinks = [
    { label: 'Política de Privacidad', to: '/privacidad' },
    { label: 'Términos de Servicio', to: '/terminos' },
    { label: 'Política de Cookies', to: '/cookies' },
    { label: 'Aviso Legal', to: '/aviso-legal' }
]

const subscribeNewsletter = () => {
    if (email.value) {
        toast.add({
            severity: 'success',
            summary: '¡Suscrito Exitosamente!',
            detail: 'Gracias por unirte a nuestra comunidad agrícola.',
            life: 4000
        })
        email.value = ''
    }
}
</script>

<style scoped>
.footer-link {
    @apply flex items-center space-x-3 text-primary-200 hover:text-white hover:translate-x-1 transition-all duration-300 no-underline py-2 px-3 rounded-lg;
}

.footer-link:hover {
    background-color: rgba(255, 255, 255, 0.05);
}

.legal-link {
    @apply text-primary-200 hover:text-accent-400 text-sm transition-colors duration-300 no-underline relative;
}

.legal-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: currentColor;
    transition: width 0.3s ease;
}

.legal-link:hover::after {
    width: 100%;
}

/* Estilos personalizados para el tema AgroMinerva */
:deep(.p-inputtext) {
    border-radius: 8px;
    padding: 0.75rem;
    transition: all 0.3s ease;
}

:deep(.p-inputtext:focus) {
    box-shadow: 0 0 0 3px rgba(139, 195, 74, 0.2);
}

:deep(.p-button) {
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    padding: 0.75rem 1rem;
}

:deep(.p-button:not(:disabled):hover) {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

:deep(.p-button.p-button-icon-only) {
    padding: 0.5rem;
}
</style>