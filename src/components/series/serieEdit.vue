<script setup lang="ts">
import http from '@/plugins/axios'
import router from '@/router'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  ENDPOINT_API: string
}>()

const ENDPOINT = props.ENDPOINT_API ?? ''
const titulo = ref('')
const sinopsis = ref('')
const director = ref('')
const temporadas = ref('')
const fecha_estreno = ref('')
const id = router.currentRoute.value.params['id']

async function editarSeries() {
  await http
    .patch(`${ENDPOINT}/${id}`, {
      titulo: titulo.value,
      sinopsis: sinopsis.value,
      director: director.value,
      temporadas: temporadas.value,
      fecha_estreno: fecha_estreno.value
    })
    .then(() => router.push('/series'))
}

async function getSeries() {
  await http.get(`${ENDPOINT}/${id}`).then((response) => {
    ;(titulo.value = response.data.titulo),
      (sinopsis.value = response.data.sinopsis),
      (director.value = response.data.director),
      (temporadas.value = response.data.temporadas),
      (fecha_estreno.value = response.data.fecha_estreno),
      (sinopsis.value = response.data.sinopsis)
  })
}

function goBack() {
  router.go(-1)
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
        <li class="breadcrumb-item">
          <RouterLink to="/series">Series</RouterLink>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Editar</li>
      </ol>
    </nav>

    <div class="row">
      <h2>Editar Series</h2>
    </div>

    <div class="row">
      <form @submit.prevent="editarSeries">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" v-model="titulo" placeholder="Titulo" required />
          <label for="titulo">Titulo</label>
        </div>

        <div class="form-floating">
          <input
            type="sinopsis"
            class="form-control"
            v-model="sinopsis"
            placeholder="Sinopsis"
            required
          />
          <label for="sinopsis">Sinopsis</label>
        </div>

        <div class="form-floating">
          <input
            type="director"
            class="form-control"
            v-model="director"
            placeholder="Director"
            required
          />
          <label for="director">Director</label>
        </div>

        <div class="form-floating">
          <input
            type="temporadas"
            class="form-control"
            v-model="temporadas"
            placeholder="Temporadas"
            required
          />
          <label for="temporadas">Temporadas</label>
        </div>

        <div class="form-floating">
          <input
            type="fecha_estreno"
            class="form-control"
            v-model="fecha_estreno"
            placeholder="Fecha_estreno"
            required
          />
          <label for="fecha_estreno">Fecha_estreno</label>
        </div>

        <div class="text-center mt-3">
          <button type="submit" class="btn btn-primary btn-lg">
            <font-awesome-icon icon="fa-solid fa-save" /> Guardar
          </button>
        </div>
      </form>
    </div>
    <div class="text-left">
      <button class="btn btn-link" @click="goBack">Volver</button>
    </div>
  </div>
</template>

<style></style>
