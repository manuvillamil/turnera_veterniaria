<template>
  <div class="login-container">
    <h1>Iniciar Sesión</h1>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="usuario">Usuario:</label>
        <input v-model="usuario" id="usuario" required />
      </div>
      <div>
        <label for="clave">Contraseña:</label>
        <input v-model="clave" id="clave" type="password" required />
      </div>
      <button type="submit">Ingresar</button>
    </form>
    <p v-if="error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const usuario = ref('');
const clave = ref('');
const error = ref('');
const router = useRouter();

const usuarios = [
  { nombre: 'admin', clave: 'admin123', rol: 'admin' },
  { nombre: 'cliente', clave: 'cliente123', rol: 'cliente' }
];

function handleLogin() {
  const user = usuarios.find(u => u.nombre === usuario.value && u.clave === clave.value);
  if (user) {
    localStorage.setItem('rol', user.rol);
    router.push('/home');
  } else {
    error.value = 'Usuario o contraseña incorrectos';
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}
div {
  margin-bottom: 1rem;
}
button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  background-color: #42b983;
  color: white;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
}
</style>