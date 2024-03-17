<template>
  <v-navigation-drawer
    permanent
    color="#1565C0"
    elevation="0"
    :model-value="bOpenMenu"
  >
    <v-list>
      <v-list-item
        prepend-avatar="/profile.png"
        :title="oUsuario?.name"
        :subtitle="oUsuario.email"
        class="text-white"
      >
        <template v-slot:append>
          <v-menu location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                variant="text"
                icon="mdi-chevron-down"
                size="x-small"
              />
            </template>
            <v-list density="compact">
              <v-list-item
                title="Cerrar sesión"
                value="logout"
                density="comfortable"
                prepend-icon="mdi-logout"
                @click="__logout"
              />
            </v-list>
          </v-menu>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list color="transparent">
      <v-list-item 
        v-for="(item, index) in aMenu" 
        :key="index" 
        :title="item.module" 
        :value="item.id" 
        :prepend-icon="item.icon" 
        :active="item.name === route.name"
        @click="__onItem(item)"
        class="text-white"
      />
    </v-list>
  </v-navigation-drawer>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router';

import { UsuarioStore } from '@/store/auth/str_Usuario.js'
import { Menu } from '@/components/menu/Menu.js'

const route = useRoute()
const { oUsuario } = UsuarioStore()
const {
  aMenu,

  __onItem,
  __logout
} = Menu()
const bOpenMenu = ref(true)

</script>

<style scoped>
.v-list-item--active {
  color: white !important;
  font-weight: bold !important;
}
</style>