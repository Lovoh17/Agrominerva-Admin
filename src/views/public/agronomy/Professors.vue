<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-white py-20 border-b-2 border-gray-200">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl">
          <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Nuestro Equipo Docente
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">
            Profesionales altamente calificados con amplia experiencia en agronomía y educación, 
            comprometidos con la excelencia académica de la Universidad de El Salvador.
          </p>
        </div>
      </div>
    </div>

    <!-- Filtros -->
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white border border-gray-200 p-6 mb-8 rounded-lg shadow-sm">
        <div class="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-gray-700 mb-3">Filtrar por especialidad:</p>
            <div class="flex flex-wrap gap-2">
              <button
                @click="selectedSpecialty = null"
                :class="[
                  'px-4 py-2 text-sm font-semibold rounded transition-all',
                  selectedSpecialty === null
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]"
              >
                Todos
              </button>
              <button
                v-for="specialty in specialties"
                :key="specialty"
                @click="selectedSpecialty = specialty"
                :class="[
                  'px-4 py-2 text-sm font-semibold rounded transition-all',
                  selectedSpecialty === specialty
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                ]"
              >
                {{ specialty }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Grid de Profesores -->
      <div class="space-y-8">
        <div
          v-for="(professor, index) in filteredProfessors"
          :key="professor.id"
          :class="[
            'bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col',
            index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
          ]"
        >
          <!-- Foto -->
          <div class="md:w-2/5 relative overflow-hidden bg-gray-200 h-64 md:h-auto">
            <img
              :src="professor.photo"
              :alt="professor.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- Card Content -->
          <div class="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
            <!-- Nombre -->
            <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
              {{ professor.name }}
            </h2>

            <!-- Título -->
            <div class="mb-4">
              <div class="flex items-center gap-2 text-orange-500 mb-1">
                <i class="pi pi-graduation-cap text-base"></i>
                <span class="text-xs font-bold uppercase tracking-wider">TÍTULO</span>
              </div>
              <p class="text-lg font-semibold text-orange-500">
                {{ professor.title }}
              </p>
            </div>

            <!-- Experiencia -->
            <div class="mb-4">
              <div class="flex items-center gap-2 text-gray-700 mb-1">
                <i class="pi pi-briefcase text-base"></i>
                <span class="text-xs font-bold uppercase tracking-wider">EXPERIENCIA</span>
              </div>
              <p class="text-gray-800 leading-snug">
                {{ professor.experience }} años de experiencia en docencia e investigación. {{ professor.institution }}.
              </p>
            </div>

            <!-- Campo de Especialización -->
            <div class="mb-4">
              <div class="flex items-center gap-2 text-orange-500 mb-1">
                <i class="pi pi-bookmark text-base"></i>
                <span class="text-xs font-bold uppercase tracking-wider">CAMPO DE ESPECIALIZACIÓN</span>
              </div>
              <p class="text-gray-900 font-semibold">{{ professor.specialty }}</p>
            </div>

            <!-- Rol en el Departamento -->
            <div class="mb-5">
              <div class="flex items-center gap-2 text-gray-700 mb-1">
                <i class="pi pi-users text-base"></i>
                <span class="text-xs font-bold uppercase tracking-wider">ROL EN EL DEPARTAMENTO</span>
              </div>
              <p class="text-gray-900 font-semibold">{{ professor.role }}</p>
            </div>

            <!-- Indicadores de progreso -->
            <div class="flex gap-2 mb-4">
              <div class="progress-bar bg-orange-500"></div>
              <div class="progress-bar bg-yellow-400"></div>
              <div class="progress-bar-small bg-gray-900"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensaje si no hay resultados -->
      <div v-if="filteredProfessors.length === 0" class="text-center py-12">
        <i class="pi pi-search text-6xl text-gray-300 mb-4"></i>
        <p class="text-xl text-gray-500">No se encontraron profesores con esos criterios</p>
      </div>
    </div>

    <!-- Modal Detalle Profesor -->
    <div v-if="showDetail && selectedProfessor" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto" @click.self="showDetail = false">
      <div class="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <!-- Header -->
        <div class="sticky top-0 bg-white border-b border-gray-200 p-6 md:p-8 flex items-start justify-between z-10">
          <div class="flex items-start gap-4 flex-1">
            <img
              :src="selectedProfessor.photo"
              :alt="selectedProfessor.name"
              class="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover flex-shrink-0"
            />
            <div class="flex-1 min-w-0">
              <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{{ selectedProfessor.name }}</h3>
              <p class="text-orange-500 font-semibold text-base md:text-lg">{{ selectedProfessor.title }}</p>
            </div>
          </div>
          <button
            @click="showDetail = false"
            class="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none ml-4 flex-shrink-0"
          >
            ×
          </button>
        </div>

        <!-- Content -->
        <div class="p-6 md:p-8 space-y-8">
          <!-- Contacto e Información Básica -->
          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-gray-50 p-5 border border-gray-200 rounded-lg">
              <div class="flex items-center gap-2 text-gray-700 mb-3">
                <i class="pi pi-bookmark text-orange-500"></i>
                <span class="text-xs font-bold uppercase tracking-wider">ESPECIALIDAD</span>
              </div>
              <p class="text-sm font-semibold text-gray-900 leading-snug">{{ selectedProfessor.specialty }}</p>
            </div>
            <div class="bg-gray-50 p-5 border border-gray-200 rounded-lg">
              <div class="flex items-center gap-2 text-gray-700 mb-3">
                <i class="pi pi-envelope text-orange-500"></i>
                <span class="text-xs font-bold uppercase tracking-wider">EMAIL</span>
              </div>
              <p class="text-sm text-gray-900 break-words">{{ selectedProfessor.email }}</p>
            </div>
            <div class="bg-gray-50 p-5 border border-gray-200 rounded-lg">
              <div class="flex items-center gap-2 text-gray-700 mb-3">
                <i class="pi pi-phone text-orange-500"></i>
                <span class="text-xs font-bold uppercase tracking-wider">TELÉFONO</span>
              </div>
              <p class="text-sm text-gray-900">{{ selectedProfessor.phone }}</p>
            </div>
          </div>

          <!-- Biografía -->
          <div class="border border-gray-200 p-6 bg-white rounded-lg">
            <div class="flex items-center gap-2 text-orange-500 mb-4">
              <i class="pi pi-user text-lg"></i>
              <h4 class="text-xs font-bold uppercase tracking-wider">BIOGRAFÍA</h4>
            </div>
            <p class="text-gray-800 leading-relaxed">{{ selectedProfessor.fullBio }}</p>
          </div>

          <!-- Formación Académica -->
          <div class="border border-gray-200 p-6 bg-white rounded-lg">
            <div class="flex items-center gap-2 text-orange-500 mb-5">
              <i class="pi pi-graduation-cap text-lg"></i>
              <h4 class="text-xs font-bold uppercase tracking-wider">FORMACIÓN ACADÉMICA</h4>
            </div>
            <ul class="space-y-5">
              <li v-for="(edu, index) in selectedProfessor.education" :key="index" class="flex items-start gap-4">
                <div class="w-3 h-3 bg-orange-500 mt-1.5 flex-shrink-0 rounded-sm"></div>
                <div>
                  <p class="font-bold text-gray-900 text-lg mb-1">{{ edu.degree }}</p>
                  <p class="text-sm text-gray-600">{{ edu.institution }} • {{ edu.year }}</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Áreas de Investigación -->
          <div class="border border-gray-200 p-6 bg-white rounded-lg">
            <div class="flex items-center gap-2 text-orange-500 mb-5">
              <i class="pi pi-bookmark text-lg"></i>
              <h4 class="text-xs font-bold uppercase tracking-wider">ÁREAS DE INVESTIGACIÓN</h4>
            </div>
            <div class="flex flex-wrap gap-3">
              <span
                v-for="area in selectedProfessor.researchAreas"
                :key="area"
                class="px-4 py-2 bg-orange-50 text-orange-700 border border-orange-200 text-sm font-semibold rounded"
              >
                {{ area }}
              </span>
            </div>
          </div>

          <!-- Materias que imparte -->
          <div class="border border-gray-200 p-6 bg-white rounded-lg">
            <div class="flex items-center gap-2 text-orange-500 mb-5">
              <i class="pi pi-book text-lg"></i>
              <h4 class="text-xs font-bold uppercase tracking-wider">MATERIAS QUE IMPARTE</h4>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div
                v-for="course in selectedProfessor.courses"
                :key="course"
                class="px-4 py-3 bg-gray-50 border border-gray-200 rounded font-semibold text-gray-800"
              >
                {{ course }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedSpecialty = ref(null)
const showDetail = ref(false)
const selectedProfessor = ref(null)

const specialties = [
  'Producción de Cultivos',
  'Educación y Desarrollo Rural',
  'Economía y Finanzas Agrícolas'
]

const professors = ref([
  {
    id: 1,
    name: 'Marco Vinicio Calderón Castellanos',
    title: 'Ingeniero Agrónomo',
    specialty: 'Fitotecnista - Producción de Plantas Cultivadas',
    role: 'Jefe del Departamento de Ciencias Agronómicas',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop',
    email: 'marco.calderon@ues.edu.sv',
    phone: '+503 2511-2000',
    experience: 30,
    yearGraduation: 2000,
    institution: 'Universidad de El Salvador',
    startYear: 1995,
    fullBio: 'Ingeniero Agrónomo graduado en el año 2000 de la Universidad de El Salvador. Con más de 30 años de experiencia como docente universitario desde mayo de 1995. Ha trabajado en diversos proyectos en Chalatenango y en el Instituto Cultural Oxford. Su especialización es en fitotecnia, enfocándose en la producción de plantas cultivadas, con particular interés en la producción de hortalizas debido a su ciclo corto y resultados a corto plazo.',
    education: [
      { degree: 'Ingeniero Agrónomo Fitotecnista', institution: 'Universidad de El Salvador', year: 2000 }
    ],
    researchAreas: ['Producción de Hortalizas', 'Mejoramiento de Plantas', 'Cultivos Extensivos', 'Entomología Agrícola', 'Sistemas Agroforestales'],
    courses: [
      'Mejoramiento de Plantas',
      'Cultivos Extensivos',
      'Entomología Agrícola',
      'Sistemas Agroforestales'
    ]
  },
  {
    id: 2,
    name: 'Nery Saúl Guevara',
    title: 'Doctor en Educación',
    specialty: 'Comunicación y Gestión del Desarrollo Local',
    role: 'Docente de Agronomía',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop',
    email: 'nery.guevara@ues.edu.sv',
    phone: '+503 2511-2001',
    experience: 41,
    yearGraduation: 1984,
    institution: 'Universidad de El Salvador',
    doctorado: 2025,
    fullBio: 'Doctor en Educación (2025) e Ingeniero Agrónomo (1984) graduado de la Universidad de El Salvador. Con más de 40 años de experiencia, su trabajo se centra en el campo de la comunicación y gestión del desarrollo local, donde contribuye a definir el perfil del profesional agrónomo en el campo laboral. Su experiencia combina la formación técnica agronómica con la educación y el desarrollo social rural.',
    education: [
      { degree: 'Doctor en Educación', institution: 'Universidad de El Salvador', year: 2025 },
      { degree: 'Ingeniero Agrónomo', institution: 'Universidad de El Salvador', year: 1984 }
    ],
    researchAreas: ['Comunicación para el Desarrollo', 'Gestión del Desarrollo Local', 'Sociología Rural', 'Metodología de Investigación Social'],
    courses: [
      'Métodos y Técnicas de Investigación Social',
      'Sociología Rural',
      'Agroclimatología',
      'Comunicación y Gestión del Desarrollo Local'
    ]
  },
  {
    id: 3,
    name: 'Jaime Cristóbal Río Molina',
    title: 'Ingeniero Agrónomo',
    specialty: 'Economía Agrícola y Finanzas',
    role: 'Docente Tiempo Completo',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
    email: 'jaime.rio@ues.edu.sv',
    phone: '+503 2511-2002',
    experience: 18,
    yearGraduation: 2007,
    institution: 'Universidad de El Salvador - Facultad Multidisciplinaria Oriental',
    startYear: 2010,
    fullBio: 'Ingeniero Agrónomo graduado en 2007 de la Facultad Multidisciplinaria Oriental de la Universidad de El Salvador. Cuenta con experiencia profesional como Jefe de Crédito en Banco Momento Agropecuario, Agencia La Unión por 3 años. Desde 2010 se desempeña como docente tiempo completo, especializándose en las áreas de economía, finanzas y administración agropecuaria.',
    education: [
      { degree: 'Ingeniero Agrónomo', institution: 'Universidad de El Salvador - Facultad Multidisciplinaria Oriental', year: 2007 }
    ],
    researchAreas: ['Economía Agrícola', 'Finanzas Agropecuarias', 'Administración de Empresas Agropecuarias', 'Agronegocios'],
    courses: [
      'Administración Agropecuaria',
      'Formulación y Evaluación de Proyectos',
      'Agronegocios',
      'Economía Agrícola'
    ]
  }
])

const filteredProfessors = computed(() => {
  if (!selectedSpecialty.value) {
    return professors.value
  }
  return professors.value.filter(p =>
    p.specialty.toLowerCase().includes(selectedSpecialty.value.toLowerCase())
  )
})

const openProfessorDetail = (professor) => {
  selectedProfessor.value = professor
  showDetail.value = true
}
</script>

<style scoped>
.progress-bar {
  width: 72px;
  height: 4px;
  border-radius: 2px;
}

.progress-bar-small {
  width: 40px;
  height: 4px;
  border-radius: 2px;
}
</style>