<template>
  <v-container fill-height>
    <v-row justify="center" class="card-login">
      <v-col :cols="mobile ? 12 : 3">
        <div class="d-flex justify-center">
          <img src="/course.png" width="120" class="mb-3"/>
        </div>
        <v-card elevation="1">
          <v-card-text>
            <h1 class="text-center mt-7 mb-8 text-medium-emphasis">¡BIENVENIDO!</h1>
            <v-form ref="form">
              <v-text-field 
                label="Usuario"
                v-bind="properties" 
                v-model="oForm.sUsuario"
                placeholder="Digite su usuario" 
                :rules="[v => (!!v || v !== '') || 'Campo obligatorio']"
                clearable
                @click:clear="oForm.sUsuario = ''"
              />

              <v-text-field 
                label="Contraseña" 
                v-bind="properties" 
                v-model="oForm.sPassword"
                placeholder="Digite su contraseña" 
                :rules="[v => (!!v || v !== '') || 'Campo obligatorio']"
                clearable
                @click:clear="oForm.sPassword = ''"
              />

              <v-btn block color="#01579B" :disabled="bLoading" :loading="bLoading" @click="__onLogin" class="mt-5 text-white">
                Ingresar
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useDisplay } from "vuetify/lib/framework.mjs";
import { LoginJS } from "@/views/login/Login.js";

const { mobile } = useDisplay();

const {
  properties,
  form,
  oForm,
  bLoading,

  __onLogin
} = LoginJS()

</script>
<style scoped>
.card-login {
  -ms-transform: translateY(10%);
  transform: translateY(10%);
}
</style>