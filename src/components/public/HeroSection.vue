<template>
  <section class="relative bg-tertiary-700 text-white min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden">
    
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 z-0 opacity-[0.07]">
      <div class="absolute inset-0 bg-pattern"></div>
    </div>
    
    <!-- Gradient Overlay -->
    <div class="absolute inset-0 bg-gradient-to-br from-tertiary-800/50 via-tertiary-700/30 to-primary-900/40 z-0"></div>
    
    <div class="relative z-10 container mx-auto px-6 md:px-12 lg:px-16">
      <div class="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
        
        <!-- Contenido Izquierdo -->
        <div class="text-left space-y-7 animate-fade-in">
          <!-- Badge Premium -->
          <div class="inline-flex items-center gap-2.5 bg-white/15 border border-white/30 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-white/20 transition-all duration-300 shadow-lg">
            <i class="pi pi-verified text-primary-400 text-base"></i>
            <span class="text-sm font-bold text-white tracking-wide">Universidad de El Salvador</span>
          </div>
          
          <!-- Título Principal -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-white">
            <span class="block mb-2">Departamento de</span>
            <span class="block text-primary-400 animate-gradient">Agronomía</span>
          </h1>
          
          <!-- Descripción -->
          <p class="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl font-light">
            Formando profesionales agronómicos con <span class="font-semibold text-primary-300">excelencia académica</span> y compromiso social, capacitados para impulsar el desarrollo agrícola sostenible de la región oriental.
          </p>
          
          <!-- CTA Button -->
          <div class="pt-4 flex flex-wrap gap-4">
            <button
              @click="scrollToContent"
              class="group bg-secondary-600 hover:bg-secondary-700 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-secondary-600/50 hover:scale-105 inline-flex items-center gap-3"
            >
              <span>Suscríbete a Nuestras Noticias</span>
              <i class="pi pi-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
            </button>
          </div>

          <!-- Stats -->
          <div class="pt-6 flex flex-wrap gap-8">
            <div class="space-y-1">
              <div class="text-3xl font-bold text-primary-400">20+</div>
              <div class="text-sm text-white/70">Años de Experiencia</div>
            </div>
            <div class="space-y-1">
              <div class="text-3xl font-bold text-primary-400">500+</div>
              <div class="text-sm text-white/70">Egresados Exitosos</div>
            </div>
            <div class="space-y-1">
              <div class="text-3xl font-bold text-primary-400">10+</div>
              <div class="text-sm text-white/70">Docentes Expertos</div>
            </div>
          </div>
        </div>
        
        <!-- Video/Imagen Derecha -->
        <div class="relative flex justify-center md:justify-end animate-slide-in">
          <div class="relative group">
            
            <!-- Video Container -->
            <div class="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 hover:border-primary-400/50 transition-all duration-500" style="width: 360px; height: 640px;">
              <video
                v-if="showVideo"
                ref="videoElement"
                src="@/assets/Videos/Present_VideoWeb.mp4"
                class="w-full h-full object-cover"
                :muted="isMuted"
                autoplay
                loop
                playsinline
              ></video>
              
              <!-- Imagen de respaldo -->
              <img
                v-else
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=360&h=640&fit=crop"
                alt="Departamento de Agronomía"
                class="w-full h-full object-cover"
              />
              
              <!-- Overlay Gradient -->
              <div class="absolute inset-0 bg-gradient-to-t from-tertiary-900/60 via-transparent to-transparent pointer-events-none"></div>
              
              <!-- Botón Mute/Unmute Mejorado -->
              <button
                v-if="showVideo"
                @click="toggleMute"
                class="absolute top-5 right-5 bg-tertiary-900/80 hover:bg-tertiary-800 text-white p-3.5 rounded-full transition-all duration-300 backdrop-blur-md border border-white/20 hover:scale-110 shadow-xl z-10"
              >
                <i :class="isMuted ? 'pi pi-volume-off' : 'pi pi-volume-up'" class="text-base"></i>
              </button>
            </div>
            
            <!-- Floating Decorative Elements -->
            <div class="absolute -bottom-6 -right-6 w-40 h-40 bg-primary-500/30 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
            <div class="absolute -top-6 -left-6 w-32 h-32 bg-accent-400/40 rounded-full blur-2xl animate-pulse-slow-delayed pointer-events-none"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Decorative Wave -->
    <div class="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#145231" fill-opacity="0.4"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showVideo = ref(false)
const isMuted = ref(true)
const videoElement = ref(null)

onMounted(() => {
  showVideo.value = true
})

const toggleMute = () => {
  if (videoElement.value) {
    isMuted.value = !isMuted.value
    videoElement.value.muted = isMuted.value
  }
}

const scrollToContent = () => {
  window.scrollTo({
    top: window.innerHeight * 0.85,
    behavior: 'smooth'
  })
}
</script>

<style scoped>
/* Background Pattern */
.bg-pattern {
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.03) 40px, rgba(255,255,255,.03) 80px),
    repeating-linear-gradient(-45deg, transparent, transparent 40px, rgba(255,255,255,.02) 40px, rgba(255,255,255,.02) 80px);
}

/* Gradient Animation */
@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background: linear-gradient(90deg, #4ade80, #22c55e, #4ade80);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  animation: gradient 3s ease infinite;
}

/* Fade In Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

/* Slide In Animation */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in {
  animation: slideIn 0.8s ease-out 0.2s backwards;
}

/* Pulse Animations */
@keyframes pulseSlow {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

@keyframes pulseSlowDelayed {
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.15);
  }
}

.animate-pulse-slow {
  animation: pulseSlow 4s ease-in-out infinite;
}

.animate-pulse-slow-delayed {
  animation: pulseSlowDelayed 5s ease-in-out infinite 1s;
}
</style>