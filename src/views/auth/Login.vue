<template>
  <section class="relative bg-emerald-800 min-h-screen flex items-center justify-center overflow-hidden">
    
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 z-0 opacity-[0.07]">
      <div class="absolute inset-0 bg-pattern"></div>
    </div>
    
    <!-- Overlay -->
    <div class="absolute inset-0 bg-emerald-900/30 z-0"></div>
    
    <!-- Floating Decorative Elements -->
    <div class="absolute top-20 left-20 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl animate-pulse-slow-delayed"></div>
    
    <div class="relative z-10 container mx-auto px-6 md:px-12 lg:px-16">
      <div class="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        
        <!-- Left Side - Branding -->
        <div class="hidden md:block text-white space-y-6 animate-fade-in">
          <!-- Logo/Badge -->
          <div class="inline-flex items-center gap-2.5 bg-white/15 border border-white/30 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg mb-8">
            <i class="fas fa-check-circle text-green-400 text-base"></i>
            <span class="text-sm font-bold text-white tracking-wide">Universidad de El Salvador</span>
          </div>
          
          <h1 class="text-5xl lg:text-6xl font-extrabold leading-tight">
            <span class="block mb-2">Bienvenido al</span>
            <span class="block animate-gradient">Departamento de</span>
            <span class="block text-green-400">Agronomía</span>
          </h1>
          
          
          <!-- Stats/Features -->
          <div class="pt-6 space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-green-400/20 flex items-center justify-center">
                <i class="fas fa-shield-halved text-green-400 text-xl"></i>
              </div>
              <div>
                <div class="font-semibold">Acceso Seguro</div>
                <div class="text-sm text-white/70">Protegemos tu información</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                <i class="fas fa-clock text-green-400 text-xl"></i>
              </div>
              <div>
                <div class="font-semibold">Disponible 24/7</div>
                <div class="text-sm text-white/70">Accede cuando lo necesites</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Right Side - Login Form -->
        <div class="relative animate-slide-in">
          <div class="bg-white shadow-2xl p-8 md:p-10 border border-white/20">
            
            <!-- Mobile Logo -->
            <div class="md:hidden text-center mb-6">
              <div class="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 mb-4">
                <i class="fas fa-seedling text-green-600"></i>
                <span class="text-sm font-bold text-emerald-800">UES Agronomía</span>
              </div>
            </div>
            
            <!-- Form Header -->
            <div class="text-center mb-8">
              <h2 class="text-3xl font-bold text-gray-800 mb-2">Iniciar Sesión</h2>
              <p class="text-gray-600">Ingresa tus credenciales para continuar</p>
            </div>
            
            <!-- Alert Message -->
            <div v-if="showAlert" 
                 :class="[
                   'mb-6 p-4 border flex items-start gap-3 animate-fade-in',
                   alertType === 'error' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'
                 ]">
              <i :class="[
                'fas text-lg',
                alertType === 'error' ? 'fa-circle-exclamation text-red-500' : 'fa-circle-check text-green-500'
              ]"></i>
              <div class="flex-1">
                <p :class="[
                  'text-sm font-medium',
                  alertType === 'error' ? 'text-red-800' : 'text-green-800'
                ]">{{ alertMessage }}</p>
              </div>
              <button @click="showAlert = false" class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <!-- Login Form -->
            <form @submit.prevent="handleLogin" class="space-y-5">
              
              <!-- Email Field -->
              <div>
                <label for="email" class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-envelope text-gray-400 mr-2"></i>Correo Electrónico
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="tu.correo@ues.edu.sv"
                  class="w-full px-4 py-3 border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none"
                  :class="{ 'border-red-300': errors.email }"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
              </div>
              
              <!-- Password Field -->
              <div>
                <label for="password" class="block text-sm font-semibold text-gray-700 mb-2">
                  <i class="fas fa-lock text-gray-400 mr-2"></i>Contraseña
                </label>
                <div class="relative">
                  <input
                    id="password"
                    v-model="formData.password"
                    :type="showPassword ? 'text' : 'password'"
                    required
                    placeholder="••••••••"
                    class="w-full px-4 py-3 border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none pr-12"
                    :class="{ 'border-red-300': errors.password }"
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                  </button>
                </div>
                <p v-if="errors.password" class="text-red-500 text-xs mt-1">{{ errors.password }}</p>
              </div>
              
              <!-- Remember Me & Forgot Password -->
              <div class="flex items-center justify-between">
                <label class="flex items-center cursor-pointer">
                  <input
                    v-model="formData.rememberMe"
                    type="checkbox"
                    class="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 cursor-pointer"
                  />
                  <span class="ml-2 text-sm text-gray-700">Recordarme</span>
                </label>
                <a href="#" class="text-sm font-medium text-green-600 hover:text-green-700 transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              
              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isLoading"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 transition-all duration-300 shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                <span v-if="!isLoading">Iniciar Sesión</span>
                <span v-else>Iniciando sesión...</span>
                <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
                <i v-else class="fas fa-arrow-right"></i>
              </button>
            </form>
            
            <!-- Divider -->
            
          </div>
        </div>
      </div>
    </div>
    
    <!-- Decorative Wave Bottom -->
    <div class="absolute bottom-0 left-0 right-0 z-0 pointer-events-none">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 80C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#065f46" fill-opacity="0.3"/>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formData = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)
const isLoading = ref(false)
const showAlert = ref(false)
const alertMessage = ref('')
const alertType = ref('error') // 'error' or 'success'

const validateForm = () => {
  let isValid = true
  errors.email = ''
  errors.password = ''
  
  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!formData.email) {
    errors.email = 'El correo es requerido'
    isValid = false
  } else if (!emailRegex.test(formData.email)) {
    errors.email = 'Ingresa un correo válido'
    isValid = false
  }
  
  // Validar contraseña
  if (!formData.password) {
    errors.password = 'La contraseña es requerida'
    isValid = false
  } else if (formData.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres'
    isValid = false
  }
  
  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) {
    return
  }
  
  isLoading.value = true
  
  // Simular llamada a API
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Simulación de login exitoso
    alertType.value = 'success'
    alertMessage.value = '¡Inicio de sesión exitoso! Redirigiendo...'
    showAlert.value = true
    
    // Aquí iría la lógica real de autenticación
    console.log('Login data:', formData)
    
    setTimeout(() => {
      // Redireccionar a /admin
      window.location.href = '/admin'
    }, 1500)
    
  } catch (error) {
    alertType.value = 'error'
    alertMessage.value = 'Credenciales incorrectas. Por favor, intenta nuevamente.'
    showAlert.value = true
  } finally {
    isLoading.value = false
  }
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
  -webkit-text-fill-color: transparent;
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
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.1);
  }
}

@keyframes pulseSlowDelayed {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.35;
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