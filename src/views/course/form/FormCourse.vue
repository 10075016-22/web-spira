<template>
  <v-card>
    <v-toolbar>
      <v-toolbar-title>Formulario de cursos</v-toolbar-title>
      <v-spacer />
      <v-btn elevation="0" icon @click="emit('onBack')">
        <v-icon>mdi-arrow-left-circle-outline</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      {{ oItem }}
      <v-form ref="form">
        <v-text-field
          v-model="oFormulario.name"
          density="compact"
          label="Nombre de usuario"
          variant="outlined"
          clearable
          class="mb-2"
          :rules="[(v) => !!v || v !== '' || 'Campo obligatorio']"
        />
        <v-text-field
          v-model="oFormulario.hour_intensity"
          density="compact"
          label="Intensidad horaria"
          variant="outlined"
          clearable
          class="mb-2"
          type="number"
          :rules="[(v) => (!isNaN(parseFloat(v)) && v >= 0) || 'Introduce un valor numérico positivo',]"
        />

        <div class="d-flex justify-end" v-if="!editMood">
          <v-btn color="#1565C0" class="text-white" elevation="0" @click="onGuardar">
            Guardar
          </v-btn>
        </div>
        <div class="d-flex justify-end" v-else>
          <v-btn color="#1565C0" class="text-white" elevation="0" @click="onEditar">
            Actualizar
          </v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>
  <script setup>
import axios from "axios";
import { onMounted, inject, ref, watch } from "vue";

const emit = defineEmits(["onBack"]);
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  editMood: {
    type: Boolean,
    default: false,
  },
  oItem: {
    type: Object,
    default: () => {},
  },
});

const swal = inject("$swal");

const aPerfiles = ref([]);
const form = ref(null);
const oFormulario = ref({
  name: "",
  hour_intensity: null,
});

const onGuardar = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    const { data } = await axios.post(`courses`, oFormulario.value);
    swal.fire({ title: "Información", text: data.message, icon: "success" });
    form.value?.reset();
  } else {
    swal.fire({
      title: "Información",
      text: "Diligencie toda la información",
      icon: "warning",
    });
  }
};

const onEditar = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    const { data } = await axios.put(`courses/${props.oItem.id}`, oFormulario.value);
    swal.fire({ title: "Información", text: data.message, icon: "success" });
    form.value?.reset();
  } else {
    swal.fire({
      title: "Información",
      text: "Diligencie toda la información",
      icon: "warning",
    });
  }
};

onMounted(() => {
  if (props.editMood) {
    Object.keys(props.oItem).forEach((key) => {
      if (oFormulario.value.hasOwnProperty(key)) {
        oFormulario.value[key] = props.oItem[key];
      }
    });
  }
});
</script>