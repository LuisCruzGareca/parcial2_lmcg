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
  var r = confirm('¿Está seguro que se desea eliminar las series?')
  if (r == true) {
    await http.delete(`${ENDPOINT}/${id}`).then(() => getSeries())
  }
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
        <RouterLink to="/series/crear"
          ><font-awesome-icon icon="fa-solid fa-plus" /> Crear Nuevo</RouterLink
        >
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">N°</th>
            <th scope="col">titulo</th>
            <th scope="col">sinopsis</th>
            <th scope="col">director</th>
            <th scope="col">temporadas</th>
            <th scope="col">fecha_estreno</th>
            <th scope="col">ediccion</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(series, index) in series" :key="series.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ series.titulo }}</td>
            <td>{{ series.sinopsis }}</td>
            <td>{{ series.director }}</td>
            <td>{{ series.temporadas }}</td>
            <td>{{ series.fecha_estreno }}</td>
            <td>
              <button class="btn btn-link" @click="toEdit(series.id)">
                Editar
                <font-awesome-icon icon="fa-solid fa-edit" /></button
              ><br />
              <button class="btn btn-link" @click="toDelete(series.id)">
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
