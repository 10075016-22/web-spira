<template>
  <v-tooltip :text="item?.component?.message" location="top">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" density="compact" icon elevation="0" class="ml-1" @click="onEditar">
        <v-icon color="#1565C0">mdi-pencil-circle-outline</v-icon>
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
  onEditar
} = Button(props, emit)

</script>