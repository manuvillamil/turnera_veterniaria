<template>
  <div class="home-container">
    <h1>¡Bienvenido a TurnoVet!</h1>
    <p>Tu sistema de gestión de turnos veterinarios.</p>
    <div v-if="userRole === 'cliente'">
      <p>Has ingresado como Cliente.</p>
      <router-link to="/turnos" class="action-button">Ver Mis Turnos</router-link>
    </div>
    <div v-if="userRole === 'admin'">
      <p>Has ingresado como Administrador.</p>
      <router-link to="/admin" class="action-button">Ir al Panel de Administración</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const userRole = ref(localStorage.getItem('rol'));
</script>

<style scoped>
.home-container {
  text-align: center;
  margin-top: 50px;
  background-color: #fff;
  padding: 3rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.action-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
}
</style>