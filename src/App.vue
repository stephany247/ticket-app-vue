<template>
  <div class="min-h-screen flex flex-col">
    <Navbar />
    <main class="grow">
      <Toast />
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue'
import Navbar from './components/Navbar.vue';
import Toast from './components/Toast.vue'
import { RouterView } from 'vue-router'
</script>
