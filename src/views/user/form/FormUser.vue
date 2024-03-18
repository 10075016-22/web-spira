<template>
  <v-card>
    <v-toolbar>
        <v-toolbar-title>Formulario de usuario</v-toolbar-title>
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
            label="Nombre de usuario"
            variant="outlined"
            clearable
            class="mb-2"
            :rules="[v => (!!v || v !== '') || 'Campo obligatorio']"
        />
        <v-text-field 
            v-model="oFormulario.email"
            density="compact"
            label="Correo electronico"
            variant="outlined"
            clearable
            class="mb-2"
            :rules="[v => /.+@.+\..+/.test(v) || 'Introduce una dirección de correo electrónico válida']"
        />
        <v-text-field 
            v-model="oFormulario.phone"
            density="compact"
            label="Télefono"
            variant="outlined"
            clearable
            type="number"
            class="mb-2"
            :rules="[v => (!!v && /^[0-9]{1,10}$/.test(v)) || 'Debe tener máximo 10 dígitos']"
        />
        <v-text-field 
            v-model="oFormulario.password"
            density="compact"
            label="Contraseña"
            type="password"
            variant="outlined"
            clearable
            class="mb-2"
            :rules="[v => (!!v || v !== '') || 'Campo obligatorio']"
        />

        <v-autocomplete
            label="Perfil" 
            :items="aPerfiles"
            item-title="name"
            item-value="id"
            v-model="oFormulario.perfil"
            variant="outlined"
            :rules="[v => !!v || 'Selecciona al menos un elemento']"
            clearable
        />


        <div class="d-flex justify-end">
            <v-btn color="#1565C0" class="text-white" elevation="0" @click="onGuardar">
                Guardar
            </v-btn>
        </div>        
      </v-form>
    </v-card-text>
  </v-card>
</template>
<script setup>
import axios from 'axios';
import { onMounted, inject, ref } from 'vue';

const emit = defineEmits(['onBack'])

const swal = inject("$swal");

const bLoading = ref(false)
const aPerfiles = ref([])
const form = ref(null);
const oFormulario = ref({
    name: '',
    email: '',
    password: '',
    phone: '',
    perfil: ''
})

onMounted(() => getPerfiles())

const onCleanFormulario = () => {
    oFormulario.value = {
        name: '',
        email: '',
        password: '',
        phone: '',
        perfil: ''
    }
}

const getPerfiles = async () => {
    try {
        const { data } = await axios.get('getRoles')
        aPerfiles.value = data;
    } catch (error) {
        error;
    }
}


const onGuardar = async () => {
    
    const { valid } = await form.value.validate();
    if(valid) {
        const { data } = await axios.post(`users`, oFormulario.value);
        swal.fire({title: 'Información', text: data.message, icon: 'success'})
        emit('onBack')
    } else {
        swal.fire({title: 'Información', text: 'Diligencie toda la información', icon: 'warning'})
    }
}

</script>