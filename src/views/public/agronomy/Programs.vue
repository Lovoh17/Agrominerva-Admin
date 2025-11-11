<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <div class="bg-tertiary-600 text-white py-20 border-b-4 border-accent-500">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl">
          <div class="flex items-center gap-4 mb-6">
            <img src="../../assets/images/AGRO-MINERVA-VERTICAL-SIN-FONDO.png" alt="Logo" class="h-20 w-20" />
            <div>
              <h1 class="text-4xl md:text-5xl font-bold mb-2">
                Ingeniería Agronómica
              </h1>
              <p class="text-xl text-primary-100">
                Plan de Estudio 2021
              </p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 bg-tertiary-500 p-6 border-2 border-white">
            <div>
              <p class="text-sm text-primary-200">Total Asignaturas</p>
              <p class="text-3xl font-bold">50</p>
            </div>
            <div>
              <p class="text-sm text-primary-200">Unidades Valorativas</p>
              <p class="text-3xl font-bold">192</p>
            </div>
            <div>
              <p class="text-sm text-primary-200">Duración</p>
              <p class="text-3xl font-bold">5 Años</p>
            </div>
            <div>
              <p class="text-sm text-primary-200">Modalidad</p>
              <p class="text-3xl font-bold">Presencial</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filtros por Ciclo -->
    <div class="container mx-auto px-4 py-8">
      <div class="bg-gray-50 border-2 border-gray-200 p-6 mb-8">
        <div class="flex items-center gap-4 mb-4">
          <i class="pi pi-filter text-accent-600 text-xl"></i>
          <h2 class="text-xl font-bold text-gray-800">Filtrar por Ciclo</h2>
        </div>
        <div class="flex flex-wrap gap-3">
          <Button 
            label="Todos los Ciclos"
            :severity="selectedCycle === null ? 'success' : 'secondary'"
            :outlined="selectedCycle !== null"
            @click="selectedCycle = null"
            class="filter-button"
          />
          <Button 
            v-for="cycle in cycles" 
            :key="cycle"
            :label="`Ciclo ${cycle}`"
            :severity="selectedCycle === cycle ? 'success' : 'secondary'"
            :outlined="selectedCycle !== cycle"
            @click="selectedCycle = cycle"
            class="filter-button"
          />
        </div>
      </div>

      <!-- Grid de Materias -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="subject in filteredSubjects" 
          :key="subject.id"
          class="bg-white border-2 border-gray-200 hover:border-accent-500 transition-all duration-300 overflow-hidden group cursor-pointer"
          @click="openSubjectDetail(subject)"
        >
          <!-- Header con número de orden y ciclo -->
          <div class="bg-tertiary-600 text-white p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-accent-500 flex items-center justify-center font-bold text-lg">
                {{ subject.order }}
              </div>
              <div>
                <p class="text-xs text-primary-200">Ciclo {{ subject.cycle }}</p>
                <p class="font-bold">{{ subject.code }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold">{{ subject.credits }}</p>
              <p class="text-xs text-primary-200">U.V.</p>
            </div>
          </div>

          <!-- Contenido -->
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-800 mb-3 min-h-[3rem] line-clamp-2">
              {{ subject.name }}
            </h3>

            <!-- Prerequisitos -->
            <div v-if="subject.prerequisites.length > 0" class="mb-3">
              <p class="text-xs font-semibold text-gray-600 mb-2">Prerrequisitos:</p>
              <div class="flex flex-wrap gap-1">
                <span 
                  v-for="prereq in subject.prerequisites" 
                  :key="prereq"
                  class="px-2 py-1 bg-gray-100 text-gray-700 text-xs border border-gray-300"
                >
                  {{ prereq }}
                </span>
              </div>
            </div>
            <div v-else class="mb-3">
              <span class="px-2 py-1 bg-accent-100 text-accent-700 text-xs font-medium border border-accent-300">
                Sin prerrequisitos
              </span>
            </div>

            <!-- Categoria -->
            <div class="pt-3 border-t-2 border-gray-200">
              <span class="px-3 py-1 bg-tertiary-100 text-tertiary-700 text-xs font-semibold border border-tertiary-300">
                {{ subject.category }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumen por Ciclo -->
      <div class="mt-12 bg-gray-50 border-2 border-gray-200 p-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Resumen por Ciclo</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div 
            v-for="cycle in cycles" 
            :key="cycle"
            class="bg-white border-2 border-gray-200 p-4 hover:border-accent-500 transition-colors cursor-pointer"
            @click="selectedCycle = cycle"
          >
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-bold text-gray-800">Ciclo {{ cycle }}</h3>
              <i class="pi pi-book text-accent-600 text-xl"></i>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Materias:</span>
                <span class="font-bold text-gray-800">{{ getCycleStats(cycle).count }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Total U.V.:</span>
                <span class="font-bold text-accent-600">{{ getCycleStats(cycle).credits }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Leyenda -->
      <div class="mt-8 bg-tertiary-50 border-2 border-tertiary-200 p-6">
        <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          <i class="pi pi-info-circle text-accent-600"></i>
          Información Importante
        </h3>
        <div class="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <p class="font-semibold mb-2">Requisitos de Graduación:</p>
            <ul class="space-y-1 list-disc list-inside">
              <li>Completar 192 Unidades Valorativas</li>
              <li>Aprobar todas las materias del plan</li>
              <li>Nota mínima de aprobación: 6.0</li>
              <li>500 horas de Servicio Social</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold mb-2">Categorías de Materias:</p>
            <ul class="space-y-1 list-disc list-inside">
              <li><strong>Bachillerato:</strong> Formación básica</li>
              <li><strong>Básicas:</strong> Ciencias fundamentales</li>
              <li><strong>Específicas:</strong> Especialización agrícola</li>
              <li><strong>Electivas:</strong> Áreas de profundización</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Detalle Materia -->
    <Dialog v-model:visible="showDetail" modal :style="{ width: '50rem' }" :breakpoints="{ '960px': '75vw', '640px': '90vw' }">
      <template #header>
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-accent-500 text-white flex items-center justify-center font-bold text-xl">
            {{ selectedSubject?.order }}
          </div>
          <div>
            <h3 class="text-2xl font-bold text-gray-800">{{ selectedSubject?.name }}</h3>
            <p class="text-sm text-gray-600">{{ selectedSubject?.code }} - Ciclo {{ selectedSubject?.cycle }}</p>
          </div>
        </div>
      </template>

      <div v-if="selectedSubject" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-gray-50 p-4 border-2 border-gray-200">
            <p class="text-sm text-gray-600 mb-1">Unidades Valorativas</p>
            <p class="text-3xl font-bold text-accent-600">{{ selectedSubject.credits }}</p>
          </div>
          <div class="bg-gray-50 p-4 border-2 border-gray-200">
            <p class="text-sm text-gray-600 mb-1">Categoría</p>
            <p class="text-lg font-bold text-gray-800">{{ selectedSubject.category }}</p>
          </div>
        </div>

        <div v-if="selectedSubject.prerequisites.length > 0" class="border-2 border-gray-200 p-4">
          <p class="font-semibold text-gray-800 mb-3">Prerrequisitos:</p>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="prereq in selectedSubject.prerequisites" 
              :key="prereq"
              class="px-3 py-2 bg-gray-100 text-gray-700 border border-gray-300 font-medium"
            >
              {{ prereq }}
            </span>
          </div>
        </div>

        <div class="border-2 border-gray-200 p-4">
          <p class="font-semibold text-gray-800 mb-2">Descripción:</p>
          <p class="text-gray-700 leading-relaxed">
            Esta materia forma parte del {{ selectedSubject.cycle }}° ciclo de la carrera de Ingeniería Agronómica.
            {{ selectedSubject.prerequisites.length > 0 
              ? 'Requiere haber aprobado las materias prerrequisito antes de poder cursarla.' 
              : 'No tiene prerrequisitos, puede cursarse desde el inicio.'
            }}
          </p>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// Estado
const selectedCycle = ref(null)
const showDetail = ref(false)
const selectedSubject = ref(null)
const cycles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// Datos de las materias según la imagen
const subjects = ref([
  // CICLO 1
  { id: 1, order: 1, code: 'MAT113', name: 'Matemática I', cycle: 1, credits: 4, category: 'Bachillerato', prerequisites: [] },
  { id: 2, order: 2, code: 'QUG113', name: 'Química General', cycle: 1, credits: 4, category: 'Bachillerato', prerequisites: [] },
  { id: 3, order: 3, code: 'BIG113', name: 'Biología General', cycle: 1, credits: 4, category: 'Bachillerato', prerequisites: [] },
  { id: 4, order: 4, code: 'MTI113', name: 'Métodos y Técnicas de Investigación', cycle: 1, credits: 4, category: 'Bachillerato', prerequisites: [] },
  { id: 5, order: 5, code: 'SOR113', name: 'Sociología Rural', cycle: 1, credits: 4, category: 'Bachillerato', prerequisites: [] },

  // CICLO 2
  { id: 6, order: 6, code: 'MAT213', name: 'Matemática II', cycle: 2, credits: 4, category: 'MAT113', prerequisites: ['MAT113'] },
  { id: 7, order: 7, code: 'FIG113', name: 'Física General', cycle: 2, credits: 4, category: 'MAT113', prerequisites: ['MAT113'] },
  { id: 8, order: 8, code: 'QAG113', name: 'Química Agrícola', cycle: 2, credits: 4, category: 'QUG113', prerequisites: ['QUG113'] },
  { id: 9, order: 9, code: 'BOA113', name: 'Botánica Agrícola', cycle: 2, credits: 4, category: 'BIG113', prerequisites: ['BIG113'] },
  { id: 10, order: 10, code: 'MIC113', name: 'Microbiología Agrícola', cycle: 2, credits: 4, category: 'BIG113', prerequisites: ['BIG113'] },

  // CICLO 3
  { id: 11, order: 11, code: 'EST113', name: 'Estadística', cycle: 3, credits: 4, category: 'Básicas', prerequisites: ['MTI113', 'MAT213'] },
  { id: 12, order: 12, code: 'ENT113', name: 'Entomología Agrícola', cycle: 3, credits: 4, category: 'Específicas', prerequisites: ['BOA113'] },
  { id: 13, order: 13, code: 'AFA113', name: 'Anatomía y Fisiología Animal', cycle: 3, credits: 4, category: 'Específicas', prerequisites: ['BIG113'] },
  { id: 14, order: 14, code: 'BIQ113', name: 'Bioquímica', cycle: 3, credits: 4, category: 'Específicas', prerequisites: ['QAG113'] },
  { id: 15, order: 15, code: 'TOP113', name: 'Topografía', cycle: 3, credits: 4, category: 'Específicas', prerequisites: ['FIG113', 'MAT213'] },

  // CICLO 4
  { id: 16, order: 16, code: 'PAR113', name: 'Parasitología', cycle: 4, credits: 4, category: 'Específicas', prerequisites: ['MIC113', 'AFA113'] },
  { id: 17, order: 17, code: 'EDA113', name: 'Edafología', cycle: 4, credits: 4, category: 'Específicas', prerequisites: ['BIQ113', 'FIG113'] },
  { id: 18, order: 18, code: 'FIV113', name: 'Fisiología Vegetal', cycle: 4, credits: 4, category: 'Específicas', prerequisites: ['BOA113', 'BIQ113'] },
  { id: 19, order: 19, code: 'AGC113', name: 'Agroclimatología', cycle: 4, credits: 4, category: 'Específicas', prerequisites: ['EST113', 'FIG113'] },
  { id: 20, order: 20, code: 'ECA113', name: 'Economía Agrícola', cycle: 4, credits: 4, category: 'Específicas', prerequisites: ['SOR113', 'EST113'] },

  // CICLO 5
  { id: 21, order: 21, code: 'FES113', name: 'Fertilidad de Suelos', cycle: 5, credits: 4, category: 'Específicas', prerequisites: ['EDA113'] },
  { id: 22, order: 22, code: 'NUA113', name: 'Nutrición Animal', cycle: 5, credits: 4, category: 'Específicas', prerequisites: ['BIQ113', 'AFA113'] },
  { id: 23, order: 23, code: 'FIT113', name: 'Fitopatología', cycle: 5, credits: 4, category: 'Específicas', prerequisites: ['MIC113', 'FIV113'] },
  { id: 24, order: 24, code: 'GEN114', name: 'Genética', cycle: 5, credits: 4, category: 'Específicas', prerequisites: ['EST113', 'FIV113'] },
  { id: 25, order: 25, code: 'HID113', name: 'Hidráulica', cycle: 5, credits: 4, category: 'Específicas', prerequisites: ['MAT213', 'FIG113'] },

  // CICLO 6
  { id: 26, order: 26, code: 'ADA113', name: 'Administración Agropecuaria', cycle: 6, credits: 4, category: 'Específicas', prerequisites: ['ECA113'] },
  { id: 27, order: 27, code: 'ELECTIVA1', name: 'ELECTIVA 1', cycle: 6, credits: 4, category: 'Electivas', prerequisites: [] },
  { id: 28, order: 28, code: 'MIP113', name: 'Manejo Integrado de Plagas', cycle: 6, credits: 4, category: 'Específicas', prerequisites: ['ENT113', 'FIT113'] },
  { id: 29, order: 29, code: 'MAG113', name: 'Maquinaria Agrícola', cycle: 6, credits: 4, category: 'Específicas', prerequisites: ['EDA113'] },
  { id: 30, order: 30, code: 'MAS113', name: 'Manejo de Suelos', cycle: 6, credits: 4, category: 'Específicas', prerequisites: ['FES113', 'TOP113'] },

  // CICLO 7
  { id: 31, order: 31, code: 'GAP113', name: 'Ganado Porcino', cycle: 7, credits: 4, category: 'Específicas', prerequisites: ['NUA113', 'GEN113'] },
  { id: 32, order: 32, code: 'ELECTIVA2', name: 'ELECTIVA 2', cycle: 7, credits: 4, category: 'Electivas', prerequisites: [] },
  { id: 33, order: 33, code: 'AVI113', name: 'Avicultura', cycle: 7, credits: 4, category: 'Específicas', prerequisites: ['PAR113', 'NUA113'] },
  { id: 34, order: 34, code: 'FRU113', name: 'Fruticultura', cycle: 7, credits: 4, category: 'Específicas', prerequisites: ['FIV113', 'MIP113'] },
  { id: 35, order: 35, code: 'RVD113', name: 'Riegos y Drenaje', cycle: 7, credits: 4, category: 'Específicas', prerequisites: ['HID113', 'AGC113'] },

  // CICLO 8
  { id: 36, order: 36, code: 'MEP113', name: 'Mejoramiento de Plantas', cycle: 8, credits: 4, category: 'Específicas', prerequisites: ['GEN113', 'FRU113'] },
  { id: 37, order: 37, code: 'ELECTIVA3', name: 'ELECTIVA 3', cycle: 8, credits: 4, category: 'Electivas', prerequisites: [] },
  { id: 38, order: 38, code: 'CUE113', name: 'Cultivos Extensivos', cycle: 8, credits: 4, category: 'Específicas', prerequisites: ['RVD113', 'MAG113'] },
  { id: 39, order: 39, code: 'PHO113', name: 'Producción de Hortalizas', cycle: 8, credits: 4, category: 'Específicas', prerequisites: ['FES113', 'FIV113'] },
  { id: 40, order: 40, code: 'DEX113', name: 'Diseños Experimentales', cycle: 8, credits: 4, category: 'Específicas', prerequisites: ['EST113', 'FRU113'] },

  // CICLO 9
  { id: 41, order: 41, code: 'MCH113', name: 'Manejo y Gestión de Cuencas Hidrográficas', cycle: 9, credits: 4, category: 'Específicas', prerequisites: ['MAS113', 'AGC113'] },
  { id: 42, order: 42, code: 'ELECTIVA4', name: 'ELECTIVA 4', cycle: 9, credits: 4, category: 'Electivas', prerequisites: [] },
  { id: 43, order: 43, code: 'GAV113', name: 'Ganado Vacuno', cycle: 9, credits: 4, category: 'Específicas', prerequisites: ['GAP113', 'ADA113'] },
  { id: 44, order: 44, code: 'ASP113', name: 'Sistemas Agrosilvopastoriles', cycle: 9, credits: 4, category: 'Específicas', prerequisites: ['CUE113', 'NUA113'] },
  { id: 45, order: 45, code: 'FEP113', name: 'Formulación y Evaluación de Proyectos', cycle: 9, credits: 4, category: 'Específicas', prerequisites: ['ADA113', 'PHO113'] },

  // CICLO 10
  { id: 46, order: 46, code: 'INA113', name: 'Instalaciones Agropecuarias', cycle: 10, credits: 4, category: 'Específicas', prerequisites: ['AVI113', 'GAV113'] },
  { id: 47, order: 47, code: 'GEA113', name: 'Gestión Ambiental', cycle: 10, credits: 4, category: 'Específicas', prerequisites: ['MCH113'] },
  { id: 48, order: 48, code: 'CGD113', name: 'Comunicación y Gestión del Desarrollo Local', cycle: 10, credits: 4, category: 'Específicas', prerequisites: ['GAP113', 'ADA113', 'FEP113'] },
  { id: 49, order: 49, code: 'SPG113', name: 'Seminario de Ingreso de Egreso', cycle: 10, credits: 4, category: 'Específicas', prerequisites: ['180 U.V.'] },
  { id: 50, order: 50, code: 'AGR113', name: 'Agronegocios', cycle: 10, credits: 4, category: 'Específicas', prerequisites: ['FEP113'] }
])

// Materias filtradas
const filteredSubjects = computed(() => {
  if (selectedCycle.value === null) {
    return subjects.value
  }
  return subjects.value.filter(s => s.cycle === selectedCycle.value)
})

// Estadísticas por ciclo
const getCycleStats = (cycle) => {
  const cycleSubjects = subjects.value.filter(s => s.cycle === cycle)
  return {
    count: cycleSubjects.length,
    credits: cycleSubjects.reduce((sum, s) => sum + s.credits, 0)
  }
}

// Métodos
const openSubjectDetail = (subject) => {
  selectedSubject.value = subject
  showDetail.value = true
}
</script>

<style scoped>
.filter-button {
  transition: all 0.3s ease;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

:deep(.p-dialog) {
  border: 2px solid #e5e7eb;
}

:deep(.p-dialog .p-dialog-header) {
  background: #f9fafb;
  border-bottom: 2px solid #e5e7eb;
}

:deep(.p-button) {
  font-weight: 600;
  transition: all 0.3s ease;
}
</style>