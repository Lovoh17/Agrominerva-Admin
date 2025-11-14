<template>
    <div class="email-container bg-white font-sans text-gray-900">
        <!-- Header -->
        <div class="email-header bg-tertiary-500 text-white">
            <div class="header-content max-w-4xl mx-auto px-4 py-6">
                <div class="flex flex-col items-start gap-3">
                    <!-- Logo -->
                    <div class="flex-shrink-0">
                        <img :src="logo || logoDefault" alt="AgroMinerva Logo" class="logo h-32 md:h-32" />
                    </div>

                    <!-- Texto del Header -->
                    <div class="header-text">
                        <div class="text-2xl md:text-3xl font-bold leading-tight">
                            ¡Tu pedido está en camino! 
                        </div>
                        <div class="text-lg md:text-xl text-primary-100 mt-2">
                            Orden #{{ orderNumber }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Body -->
        <div class="email-body max-w-4xl mx-auto px-6 py-8">
            <!-- Saludo -->
            <div class="greeting mb-6 text-lg">
                Hola {{ customerName }},
            </div>

            <!-- Mensaje Principal -->
            <div class="main-content mb-8">
                <p class="text-base leading-relaxed mb-4">
                    Nos complace informarte que tu pedido ha sido enviado y está en camino a tu dirección.
                </p>
            </div>

            <!-- Información del Envío -->
            <div class="shipping-info bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                <h3 class="text-lg font-bold text-tertiary-500 mb-4">Detalles del Envío</h3>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">Número de Orden:</p>
                        <p class="font-semibold">{{ orderNumber }}</p>
                    </div>

                    <div v-if="trackingNumber">
                        <p class="text-sm text-gray-600 mb-1">Número de Rastreo:</p>
                        <p class="font-semibold">{{ trackingNumber }}</p>
                    </div>

                    <div v-if="carrier">
                        <p class="text-sm text-gray-600 mb-1">Transportista:</p>
                        <p class="font-semibold">{{ carrier }}</p>
                    </div>

                    <div v-if="estimatedDelivery">
                        <p class="text-sm text-gray-600 mb-1">Entrega Estimada:</p>
                        <p class="font-semibold">{{ estimatedDelivery }}</p>
                    </div>
                </div>

                <!-- Dirección de Envío -->
                <div v-if="shippingAddress" class="mt-6 pt-6 border-t border-gray-200">
                    <p class="text-sm text-gray-600 mb-2">Dirección de Envío:</p>
                    <p class="text-base whitespace-pre-line">{{ shippingAddress }}</p>
                </div>
            </div>

            <!-- Productos -->
            <div v-if="products && products.length > 0" class="products-section mb-8">
                <h3 class="text-lg font-bold text-tertiary-500 mb-4">Productos en tu Pedido</h3>
                <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div v-for="(product, index) in products" :key="index"
                        class="product-item p-4 border-b border-gray-200 last:border-b-0 flex items-start gap-4">
                        <img v-if="product.image" :src="product.image" :alt="product.name"
                            class="w-20 h-20 object-cover rounded" />
                        <div class="flex-1">
                            <p class="font-semibold text-base mb-1">{{ product.name }}</p>
                            <p class="text-sm text-gray-600 mb-1">Cantidad: {{ product.quantity }}</p>
                            <p v-if="product.price" class="text-sm text-primary-500 font-medium">${{ product.price }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Botón de Rastreo -->
            <div v-if="trackingLink" class="action-button-container mb-8 text-center">
                <Button :label="'Rastrear mi Pedido'" :href="trackingLink"
                    class="p-button-primary bg-primary-500 hover:bg-primary-600 border-primary-500 inline-block px-6 py-3 rounded text-white font-semibold no-underline" />
            </div>

            <!-- Información Adicional -->
            <div class="additional-info bg-blue-50 border-l-4 border-primary-500 p-4 mb-6">
                <p class="text-sm text-gray-700">
                    <strong>💡 Tip:</strong> Asegúrate de que alguien esté disponible para recibir el paquete.
                    Si no estás en casa, el transportista puede dejar una nota con instrucciones.
                </p>
            </div>

            <!-- Despedida -->
            <div class="closing text-base whitespace-pre-line">
                {{ closing || 'Gracias por tu confianza.\n\nSaludos cordiales,\nEl equipo de AgroMinerva' }}
            </div>
        </div>

        <!-- Footer -->
        <div class="email-footer bg-gray-100 border-t border-gray-200">
            <div class="footer-content max-w-4xl mx-auto px-6 py-8">
                <div class="footer-section mb-6">
                    <p class="company-name font-bold text-tertiary-500 mb-2">
                        {{ companyName || 'AgroMinerva' }}
                    </p>
                    <p v-if="companyAddress" class="company-info text-sm text-gray-600 mb-1">
                        {{ companyAddress }}
                    </p>
                    <p v-if="companyPhone" class="company-info text-sm text-gray-600 mb-1">
                        {{ companyPhone }}
                    </p>
                    <p v-if="companyEmail" class="company-info text-sm text-gray-600 mb-1">
                        {{ companyEmail }}
                    </p>
                </div>

                <!-- Redes Sociales -->
                <div v-if="socialLinks" class="social-links mb-6">
                    <div class="flex space-x-4">
                        <a v-for="(link, platform) in socialLinks" :key="platform" :href="link"
                            class="social-link text-primary-500 hover:text-primary-600 text-sm">
                            {{ platform }}
                        </a>
                    </div>
                </div>

                <!-- Mensaje de Footer -->
                <div class="footer-message">
                    <p class="text-xs text-gray-500 mb-2">
                        {{ footerMessage || 'Este es un correo automático, por favor no responder.' }}
                    </p>
                    <p v-if="unsubscribeLink" class="text-xs">
                        <a :href="unsubscribeLink" class="unsubscribe-link text-primary-500 hover:text-primary-600">
                            Darse de baja
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Button from 'primevue/button';
import logoDefault from '@/assets/images/AGRO-MINERVA-BLANCO.png';

export default defineComponent({
    name: 'OrderShippingEmail',
    components: {
        Button
    },
    data() {
        return {
            logoDefault: logoDefault
        }
    },
    props: {
        // Header
        logo: {
            type: String,
            default: ''
        },

        // Información del Cliente y Orden
        customerName: {
            type: String,
            required: true
        },
        orderNumber: {
            type: String,
            required: true
        },

        // Información del Envío
        trackingNumber: {
            type: String,
            default: ''
        },
        carrier: {
            type: String,
            default: ''
        },
        estimatedDelivery: {
            type: String,
            default: ''
        },
        shippingAddress: {
            type: String,
            default: ''
        },
        trackingLink: {
            type: String,
            default: ''
        },

        // Productos
        products: {
            type: Array,
            default: () => []
            // Formato esperado: [{ name: '', quantity: 0, price: '', image: '' }]
        },

        // Body
        closing: {
            type: String,
            default: ''
        },

        // Footer
        companyName: {
            type: String,
            default: 'AgroMinerva'
        },
        companyAddress: {
            type: String,
            default: ''
        },
        companyPhone: {
            type: String,
            default: ''
        },
        companyEmail: {
            type: String,
            default: ''
        },
        socialLinks: {
            type: Object,
            default: null
        },
        footerMessage: {
            type: String,
            default: ''
        },
        unsubscribeLink: {
            type: String,
            default: ''
        }
    }
});
</script>

<style scoped>
.email-container {
    max-width: 100%;
    margin: 0 auto;
}

.social-link,
.unsubscribe-link {
    text-decoration: none;
}

.product-item:hover {
    background-color: #f9fafb;
}

/* Estilos responsivos para email */
@media (max-width: 640px) {

    .email-body,
    .footer-content {
        padding-left: 16px;
        padding-right: 16px;
    }

    .header-content {
        padding-left: 16px;
        padding-right: 16px;
    }

    .header-text {
        text-align: center;
    }

    .grid-cols-2 {
        grid-template-columns: 1fr;
    }
}
</style>