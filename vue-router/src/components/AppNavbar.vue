<template>
  <nav class="navbar" v-if="isLoggedIn">
    <div class="navbar-brand">
      <router-link to="/home">TurnoVet</router-link>
    </div>
    <div class="navbar-links">
      <router-link to="/home">Inicio</router-link>
      <router-link v-if="userRole === 'cliente'" to="/turnos">Mis Turnos</router-link>
      <router-link v-if="userRole === 'admin'" to="/admin">Panel Admin</router-link>
    </div>
    <div class="navbar-user">
      <button @click="handleLogout">Cerrar Sesión</button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoggedIn = computed(() => !!localStorage.getItem('rol'));
const userRole = ref(localStorage.getItem('rol'));

const handleLogout = () => {
  localStorage.removeItem('rol');
  router.push('/login');
  window.location.reload();
};
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #34495e;
  color: white;
}
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}
.navbar-links {
  margin: 0 auto;
  display: flex;
  gap: 1.5rem;
}
.navbar a {
  color: white;
  text-decoration: none;
}
.navbar a.router-link-exact-active {
  color: #42b983;
  border-bottom: 2px solid #42b983;
}
.navbar-user button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}
</style>