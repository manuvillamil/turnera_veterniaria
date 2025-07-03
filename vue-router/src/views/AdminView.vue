<template>
  <div class="admin-view">
    <h1>Panel de Administración</h1>

    <!-- SECCIÓN PARA CREAR Y EDITAR TURNOS -->
    <div class="form-container">
      <h2>{{ modoEdicion ? 'Editar Turno' : 'Crear Nuevo Turno' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="mascota">Nombre de la Mascota:</label>
          <input type="text" v-model="turnoActual.mascota" id="mascota" required>
        </div>
        <div class="form-group">
          <label for="fecha">Fecha:</label>
          <input type="date" v-model="turnoActual.fecha" id="fecha" required>
        </div>
        <div class="form-group">
          <label for="hora">Hora:</label>
          <input type="time" v-model="turnoActual.hora" id="hora" required>
        </div>
        <div class="form-group">
          <label for="motivo">Motivo de la consulta:</label>
          <input type="text" v-model="turnoActual.motivo" id="motivo" required>
        </div>
        
        <button type="submit">{{ modoEdicion ? 'Guardar Cambios' : 'Crear Turno' }}</button>
        <button type="button" v-if="modoEdicion" @click="cancelarEdicion" class="btn-cancelar">Cancelar</button>
      </form>
    </div>

    <hr>

    <!-- SECCIÓN PARA MOSTRAR LA LISTA DE TURNOS -->
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
              <button @click="iniciarEdicion(turno)" class="btn-editar">Editar</button>
              <button @click="eliminarTurno(turno.id)" class="btn-eliminar">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <hr>

    <!-- SECCIÓN DE INFORMES (Requisito del TP) -->
    <div class="informes-container">
      <h2>Informes</h2>
      <p><strong>Cantidad total de turnos registrados:</strong> {{ totalTurnos }}</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const apiUrl = 'https://6861b32096f0cc4e34b743f2.mockapi.io/api/v1/turnos';

const turnos = ref([]);
const loading = ref(true);
const modoEdicion = ref(false);
const turnoActual = ref({
  id: null,
  mascota: '',
  fecha: '',
  hora: '',
  motivo: '',
  clienteId: '1' // Añadimos un valor por defecto
});

const obtenerTurnos = async () => {
  loading.value = true;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    turnos.value = data;
  } catch (error) {
    console.error('Falló la obtención de turnos:', error);
    turnos.value = []; 
  } finally {
    loading.value = false;
  }
};

onMounted(obtenerTurnos);

const handleSubmit = async () => {
  if (modoEdicion.value) {
    await actualizarTurno();
  } else {
    await crearTurno();
  }
};

const crearTurno = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(turnoActual.value)
    });
    if (!response.ok) throw new Error('Error al crear el turno');
    await obtenerTurnos();
    resetearFormulario();
  } catch (error) {
    console.error(error);
  }
};

const actualizarTurno = async () => {
  try {
    const response = await fetch(`${apiUrl}/${turnoActual.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(turnoActual.value)
    });
    if (!response.ok) throw new Error('Error al actualizar');
    await obtenerTurnos();
    cancelarEdicion();
  } catch (error) {
    console.error(error);
  }
};

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

const iniciarEdicion = (turno) => {
  modoEdicion.value = true;
  turnoActual.value = { ...turno };
};

const cancelarEdicion = () => {
  modoEdicion.value = false;
  resetearFormulario();
};

const resetearFormulario = () => {
  turnoActual.value = {
    id: null,
    mascota: '',
    fecha: '',
    hora: '',
    motivo: '',
    clienteId: '1'
  };
};

const totalTurnos = computed(() => turnos.value.length);
</script>

<style scoped>
.admin-view { max-width: 900px; margin: auto; }
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




.admin-view {
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