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
          <div v-if="headerText" class="header-text">
            <div class="text-2xl md:text-3xl font-bold leading-tight">
              {{ headerText }}
            </div>
            <div v-if="headerSubtext" class="text-lg md:text-xl text-primary-100 mt-2">
              {{ headerSubtext }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="email-body max-w-4xl mx-auto px-6 py-8">
      <!-- Saludo -->
      <div v-if="greeting" class="greeting mb-6 text-lg">
        {{ greeting }}
      </div>

      <!-- Contenido Principal -->
      <div class="main-content mb-8">
        <slot name="content">
          <!-- Contenido por defecto -->
          <p class="text-base leading-relaxed">{{ mainContent }}</p>
        </slot>
      </div>

      <!-- Botón de Acción (Opcional) -->
      <div v-if="buttonText && buttonLink" class="action-button-container mb-8">
        <Button :label="buttonText" :href="buttonLink"
          class="p-button-primary bg-primary-500 hover:bg-primary-600 border-primary-500" />
      </div>

      <!-- Información Adicional -->
      <div v-if="additionalInfo" class="additional-info mb-6">
        <slot name="additional">
          <p class="text-base text-gray-700">{{ additionalInfo }}</p>
        </slot>
      </div>

      <!-- Despedida -->
      <div v-if="closing" class="closing text-base whitespace-pre-line">
        {{ closing }}
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
  name: 'EmailTemplate',
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
    headerText: {
      type: String,
      default: ''
    },
    headerSubtext: {
      type: String,
      default: ''
    },

    // Body
    greeting: {
      type: String,
      default: 'Hola,'
    },
    mainContent: {
      type: String,
      default: ''
    },
    buttonText: {
      type: String,
      default: ''
    },
    buttonLink: {
      type: String,
      default: ''
    },
    additionalInfo: {
      type: String,
      default: ''
    },
    closing: {
      type: String,
      default: 'Saludos cordiales,\nEl equipo de AgroMinerva'
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
/* Estilos adicionales específicos para email */
.email-container {
  max-width: 100%;
  margin: 0 auto;
}

/* Asegurar que los enlaces mantengan su color en email clients */
.social-link,
.unsubscribe-link {
  text-decoration: none;
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
}
</style>