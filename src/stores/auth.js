// stores/auth.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({ role: 'public' }) // Por defecto usuario público

  const setUser = (userData) => {
    user.value = userData
  }

  const logout = () => {
    user.value = { role: 'public' }
  }

  return {
    user,
    setUser,
    logout
  }
})