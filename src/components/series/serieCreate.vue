<script setup lang="ts">
import { ref } from 'vue'
import http from '@/plugins/axios'
import router from '@/router'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const titulo = ref('')
const protagonista = ref('')
const sinopsis = ref('')
const director = ref('')
const temporadas = ref('')
const fecha_estreno = ref('')

async function crearSerie() {
  await http
    .post(ENDPOINT, {
      titulo: titulo.value,
      protagonista: protagonista.value,
      sinopsis: sinopsis.value,
      director: director.value,
      temporadas: temporadas.value,
      fecha_estreno: fecha_estreno.value
    })
    .then(() => router.push('/series'))
}

function goBack() {
  router.go(-1)
}
</script>

<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><RouterLink to="/">Inicio</RouterLink></li>
        <li class="breadcrumb-item">
          <RouterLink to="/series">Series</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Crear</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Crear Nueva Serie</h2>
    </div>

    <div class="row">
      <form @submit.prevent="crearSerie">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="titulo" placeholder="Titulo" required />
          <label for="titulo">titulo</label>
        </div>

        <div class="form-floating">
          <input
            type="protagonista"
            class="form-control"
            v-model="protagonista"
            placeholder="protagonista"
            required
          />
          <label for="protagonista">protagonista</label>
        </div>

        <div class="form-floating">
          <input
            type="sinopsis"
            class="form-control"
            v-model="sinopsis"
            placeholder="sinopsis"
            required
          />
          <label for="sinopsis">sinopsis</label>
        </div>

        <div class="form-floating">
          <input
            type="director"
            class="form-control"
            v-model="director"
            placeholder="director"
            required
          />
          <label for="director">director</label>
        </div>

        <div class="form-floating">
          <input
            type="temporadas"
            class="form-control"
            v-model="temporadas"
            placeholder="temporadas"
            required
          />
          <label for="temporadas">temporadas</label>
        </div>

        <div class="form-floating">
          <input
            type="fecha_estreno"
            class="form-control"
            v-model="fecha_estreno"
            placeholder="fecha_estreno"
            required
          />
          <label for="fecha_estreno">fecha_estreno</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-save" /> crear
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">volver</button>
    </div>
  </div>
</template>

<style></style>
