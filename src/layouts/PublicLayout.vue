<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <PublicNavbar />

    <main class="flex-1">
      <router-view />
    </main>

    <PublicFooter />
  </div>
</template>

<script setup>
import PublicNavbar from '@/components/public/Navbar.vue'
import PublicFooter from '@/components/public/Footer.vue'
</script>