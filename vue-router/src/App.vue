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
body {
  background-color: #f9f9f9; /* Fondo general claro */
  color: #333;               /* Texto legible */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}

/* Asegura que todos los contenedores tengan fondo y opacidad normal */
div, section, main {
  background-color: #ffffff; /* Fondo blanco por defecto */
  opacity: 1 !important;
  color: #333;
}
</style>
