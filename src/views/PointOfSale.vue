<template>
    <div class="min-h-screen bg-gray-50 p-6">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="text-3xl font-bold text-gray-900">Punto de Venta</h1>
            <p class="text-gray-600 mt-2">Sistema de ventas rápido y eficiente</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Columna Izquierda - Productos -->
            <div class="lg:col-span-2 space-y-6">
                <!-- Barra de Búsqueda -->
                <div class="bg-white rounded-md p-4 shadow-soft">
                    <div class="flex gap-3">
                        <div class="flex-1">
                            <input type="text" placeholder="Buscar productos..."
                                class="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                v-model="searchQuery">
                        </div>
                        <button
                            class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md transition-colors">
                            <i class="pi pi-search"></i>
                        </button>
                    </div>
                </div>

                <!-- Tabla de Productos -->
                <div class="bg-white rounded-md p-4 shadow-soft">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Productos Disponibles</h3>
                    <div class="max-h-[600px] overflow-y-auto">
                        <table class="w-full">
                            <thead class="sticky top-0 bg-white z-10">
                                <tr class="border-b border-gray-200">
                                    <th class="text-left py-3 px-4 text-gray-700 font-semibold">Producto</th>
                                    <th class="text-left py-3 px-4 text-gray-700 font-semibold">Precio</th>
                                    <th class="text-left py-3 px-4 text-gray-700 font-semibold">Stock</th>
                                    <th class="text-left py-3 px-4 text-gray-700 font-semibold">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="product in filteredProducts" :key="product.id"
                                    class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td class="py-4 px-4">
                                        <div class="flex items-center gap-4">
                                            <div
                                                class="w-24 h-24 bg-gray-100 rounded-md flex items-center justify-center flex-shrink-0">
                                                <i class="pi pi-image text-4xl text-gray-400"></i>
                                            </div>
                                            <span class="font-medium text-gray-900 text-lg">{{ product.name }}</span>
                                        </div>
                                    </td>
                                    <td class="py-4 px-4">
                                        <span class="text-xl font-bold text-primary-600">${{ product.price }}</span>
                                    </td>
                                    <td class="py-4 px-4">
                                        <span class="text-base text-gray-500">{{ product.stock }} unidades</span>
                                    </td>
                                    <td class="py-4 px-4">
                                        <button @click="addToCart(product)" :disabled="product.stock === 0" :class="[
                                            'px-6 py-3 rounded-md font-medium transition-colors text-base',
                                            product.stock === 0
                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                : 'bg-primary-500 hover:bg-primary-600 text-white'
                                        ]">
                                            <i class="pi pi-plus mr-2"></i>
                                            Agregar
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- Columna Derecha - Carrito -->
            <div class="space-y-6">
                <!-- Resumen del Carrito -->
                <div class="bg-white rounded-md p-6 shadow-soft sticky top-6">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Carrito de Venta</h3>

                    <!-- Items del Carrito -->
                    <div class="space-y-3 mb-4 max-h-96 overflow-y-auto">
                        <div v-for="item in cart" :key="item.id"
                            class="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div class="flex-1">
                                <h4 class="font-medium text-gray-900">{{ item.name }}</h4>
                                <div class="flex items-center gap-2 mt-1">
                                    <button @click="updateQuantity(item.id, item.quantity - 1)"
                                        class="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300"
                                        :disabled="item.quantity <= 1">
                                        <i class="pi pi-minus"></i>
                                    </button>
                                    <span class="text-base font-medium">{{ item.quantity }}</span>
                                    <button @click="updateQuantity(item.id, item.quantity + 1)"
                                        class="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center hover:bg-gray-300"
                                        :disabled="item.quantity >= item.stock">
                                        <i class="pi pi-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-semibold text-primary-600 text-lg">${{ (item.price * item.quantity).toFixed(2) }}
                                </p>
                                <button @click="removeFromCart(item.id)" class="text-red-500 hover:text-red-700 mt-2">
                                    <i class="pi pi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Total -->
                    <div class="border-t pt-4 space-y-2">
                        <div class="flex justify-between text-gray-600">
                            <span>Subtotal:</span>
                            <span>${{ subtotal.toFixed(2) }}</span>
                        </div>
                        <div class="flex justify-between text-xl font-bold text-gray-900">
                            <span>Total:</span>
                            <span>${{ total.toFixed(2) }}</span>
                        </div>
                    </div>

                    <!-- Acciones -->
                    <div class="mt-6 space-y-3">
                        <button @click="processSale" :disabled="cart.length === 0" :class="[
                            'w-full py-4 rounded-md font-semibold transition-colors text-lg',
                            cart.length === 0
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-primary-500 hover:bg-primary-600 text-white'
                        ]">
                            <i class="pi pi-credit-card mr-2"></i>
                            Procesar Venta
                        </button>
                        <button @click="clearCart"
                            class="w-full py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-base">
                            Limpiar Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Estado reactivo
