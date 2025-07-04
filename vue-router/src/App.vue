<template>
  <Navbar />
  <main class="main-content">
    <RouterView />
  </main>
  <Footer />
</template>

<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/AppNavbar.vue';
import Footer from './components/AppFooter.vue';
</script>

<style>
/* App.vue no necesita redefinir body si ya lo tenés en un CSS global */
</style>