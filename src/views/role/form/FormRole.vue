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
        <v-text-field
          v-model="oFormulario.name"
          density="compact"
          label="Nombre de perfil"
          variant="outlined"
          clearable
          class="mb-2"
          :rules="[(v) => !!v || v !== '' || 'Campo obligatorio']"
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

const form = ref(null);
const oFormulario = ref({
  name: "",
});

const onGuardar = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    const { data } = await axios.post(`roles`, oFormulario.value);
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