const searchQuery = ref('')
const cart = ref([])

// Datos de ejemplo
const products = ref([
{
id: 1,
name: 'Semilla de Maíz Híbrido',
price: 25.50,
stock: 100,
},
{
id: 2,
name: 'Fertilizante NPK 15-15-15',
price: 45.00,
stock: 50,
},
{
id: 3,
name: 'Tijeras de Podar Profesionales',
price: 15.75,
stock: 30,
},
{
id: 4,
name: 'Insecticida Orgánico Neem',
price: 32.25,
stock: 25,
},
{
id: 5,
name: 'Sustrato Premium para Plantas',
price: 18.90,
stock: 80,
},
{
id: 6,
name: 'Regadera Metálica 2 Litros',
price: 12.50,
stock: 15,
},
{
id: 7,
name: 'Herbicida Selectivo',
price: 28.75,
stock: 40,
},
{
id: 8,
name: 'Guantes de Jardinería',
price: 8.99,
stock: 60,
},
{
id: 9,
name: 'Pala de Jardín',
price: 22.00,
stock: 20,
},
{
id: 10,
name: 'Rastrillo Metálico',
price: 18.50,
stock: 35,
},
{
id: 11,
name: 'Manguera 20m',
price: 35.00,
stock: 10,
},
{
id: 12,
name: 'Pulverizador 2L',
price: 28.00,
stock: 18,
}
])

// Computed
const filteredProducts = computed(() => {
let filtered = products.value

if (searchQuery.value) {
filtered = filtered.filter(product =>
product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
)
}

return filtered
})

const subtotal = computed(() => {
return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const total = computed(() => {
return subtotal.value
})

// Métodos
const addToCart = (product) => {
const existingItem = cart.value.find(item => item.id === product.id)

if (existingItem) {
if (existingItem.quantity < product.stock) {
existingItem.quantity++
}
} else {
cart.value.push({
...product,
quantity: 1
})
}
}

const updateQuantity = (productId, newQuantity) => {
const item = cart.value.find(item => item.id === productId)
const product = products.value.find(p => p.id === productId)

if (item && product) {
if (newQuantity <= 0) {
removeFromCart(productId)
} else if (newQuantity <= product.stock) {
item.quantity = newQuantity
}
}
}

const removeFromCart = (productId) => {
cart.value = cart.value.filter(item => item.id !== productId)
}

const clearCart = () => {
cart.value = []
}

const processSale = () => {
if (cart.value.length === 0) return

// Simular procesamiento de venta
alert(`Venta procesada exitosamente!\nTotal: $${total.value.toFixed(2)}`)

// Actualizar stock
cart.value.forEach(cartItem => {
const product = products.value.find(p => p.id === cartItem.id)
if (product) {
product.stock -= cartItem.quantity
}
})

clearCart()
}

onMounted(() => {
console.log('Punto de Venta cargado')
})
</script>