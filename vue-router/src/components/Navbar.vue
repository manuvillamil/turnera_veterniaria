<!-- src/components/Navbar.vue -->
<template>
  <nav class="navbar" v-if="isLoggedIn">
    <div class="navbar-brand">
      <router-link to="/home">TurnoVet</router-link>
    </div>
    <div class="navbar-links">
      <!-- Enlace visible para todos los usuarios logueados -->
      <router-link to="/home">Inicio</router-link>

      <!-- Enlace solo para clientes -->
      <router-link v-if="userRole === 'cliente'" to="/turnos">Mis Turnos</router-link>
      
      <!-- Enlace solo para administradores -->
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

// Comprobamos si el usuario está logueado mirando si hay un 'rol' en localStorage.
const isLoggedIn = computed(() => !!localStorage.getItem('rol'));

// Obtenemos el rol del usuario para mostrar los enlaces correctos.
const userRole = ref(localStorage.getItem('rol'));

// Función para cerrar sesión
const handleLogout = () => {
  // Borramos el rol del almacenamiento
  localStorage.removeItem('rol');
  // Redirigimos al usuario a la página de login
  router.push('/login');
  // Forzamos un refresco de la página para que el Navbar se actualice (solución simple y efectiva)
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
  color: #42b983; /* Verde de Vue */
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