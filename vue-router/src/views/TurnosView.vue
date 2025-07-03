<template>
  <div>
    <h1>Gestión de Turnos</h1>
    <p>Esta es la vista para usuarios comunes que gestionan sus turnos.</p>

    <div v-if="turnos.length === 0">
      <p>No hay turnos cargados aún.</p>
    </div>

    <ul v-else>
      <li v-for="turno in turnos" :key="turno.id">
        <strong>Fecha:</strong> {{ turno.fecha }} |
        <strong>Hora:</strong> {{ turno.hora }} |
        <strong>Cliente:</strong> {{ turno.nombreCliente }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const turnos = ref([]);

// Cambiá esta URL por la de tu MockAPI
const apiUrl = 'https://6861b32096f0cc4e34b743f2.mockapi.io/api/v1/turnos';

const obtenerTurnos = async () => {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
    turnos.value = await res.json();
  } catch (error) {
    console.error('Error al obtener turnos:', error);
  }
};

// Llamamos a la API cuando el componente se monta
onMounted(() => {
  obtenerTurnos();
});
</script>