<template>
  <v-tooltip :text="item?.component?.message" location="top">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" density="compact" icon elevation="0" class="mr-1" @click="onEliminar(endpoint, row.id)" :loading="bLoading">
        <v-icon color="red">mdi-delete</v-icon>
      </v-btn>
    </template>
  </v-tooltip>
</template>
<script setup>
import { Button } from '@/components/grid/buttons/Button.js'
const props = defineProps({
  endpoint: String,
  row: Object,
  item: Object,
})

const emit = defineEmits(['onBack'])
const {
  bLoading,
  onEliminar
} = Button(props, emit)



</script>