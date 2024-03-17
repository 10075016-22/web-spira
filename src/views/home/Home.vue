<template>
  <v-row>
    <v-col class="text-center">
      <img src="/welcome.svg" width="400" class="mt-10"/>
      <p class="mt-4 text-h6">Bienvenido <b>{{ oUsuario?.name }}</b> </p>
    </v-col>
  </v-row>
</template>
<script setup>
import { UsuarioStore } from '@/store/auth/str_Usuario.js'

const { oUsuario } = UsuarioStore()
</script>