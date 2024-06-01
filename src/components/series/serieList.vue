<script setup lang="ts">
import { onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'
import type { Serie } from '@/models/Serie'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
var series = ref<Serie[]>([])

async function getSeries() {
  series.value = await http.get(ENDPOINT).then((response) => response.data)
}

function toEdit(id: number) {
  router.push(`/series/editar/${id}`)
}

async function toDelete(id: number) {
  var r = confirm('¿Está seguro que se desea eliminar la serie?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getSeries())
  }
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date))
}

onMounted(() => {
  getSeries()
})
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item active" aria-current="page">Series</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Lista de Series</h2>
      <div class="col-12">
        <RouterLink to="/series/crear">
          <font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo
        </RouterLink>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">Título</th>
            <th scope="col">Protagonista</th>
            <th scope="col">Sinopsis</th>
            <th scope="col">Director</th>
            <th scope="col">Temporadas</th>
            <th scope="col">Fecha de Estreno</th>
            <th scope="col">Edición</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(serie, index) in series" :key="serie.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ serie.titulo }}</td>
            <td>{{ serie.protagonista }}</td>
            <td>{{ serie.sinopsis }}</td>
            <td>{{ serie.director }}</td>
            <td>{{ serie.temporadas }}</td>
            <td>{{ formatDate(serie.fecha_estreno) }}</td>
            <td>
              <button class="btn btn-link" @click="toEdit(serie.id)">
                Editar
                <font-awesome-icon icon="fa-solid fa-edit" />
              </button>
              <br />
              <button class="btn btn-link" @click="toDelete(serie.id)">
                Eliminar
                <font-awesome-icon icon="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped></style>
