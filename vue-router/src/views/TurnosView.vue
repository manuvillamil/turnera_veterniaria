<template>
  <div class="turnos-view">
    <!-- <h1>Gestión de Turnos</h1>
    <p>Esta es la vista para usuarios comunes que gestionan sus turnos.</p> -->

    <div class="list-container">
      <h2>Listado de Turnos</h2>
      <p v-if="loading">Cargando turnos...</p>
      <p v-else-if="turnos.length === 0">No hay turnos registrados.</p>
      <table v-else class="turnos-table">
        <thead>
          <tr>
            <th>Mascota</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Motivo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="turno in turnos" :key="turno.id">
            <td>{{ turno.mascota }}</td>
            <td>{{ turno.fecha }}</td>
            <td>{{ turno.hora }}</td>
            <td>{{ turno.motivo }}</td>
            <td>
              <button @click="eliminarTurno(turno.id)" class="btn-eliminar">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <ul v-else>
      <li v-for="turno in turnos" :key="turno.id">
        <strong>Fecha:</strong> {{ turno.fecha }} |
        <strong>Hora:</strong> {{ turno.hora }} |
        <strong>Mascota:</strong> {{ turno.mascota }} |
        <strong>Motivo:</strong> {{ turno.motivo }} |

      </li>
    </ul> -->
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

const eliminarTurno = async (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar este turno?')) {
    try {
      const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Error al eliminar');
      await obtenerTurnos();
    } catch (error) {
      console.error(error);
    }
  }
};
</script>

<style scoped>
.turnos-view { max-width: 900px; margin: auto; }
hr { margin: 2rem 0; border: 0; border-top: 1px solid #ddd; }
.form-container { background-color: #fff; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; margin-bottom: 0.5rem; font-weight: bold; }
.form-group input { width: 100%; padding: 0.75rem; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
button { padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; color: white; background-color: #2ecc71; margin-right: 0.5rem; }
button:hover { opacity: 0.9; }
.btn-editar { background-color: #3498db; }
.btn-eliminar { background-color: #e74c3c; }
.btn-cancelar { background-color: #95a5a6; }
.list-container { margin-top: 2rem; }
.turnos-table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
.turnos-table th, .turnos-table td { border: 1px solid #ddd; padding: 0.75rem; text-align: left; }
.turnos-table th { background-color: #f2f2f2; font-weight: bold; }
.informes-container { margin-top: 2rem; background-color: #ecf0f1; padding: 1.5rem; border-radius: 8px; }




.turnos-view {
  color: #333; /* Color de texto oscuro */
  background-color: #f9f9f9; /* Fondo claro */
}

.form-container,
.list-container,
.informes-container {
  background-color: #ffffff; /* Fondo blanco */
  opacity: 1 !important; /* Evita cualquier opacidad no deseada */
  color: #333; /* Texto más oscuro y legible */
}

h1, h2, label, p, th, td {
  color: #333; /* Asegura buen contraste */
}

</style>