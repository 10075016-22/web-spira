<template>
  <v-app>
    <v-main v-if="!hasAuthenticated" class="bg-grey">
      <Login class="mt-10"/>
    </v-main>
    <v-main v-else>
      <Menu />
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { storeToRefs } from "pinia";
import Login from "@/views/login/Login.vue";
import Menu from '@/components/menu/Menu.vue'
import { UsuarioStore } from "@/store/auth/str_Usuario.js";
const { hasAuthenticated } =  storeToRefs(UsuarioStore())


</script>
