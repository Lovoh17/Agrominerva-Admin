<template>
  <div>
    <HeroSection />

    <!-- Estadísticas -->
    <div class="bg-green-600 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">30+</div>
            <div class="text-sm md:text-base text-green-100">Años de Experiencia</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">500+</div>
            <div class="text-sm md:text-base text-green-100">Estudiantes Activos</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">50+</div>
            <div class="text-sm md:text-base text-green-100">Proyectos de Investigación</div>
          </div>
          <div class="text-center">
            <div class="text-4xl md:text-5xl font-bold mb-2">15+</div>
            <div class="text-sm md:text-base text-green-100">Docentes Especializados</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Productos Destacados -->
    <div class="p-6 md:p-12 bg-gray-50">
      <div class="container mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Productos Destacados
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Herramientas y recursos esenciales para el aprendizaje agrícola
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="product in featuredProducts" 
            :key="product.id"
            class="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <div class="relative overflow-hidden h-64 bg-gray-200">
              <img 
                :src="product.image" 
                :alt="product.name"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute top-4 right-4">
                <span class="bg-green-500 text-white px-3 py-1 text-sm font-semibold">
                  {{ product.category }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {{ product.name }}
              </h3>
              <p class="text-gray-600 mb-4 line-clamp-2">
                {{ product.description }}
              </p>

              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-1">
                  <i class="pi pi-star-fill text-yellow-400 text-sm"></i>
                  <span class="font-semibold text-gray-900">{{ product.rating }}</span>
                  <span class="text-gray-500 text-sm">({{ product.reviews }})</span>
                </div>
                <div class="text-2xl font-bold text-green-600">
                  ${{ product.price }}
                </div>
              </div>

              <button class="w-full bg-green-600 text-white py-3 font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <i class="pi pi-shopping-cart"></i>
                Añadir al Carrito
              </button>
            </div>
          </div>
        </div>

        <div class="text-center mt-12">
          <button class="bg-gray-900 text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
            Ver Todos los Productos
            <i class="pi pi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Últimas Noticias del Blog -->
    <div class="p-6 md:p-12 bg-white">
      <div class="container mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Últimas Noticias del Blog
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Mantente informado sobre las últimas tendencias en agronomía y agricultura sostenible
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="post in blogPosts" 
            :key="post.id"
            class="bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <div class="relative overflow-hidden h-56 bg-gray-200">
              <img 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <span class="text-white text-sm font-semibold bg-green-600 px-3 py-1">
                  {{ post.category }}
                </span>
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <div class="flex items-center gap-1">
                  <i class="pi pi-calendar"></i>
                  <span>{{ post.date }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <i class="pi pi-user"></i>
                  <span>{{ post.author }}</span>
                </div>
              </div>

              <h3 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                {{ post.title }}
              </h3>

              <p class="text-gray-600 mb-4 line-clamp-3">
                {{ post.excerpt }}
              </p>

              <button class="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-2 group">
                Leer más
                <i class="pi pi-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </article>
        </div>

        <div class="text-center mt-12">
          <button class="bg-green-600 text-white px-8 py-3 font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2">
            Ver Todas las Noticias
            <i class="pi pi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Sección de Llamada a la Acción -->
    <div class="bg-gradient-to-r from-green-700 to-green-600 text-white py-20">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para Comenzar tu Carrera en Agronomía?
        </h2>
        <p class="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
          Únete a nuestra comunidad de estudiantes y profesionales comprometidos con el desarrollo agrícola sostenible
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button class="bg-white text-green-700 px-8 py-4 font-bold hover:bg-gray-100 transition-colors text-lg">
            Inscríbete Ahora
          </button>
          <button class="bg-transparent border-2 border-white text-white px-8 py-4 font-bold hover:bg-white hover:text-green-700 transition-colors text-lg">
            Conoce Más
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeroSection from '@/components/public/HeroSection.vue'

const featuredProducts = ref([
  {
    id: 1,
    name: 'Kit de Análisis de Suelos',
    description: 'Kit completo para análisis de pH, nutrientes y composición del suelo. Ideal para prácticas de laboratorio.',
    price: 89.99,
    rating: 4.8,
    reviews: 124,
    category: 'Laboratorio',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Manual de Cultivos Extensivos',
    description: 'Guía completa sobre técnicas de cultivo, manejo de plagas y cosecha de cultivos de granos básicos.',
    price: 45.00,
    rating: 4.9,
    reviews: 89,
    category: 'Libros',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Set de Herramientas Agrícolas',
    description: 'Conjunto profesional de herramientas para trabajo de campo: palas, rastrillos, tijeras de poda y más.',
    price: 125.50,
    rating: 4.7,
    reviews: 156,
    category: 'Herramientas',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Microscopio Digital USB',
    description: 'Microscopio de alta resolución para análisis de tejidos vegetales y organismos microscópicos.',
    price: 199.99,
    rating: 4.6,
    reviews: 78,
    category: 'Tecnología',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Semillas Certificadas Variedad Premium',
    description: 'Semillas certificadas de maíz, frijol y sorgo. Alta germinación y resistencia a plagas.',
    price: 35.00,
    rating: 4.9,
    reviews: 203,
    category: 'Semillas',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Sistema de Riego por Goteo',
    description: 'Sistema completo de riego por goteo para parcelas pequeñas. Incluye temporizador automático.',
    price: 275.00,
    rating: 4.8,
    reviews: 92,
    category: 'Riego',
    image: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?w=600&h=400&fit=crop'
  }
])

const blogPosts = ref([
  {
    id: 1,
    title: 'Agricultura Sostenible: El Futuro de la Producción Alimentaria',
    excerpt: 'Descubre cómo las prácticas agrícolas sostenibles están transformando la producción de alimentos a nivel mundial y su impacto en el medio ambiente.',
    author: 'Ing. Marco Calderón',
    date: '15 Oct 2024',
    category: 'Sostenibilidad',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop'
  },
  {
    id: 2,
    title: 'Nuevas Técnicas de Control Biológico de Plagas',
    excerpt: 'Investigadores desarrollan métodos innovadores para el control de plagas sin químicos, utilizando organismos benéficos y técnicas naturales.',
    author: 'Dr. Nery Guevara',
    date: '12 Oct 2024',
    category: 'Investigación',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop'
  },
  {
    id: 3,
    title: 'Impacto del Cambio Climático en los Cultivos',
    excerpt: 'Análisis profundo sobre cómo el cambio climático está afectando los patrones de cultivo y qué estrategias de adaptación están implementando los agricultores.',
    author: 'Ing. Jaime Río',
    date: '08 Oct 2024',
    category: 'Clima',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&h=400&fit=crop'
  },
  {
    id: 4,
    title: 'Tecnología de Precisión en la Agricultura Moderna',
    excerpt: 'Drones, sensores y big data están revolucionando la forma en que los agricultores toman decisiones sobre sus cultivos.',
    author: 'Ing. Marco Calderón',
    date: '05 Oct 2024',
    category: 'Tecnología',
    image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop'
  },
  {
    id: 5,
    title: 'Manejo Integrado de Nutrientes en Suelos Tropicales',
    excerpt: 'Estrategias efectivas para optimizar el uso de fertilizantes y mejorar la fertilidad del suelo en regiones tropicales.',
    author: 'Dr. Nery Guevara',
    date: '01 Oct 2024',
    category: 'Suelos',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=600&h=400&fit=crop'
  },
  {
    id: 6,
    title: 'Economía Agrícola: Tendencias del Mercado 2024',
    excerpt: 'Análisis de las tendencias económicas que están moldeando el sector agrícola y oportunidades para pequeños y medianos productores.',
    author: 'Ing. Jaime Río',
    date: '28 Sep 2024',
    category: 'Economía',
    image: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?w=600&h=400&fit=crop'
  }
])
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