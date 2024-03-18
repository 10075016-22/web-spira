<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Formulario de asignación</v-toolbar-title>
      <v-spacer />
      <v-btn elevation="0" icon @click="emit('onBack')">
        <v-icon>mdi-arrow-left-circle-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-form ref="form">
        <v-autocomplete
            label="Usuarios" 
            density="compact"
            :items="aUsuarios"
            item-title="name"
            item-value="id"
            v-model="oFormulario.user_id"
            variant="outlined"
            :rules="[v => !!v || 'Selecciona al menos un elemento']"
            clearable
        />

        <v-autocomplete
            density="compact"
            multiple
            label="Cursos" 
            :items="courses"
            item-title="name"
            item-value="id"
            v-model="oFormulario.courses"
            variant="outlined"
            :rules="[v => !!v || 'Selecciona al menos un elemento']"
            clearable
        />

        <div class="d-flex justify-end">
          <v-btn
            color="#1565C0"
            class="text-white"
            elevation="0"
            @click="onGuardar"
          >
            Guardar
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup>
import axios from "axios";
import { onMounted, inject, ref } from "vue";

const emit = defineEmits(["onBack"]);

const swal = inject("$swal");

const aUsuarios = ref([]);
const courses = ref([]);


const form = ref(null);
const oFormulario = ref({
    user_id: "",
    courses: [],
});

onMounted(() => {
    getUsers()
    getCourses()
})

const getUsers = async () => {
  try {
    const { data } = await axios.get("getUsers");
    aUsuarios.value = data;
  } catch (error) {
    error;
  }
};

const getCourses = async () => {
  try {
    const { data } = await axios.get("getCourses");
    courses.value = data;
  } catch (error) {
    error;
  }
};

const onGuardar = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    const { data } = await axios.post(`assignments`, oFormulario.value);
    swal.fire({ title: "Información", text: data.message, icon: "success" });
    emit("onBack");
  } else {
    swal.fire({
      title: "Información",
      text: "Diligencie toda la información",
      icon: "warning",
    });
  }
};
</script>